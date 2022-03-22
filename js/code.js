const traversalUtils = require('./traversalUtils');
const tokenizer = require('./tokenizer');
const Evaluator = require('./evaluator');

function invertIfStatements(tokens, conditionIndexes) {
    let newElementsDelta = 0;
    conditionIndexes.forEach(({ start, end, brackets, hasFollowupEquals, removeNegationBrackets, revertBooleanLiteral }, conditionIndexesCurrentIndex) => {
        const arrayIndex = start + newElementsDelta;
        if (brackets) {
            tokens.splice(arrayIndex, 0, '(');
            newElementsDelta += 1;
            tokens.splice(end + newElementsDelta + 1, 0, ')');
            newElementsDelta += 1;
        } else {
            switch (tokens[arrayIndex]) {
                case '=':
                    tokens[arrayIndex] = '!';
                    break;
                case '<':
                    tokens[arrayIndex] = '>';
                    if (hasFollowupEquals) {
                        tokens.splice(arrayIndex + 1, 1);
                        newElementsDelta -= 1;
                    } else {
                        tokens.splice(arrayIndex + 1, 0, '=');
                        newElementsDelta += 1;
                    }
                    break;
                case '>':
                    tokens[arrayIndex] = '<';
                    if (hasFollowupEquals) {
                        tokens.splice(arrayIndex + 1, 1);
                        newElementsDelta -= 1;
                    } else {
                        tokens.splice(arrayIndex + 1, 0, '=');
                        newElementsDelta += 1;
                    }
                    break;
                case '&':
                    tokens[arrayIndex] = '|';
                    tokens[arrayIndex + 1] = '|';
                    break;
                case '|':
                    tokens[arrayIndex] = '&';
                    tokens[arrayIndex + 1] = '&';
                    break;
                case '!':
                    if (tokens[arrayIndex + 1] === '=') {
                        tokens[arrayIndex] = '=';
                        break;
                    } else if (!conditionIndexes[conditionIndexesCurrentIndex + 1]?.brackets) {
                        // if brackets are present, remove the exclamation mark
                        tokens.splice(arrayIndex, 1);
                        newElementsDelta -= 1;
                        if (removeNegationBrackets) {
                            const startIndex = traversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, arrayIndex);
                            tokens.splice(startIndex, 1);
                            newElementsDelta -= 1;
                            tokens.splice(removeNegationBrackets.end + newElementsDelta, 1);
                            newElementsDelta -= 1;
                        }
                        break;
                    }
                case 'true':
                    if (revertBooleanLiteral) {
                        tokens[arrayIndex] = false;
                        break;
                    }
                case 'false':
                    if (revertBooleanLiteral) {
                        tokens[arrayIndex] = true;
                        break;
                    }
                case '0':
                    if (revertBooleanLiteral) {
                        tokens[arrayIndex] = 1;
                        break;
                    }
                case '1':
                    if (revertBooleanLiteral) {
                        tokens[arrayIndex] = 0;
                        break;
                    }
                    // if brackets are required - proceed to go onto the next section and append a ! at the start before the brackets
                default: {
                    tokens.splice(arrayIndex, 0, '!');
                    newElementsDelta += 1;
                }
            }
        }
    });
}

function runInvert(functionString) {
    const tokens = tokenizer.tokenize(functionString);
    const evaluator = new Evaluator();
    const conditionIndexes = evaluator.identifyConditions(tokens);
    invertIfStatements(tokens, conditionIndexes);
    return tokens.join('');
}

function test(input, expectedResult) {
    const result = runInvert(input);
    if (result === expectedResult) {
        console.log('PASS');
    } else {
        console.log(`FAIL: input - ${input}`);
        console.log(`e: ${expectedResult}`)
        console.log(`a: ${result}`);
    }
}

runExclusiveTests();

runTests();

function runExclusiveTests() {
}


function runTests() {

    test(
        'if (mouse && cat) { console.log(2) }',
        'if (!mouse || !cat) { console.log(2) }',
    );

    test(
        'if (mouse &&cat) { console.log(2) }',
        'if (!mouse ||!cat) { console.log(2) }',
    );

    test(
        'if(mouse && cat) { console.log(2) }',
        'if(!mouse || !cat) { console.log(2) }',
    );

    test(
        'if(mouse &&cat) { console.log(2) }',
        'if(!mouse ||!cat) { console.log(2) }',
    );

    test(
        'if (dog && cat) { console.log(2) }',
        'if (!dog || !cat) { console.log(2) }',
    );

    test(
        'if (dog && cat || mouse) { console.log(2) }',
        'if (!dog || !cat && !mouse) { console.log(2) }',
    );

    test(
        'if (dog - cat || mouse) { console.log(2) }',
        'if (!(dog - cat) && !mouse) { console.log(2) }',
    );

    test(
        'if (dog - cat  || mouse) { console.log(2) }',
        'if (!(dog - cat)  && !mouse) { console.log(2) }',
    );

    test(
        'if (!dog - cat) { console.log(2) }',
        'if (!(!dog - cat)) { console.log(2) }',
    );

    test(
        'if (!dog - cat && !dog - cat) { console.log(2) }',
        'if (!(!dog - cat) || !(!dog - cat)) { console.log(2) }',
    );

    test(
        'if (!  dog - cat && !  dog - cat) { console.log(2) }',
        'if (!(!  dog - cat) || !(!  dog - cat)) { console.log(2) }',
    );

    test(
        'if (dog - !cat && dog - !cat) { console.log(2) }',
        'if (!(dog - !cat) || !(dog - !cat)) { console.log(2) }',
    );

    test(
        'if (dog -   !cat && dog -  !cat) { console.log(2) }',
        'if (!(dog -   !cat) || !(dog -  !cat)) { console.log(2) }',
    );

    test(
        'if (dog -   !cat && dog -  !  cat  ) { console.log(2) }',
        'if (!(dog -   !cat) || !(dog -  !  cat)  ) { console.log(2) }',
    );

    test(
        'if ((!(!dog - cat)) && (!(!dog - cat))) { console.log(2) }',
        'if (!(!(!dog - cat)) || !(!(!dog - cat))) { console.log(2) }',
    );

    test(
        'if (  (!  (!  dog - cat)) && (  !(  !dog - cat))) { console.log(2) }',
        'if (  !(!  (!  dog - cat)) || !(  !(  !dog - cat))) { console.log(2) }',
    );

    test(
        'if (dog - cat ||   mouse) { console.log(2) }',
        'if (!(dog - cat) &&   !mouse) { console.log(2) }',
    );

    test(
        'if   (dog - cat ||   mouse) { console.log(2) }',
        'if   (!(dog - cat) &&   !mouse) { console.log(2) }',
    );

    test(
        'if (dog - cat || mouse  ) { console.log(2) }',
        'if (!(dog - cat) && !mouse  ) { console.log(2) }',
    );

    test(
        'if   (  dog   -  cat  ||   mouse  ) { console.log(2) }',
        'if   (  !(dog   -  cat)  &&   !mouse  ) { console.log(2) }',
    );

    test(
        'if   (   mouse  ||   dog   -  cat  ) { console.log(2) }',
        'if   (   !mouse  &&   !(dog   -  cat)  ) { console.log(2) }',
    );

    test(
        'if (!(mouse - cat)) { console.log(2) }',
        'if (mouse - cat) { console.log(2) }',
    );

    test(
        'if (  !  (  mouse - cat)  ) { console.log(2) }',
        'if (      mouse - cat  ) { console.log(2) }',
    );

    test(
        'if (  !  (  mouse - cat)  &&   !  (  mouse - cat)  ) { console.log(2) }',
        'if (      mouse - cat  ||       mouse - cat  ) { console.log(2) }',
    );

    test(
        'if (mouse || dog - cat) { console.log(2) }',
        'if (!mouse && !(dog - cat)) { console.log(2) }',
    );

    test(
        'if (dog - cat || mouse && cat - dog) { console.log(2) }',
        'if (!(dog - cat) && !mouse || !(cat - dog)) { console.log(2) }',
    );

    test(
        'if (mouse || (dog - cat)) { console.log(2) }',
        'if (!mouse && !(dog - cat)) { console.log(2) }',
    );

    test(
        'if (mouse < cat) { console.log(2) }',
        'if (mouse >= cat) { console.log(2) }',
    );

    test(
        'if (mouse > cat) { console.log(2) }',
        'if (mouse <= cat) { console.log(2) }',
    );

    test(
        'if (mouse <= cat) { console.log(2) }',
        'if (mouse > cat) { console.log(2) }',
    );

    test(
        'if (mouse <= cat || hello) { console.log(2) }',
        'if (mouse > cat && !hello) { console.log(2) }',
    );

    test(
        'if (hello || mouse <= cat) { console.log(2) }',
        'if (!hello && mouse > cat) { console.log(2) }',
    );

    test(
        'if (hello || (mouse <= cat)) { console.log(2) }',
        'if (!hello && (mouse > cat)) { console.log(2) }',
    );

    test(
        'if (hello || ((mouse <= cat))) { console.log(2) }',
        'if (!hello && ((mouse > cat))) { console.log(2) }',
    );

    test(
        'if (hello || (mouse <= cat && mouse - cat)) { console.log(2) }',
        'if (!hello && !(mouse <= cat && mouse - cat)) { console.log(2) }',
    );

    test(
        'if (hello || (mouse <= cat && (mouse - cat))) { console.log(2) }',
        'if (!hello && !(mouse <= cat && (mouse - cat))) { console.log(2) }',
    );

    test(
        'if ((hello) === (2) && start || number < 2 && hello && end) { console.log(2) }',
        'if ((hello) !== (2) || !start && number >= 2 || !hello || !end) { console.log(2) }',
    );

    test(
        'if ((hello) !== (2) && start || number != 2 && hello && end) { console.log(2) }',
        'if ((hello) === (2) || !start && number == 2 || !hello || !end) { console.log(2) }',
    );

    test(
        'if ((hello) !== (2) && !start || number != 2 && hello && end) { console.log(2) }',
        'if ((hello) === (2) || start && number == 2 || !hello || !end) { console.log(2) }',
    );

    test(
        'if (hello || (mouse <= cat && ((mouse - cat)))) { console.log(2) }',
        'if (!hello && !(mouse <= cat && ((mouse - cat)))) { console.log(2) }',
    );

    test(
        'if ((mouse <= cat && mouse - cat) || hello) { console.log(2) }',
        'if (!(mouse <= cat && mouse - cat) && !hello) { console.log(2) }',
    );

    test(
        'if ((mouse <= cat && (mouse - cat)) || hello) { console.log(2) }',
        'if (!(mouse <= cat && (mouse - cat)) && !hello) { console.log(2) }',
    );

    test(
        'if ((mouse <= cat && ((mouse - cat))) || hello) { console.log(2) }',
        'if (!(mouse <= cat && ((mouse - cat))) && !hello) { console.log(2) }',
    );

    test(
        'if (  (mouse <= cat &&   (    (mouse   -   cat)    )  ) || hello  ) { console.log(2) }',
        'if (  !(mouse <= cat &&   (    (mouse   -   cat)    )  ) && !hello  ) { console.log(2) }',
    );

    test(
        'if (((mouse <= cat) && ((mouse - cat))) || hello) { console.log(2) }',
        'if (!((mouse <= cat) && ((mouse - cat))) && !hello) { console.log(2) }',
    );

    test(
        'if (((mouse - cat) && ((mouse - cat))) || hello) { console.log(2) }',
        'if (!((mouse - cat) && ((mouse - cat))) && !hello) { console.log(2) }',
    );

    test(
        'if  (  (  (mouse - cat) && (  (mouse - cat) )    ) ||   hello  ) { console.log(2) }',
        'if  (  !(  (mouse - cat) && (  (mouse - cat) )    ) &&   !hello  ) { console.log(2) }',
    );

    test(
        'if (((mouse - cat) && ((mouse - cat)) && ((mouse - cat) && ((mouse - cat)))) || hello) { console.log(2) }',
        'if (!((mouse - cat) && ((mouse - cat)) && ((mouse - cat) && ((mouse - cat)))) && !hello) { console.log(2) }',
    );

    test(
        'if (((mouse - cat) && ((mouse - cat))) || ((mouse - cat) && ((mouse - cat)))) { console.log(2) }',
        'if (!((mouse - cat) && ((mouse - cat))) && !((mouse - cat) && ((mouse - cat)))) { console.log(2) }',
    );

    test(
        'if ((((mouse - cat) && ((mouse - cat))) || ((mouse - cat) && ((mouse - cat)))) && (((mouse - cat) && ((mouse - cat))) || ((mouse - cat) && ((mouse - cat))))) { console.log(2) }',
        'if (!(((mouse - cat) && ((mouse - cat))) || ((mouse - cat) && ((mouse - cat)))) || !(((mouse - cat) && ((mouse - cat))) || ((mouse - cat) && ((mouse - cat))))) { console.log(2) }',
    );

    test(
        'if (!!dog) { console.log(2) }',
        'if (!(!!dog)) { console.log(2) }',
    );

    test(
        'if (!(!!dog)) { console.log(2) }',
        'if (!!dog) { console.log(2) }',
    );

    test(
        'if (! !dog) { console.log(2) }',
        'if (!(! !dog)) { console.log(2) }',
    );

    test(
        'if (!(! !dog)) { console.log(2) }',
        'if (! !dog) { console.log(2) }',
    );

    test(
        'if (! !(dog)) { console.log(2) }',
        'if (!(! !(dog))) { console.log(2) }',
    );

    test(
        'if (!(! !(dog))) { console.log(2) }',
        'if (! !(dog)) { console.log(2) }',
    );

    test(
        'if (! !!! (dog)) { console.log(2) }',
        'if (!(! !!! (dog))) { console.log(2) }',
    );

    test(
        'if (! !!!  (  dog != 1)) { console.log(2) }',
        'if (!(! !!!  (  dog != 1))) { console.log(2) }',
    );

    test(
        'if (!!!!dog) { console.log(2) }',
        'if (!(!!!!dog)) { console.log(2) }',
    );

    test(
        'if (!(!!!!dog)) { console.log(2) }',
        'if (!!!!dog) { console.log(2) }',
    );

    test(
        'if (!!!(!!dog)) { console.log(2) }',
        'if (!(!!!(!!dog))) { console.log(2) }',
    );

    test(
        'if (!!!(!!dog) && !!!(!!dog)) { console.log(2) }',
        'if (!(!!!(!!dog)) || !(!!!(!!dog))) { console.log(2) }',
    );

    test(
        'if (!(!!!(!!dog)) || !(!!!(!!dog))) { console.log(2) }',
        'if (!!!(!!dog) && !!!(!!dog)) { console.log(2) }',
    );

    test(
        'if (!!!(!!dog + 1) && !!!(!!dog)) { console.log(2) }',
        'if (!(!!!(!!dog + 1)) || !(!!!(!!dog))) { console.log(2) }',
    );

    test(
        'if (!(!!!(!!dog + 1)) || !(!!!(!!dog))) { console.log(2) }',
        'if (!!!(!!dog + 1) && !!!(!!dog)) { console.log(2) }',
    );

    test(
        'if (!!!(!!dog && cat) && !!!(!!dog)) { console.log(2) }',
        'if (!(!!!(!!dog && cat)) || !(!!!(!!dog))) { console.log(2) }',
    );

    test(
        'if (!(!!!(!!dog && cat)) || !(!!!(!!dog))) { console.log(2) }',
        'if (!!!(!!dog && cat) && !!!(!!dog)) { console.log(2) }',
    );

    test(
        'if (!!-!!dog) { console.log(2) }',
        'if (!(!!-!!dog)) { console.log(2) }',
    );

    test(
        'if (!!+!!dog) { console.log(2) }',
        'if (!(!!+!!dog)) { console.log(2) }',
    );

    test(
        'if (!!dog + 2) { console.log(2) }',
        'if (!(!!dog + 2)) { console.log(2) }',
    );

    test(
        'if (!!dog && !!dog + 2) { console.log(2) }',
        'if (!(!!dog) || !(!!dog + 2)) { console.log(2) }',
    );

    test(
        'if (!!dog && !!dog +  2) { console.log(2) }',
        'if (!(!!dog) || !(!!dog +  2)) { console.log(2) }',
    );
    
    test(
        'if ((!!dog && !!dog + 2) && (!!dog && !!dog + 2)) { console.log(2) }',
        'if (!(!!dog && !!dog + 2) || !(!!dog && !!dog + 2)) { console.log(2) }',
    );

    test(
        'if (!!!!(dog)) { console.log(2) }',
        'if (!(!!!!(dog))) { console.log(2) }',
    );

    test(
        'if (!!!  !(dog)) { console.log(2) }',
        'if (!(!!!  !(dog))) { console.log(2) }',
    );

    test(
        'if (!(!!!!(dog))) { console.log(2) }',
        'if (!!!!(dog)) { console.log(2) }',
    );

    test(
        'if (!(!!!!  (  dog))) { console.log(2) }',
        'if (!!!!  (  dog)) { console.log(2) }',
    );

    test(
        'if (!!!!(dog != cat)) { console.log(2) }',
        'if (!(!!!!(dog != cat))) { console.log(2) }',
    );

    test(
        'if (!!!!(dog != cat && cat - dog)) { console.log(2) }',
        'if (!(!!!!(dog != cat && cat - dog))) { console.log(2) }',
    );

    test(
        'if (! !!  !(dog != cat && cat   - dog) ) { console.log(2) }',
        'if (!(! !!  !(dog != cat && cat   - dog)) ) { console.log(2) }',
    );

    test(
        'if (!(!!!!(dog != cat && cat - dog)) && !(!!!!(dog != cat && cat - dog))) { console.log(2) }',
        'if (!!!!(dog != cat && cat - dog) || !!!!(dog != cat && cat - dog)) { console.log(2) }',
    );

    test(
        'if (!!!+!(dog != cat)) { console.log(2) }',
        'if (!(!!!+!(dog != cat))) { console.log(2) }',
    );

    test(
        'if (!(!!!+!(dog != cat))) { console.log(2) }',
        'if (!!!+!(dog != cat)) { console.log(2) }',
    );

    test(
        'if (!!!  +  !!(dog !=   cat)) { console.log(2) }',
        'if (!(!!!  +  !!(dog !=   cat))) { console.log(2) }',
    );

    test(
        'if (!!(!!  +  !!(dog !=   cat))) { console.log(2) }',
        'if (!(!!(!!  +  !!(dog !=   cat)))) { console.log(2) }',
    );

    test(
        'if (!!!+!!(dog != cat)) { console.log(2) }',
        'if (!(!!!+!!(dog != cat))) { console.log(2) }',
    );

    test(
        'if (!(!!!+!!(dog != cat))) { console.log(2) }',
        'if (!!!+!!(dog != cat)) { console.log(2) }',
    );

    test(
        'if (!!!!!+(dog != cat)) { console.log(2) }',
        'if (!(!!!!!+(dog != cat))) { console.log(2) }',
    );

    test(
        'if (!(!!!!!+(dog != cat))) { console.log(2) }',
        'if (!!!!!+(dog != cat)) { console.log(2) }',
    );

    test(
        'if (+!!!!!(dog != cat)) { console.log(2) }',
        'if (!(+!!!!!(dog != cat))) { console.log(2) }',
    );

    test(
        'if (!(+!!!!!(dog != cat))) { console.log(2) }',
        'if (+!!!!!(dog != cat)) { console.log(2) }',
    );

    test(
        'if ((+!!!!!(dog != cat))) { console.log(2) }',
        'if (!(+!!!!!(dog != cat))) { console.log(2) }',
    );

    test(
        'if ((-!!!!!(dog != cat))) { console.log(2) }',
        'if (!(-!!!!!(dog != cat))) { console.log(2) }',
    );

    test(
        'if (( - !!!!!(dog != cat))) { console.log(2) }',
        'if (!( - !!!!!(dog != cat))) { console.log(2) }',
    );

    test(
        'if (!( - !!!!!(dog != cat))) { console.log(2) }',
        'if ( - !!!!!(dog != cat)) { console.log(2) }',
    );

    test(
        'if (!!!!(!(dog || cat)) || !!!!(!(dog || cat))) { console.log(2) }',
        'if (!(!!!!(!(dog || cat))) && !(!!!!(!(dog || cat)))) { console.log(2) }',
    );

    test(
        'if (!!!!  (! (dog || cat) ) || !!  !!(! (dog || cat))) { console.log(2) }',
        'if (!(!!!!  (! (dog || cat) )) && !(!!  !!(! (dog || cat)))) { console.log(2) }',
    );

    test(
        'if (!(!!!!(!(dog || cat))) && !(!!!!(!(dog || cat)))) { console.log(2) }',
        'if (!!!!(!(dog || cat)) || !!!!(!(dog || cat))) { console.log(2) }',
    );

    test(
        'if (  !(!!! !(!(dog || cat))) && !(!! ! !(!(dog ||  cat) ))) { console.log(2) }',
        'if (  !!! !(!(dog || cat)) || !! ! !(!(dog ||  cat) )) { console.log(2) }',
    );

    test(
        'if (!! + - + -!!(!(dog || cat))) { console.log(2) }',
        'if (!(!! + - + -!!(!(dog || cat)))) { console.log(2) }',
    );

    test(
        'if (!! + - + -!!(!(dog ||  + - + - cat))) { console.log(2) }',
        'if (!(!! + - + -!!(!(dog ||  + - + - cat)))) { console.log(2) }',
    );

    test(
        'if (+ - + -!!(!(dog ||  + - + - cat))) { console.log(2) }',
        'if (!(+ - + -!!(!(dog ||  + - + - cat)))) { console.log(2) }',
    );

    test(
        'if (+ - + - !!(!(dog ||  + - + - cat))) { console.log(2) }',
        'if (!(+ - + - !!(!(dog ||  + - + - cat)))) { console.log(2) }',
    );

    test(
        'if (!(+ - + - !!(!(dog ||  + - + - cat)))) { console.log(2) }',
        'if (+ - + - !!(!(dog ||  + - + - cat))) { console.log(2) }',
    );

        test(
        'if (-dog) { console.log(2) }',
        'if (!(-dog)) { console.log(2) }',
    );

    test(
        'if (- + dog) { console.log(2) }',
        'if (!(- + dog)) { console.log(2) }',
    );

    test(
        'if ((- + dog)) { console.log(2) }',
        'if (!(- + dog)) { console.log(2) }',
    );

    test(
        'if ((- + dog) && (- + dog)) { console.log(2) }',
        'if (!(- + dog) || !(- + dog)) { console.log(2) }',
    );

    test(
        'if (( - + - + dog) && (- + - + dog)) { console.log(2) }',
        'if (!( - + - + dog) || !(- + - + dog)) { console.log(2) }',
    );

    test(
        'if (!!(- + - + dog) && !!( - + - + dog)) { console.log(2) }',
        'if (!(!!(- + - + dog)) || !(!!( - + - + dog))) { console.log(2) }',
    );

    test(
        'if (!!(- + - + dog + cat) && !!(- + - + dog - cat)) { console.log(2) }',
        'if (!(!!(- + - + dog + cat)) || !(!!(- + - + dog - cat))) { console.log(2) }',
    );

    test(
        'if (- + - + dog + cat && - + - + dog - cat) { console.log(2) }',
        'if (!(- + - + dog + cat) || !(- + - + dog - cat)) { console.log(2) }',
    );

    test(
        'if (- + - + dog + !!cat) { console.log(2) }',
        'if (!(- + - + dog + !!cat)) { console.log(2) }',
    );

    test(
        'if (- + -   + dog + !!cat && - + - + !!dog - cat) { console.log(2) }',
        'if (!(- + -   + dog + !!cat) || !(- + - + !!dog - cat)) { console.log(2) }',
    );

    test(
        'if (!(- + -   + dog + !!cat) || !(- + - + !!dog - cat)) { console.log(2) }',
        'if (- + -   + dog + !!cat && - + - + !!dog - cat) { console.log(2) }',
    );

    test(
        'if (!(- + dog)) { console.log(2) }',
        'if (- + dog) { console.log(2) }',
    );
    
    test(
        'if (+dog) { console.log(2) }',
        'if (!(+dog)) { console.log(2) }',
    );
    
    test(
        'if (+!!dog) { console.log(2) }',
        'if (!(+!!dog)) { console.log(2) }',
    );

    test(
        'if (-+!!dog) { console.log(2) }',
        'if (!(-+!!dog)) { console.log(2) }',
    );

    test(
        'if (!(-+!!dog)) { console.log(2) }',
        'if (-+!!dog) { console.log(2) }',
    );

    test(
        'if (-  +  !!dog) { console.log(2) }',
        'if (!(-  +  !!dog)) { console.log(2) }',
    );

    test(
        'if (!(-  +  !!dog)) { console.log(2) }',
        'if (-  +  !!dog) { console.log(2) }',
    );

    test(
        'if (!(-  +  !!dog - !!cat + - + - (dog && !!cat))) { console.log(2) }',
        'if (-  +  !!dog - !!cat + - + - (dog && !!cat)) { console.log(2) }',
    );

    test(
        'if (false) { console.log(1) }',
        'if (true) { console.log(1) }'
    );

    test(
        'if (0) { console.log(1) }',
        'if (1) { console.log(1) }'
    );

    test(
        'if (0123123) { console.log(1) }',
        'if (!0123123) { console.log(1) }'
    );

    test(
        'if (0123123 && 0123123) { console.log(1) }',
        'if (!0123123 || !0123123) { console.log(1) }'
    );

    test(
        'if (0123123 + 123213123) { console.log(1) }',
        'if (!(0123123 + 123213123)) { console.log(1) }'
    );

    test(
        'if (1) { console.log(1) }',
        'if (0) { console.log(1) }'
    );

    test(
        'if (0.0) { console.log(1) }',
        'if (!0.0) { console.log(1) }'
    );

    test(
        'if (1_1) { console.log(1) }',
        'if (!1_1) { console.log(1) }'
    );

    test(
        'if (0.0 + 2) { console.log(1) }',
        'if (!(0.0 + 2)) { console.log(1) }'
    );

    test(
        'if (true) { console.log(1) }',
        'if (false) { console.log(1) }'
    );

    test(
        'if (  !!  false  ) { console.log(1) }',
        'if (  !(!!  false)  ) { console.log(1) }'
    );

    test(
        'if (!(!!  false)) { console.log(1) }',
        'if (!!  false) { console.log(1) }'
    );
    
    test(
        'if (false && true) { console.log(1) }',
        'if (true || false) { console.log(1) }'
    );

    test(
        'if (!(false && true)) { console.log(1) }',
        'if (false && true) { console.log(1) }'
    );

    test(
        'if (false   &&   true) { console.log(1) }',
        'if (true   ||   false) { console.log(1) }'
    );

    test(
        'if (!(false && true)) { console.log(1) }',
        'if (false && true) { console.log(1) }'
    );

    test(
        'if (!(  false   &&   true  )) { console.log(1) }',
        'if (  false   &&   true  ) { console.log(1) }'
    );

    test(
        'if (false + dog && true + cat) { console.log(1) }',
        'if (!(false + dog) || !(true + cat)) { console.log(1) }'
    );

    test(
        'if (!(false + dog) || !(true + cat)) { console.log(1) }',
        'if (false + dog && true + cat) { console.log(1) }'
    );

    test(
        'if (!(false   && true  ) &&   true) { console.log(1) }',
        'if (false   && true   ||   false) { console.log(1) }'
    );

    test(
        'if (  true   ||   false   &&   true  ) { console.log(1) }',
        'if (  false   &&   true   ||   false  ) { console.log(1) }'
    );

    test(
        'if ((1) + 12) { console.log(1) }',
        'if (!((1) + 12)) { console.log(1) }',
    );

    test(
        'if ((1) + (12)) { console.log(1) }',
        'if (!((1) + (12))) { console.log(1) }',
    );

    test(
        'if (( ( 1 ) ) + ( ( 12 ) )) { console.log(1) }',
        'if (!(( ( 1 ) ) + ( ( 12 ) ))) { console.log(1) }',
    );

    test(
        'if ((1 - 1) + (12 + 0)) { console.log(1) }',
        'if (!((1 - 1) + (12 + 0))) { console.log(1) }',
    );

    test(
        'if (!((1 - 1) + (12 + 0))) { console.log(1) }',
        'if ((1 - 1) + (12 + 0)) { console.log(1) }',
    );

    test(
        'if ((1 && 4) + (12 || 4)) { console.log(1) }',
        'if (!((1 && 4) + (12 || 4))) { console.log(1) }',
    );

    test(
        'if ((1) + ((2 + 5)) + 12) { console.log(1) }',
        'if (!((1) + ((2 + 5)) + 12)) { console.log(1) }',
    );

    test(
        'if (!((1) + ((2 + 5)) + 12)) { console.log(1) }',
        'if ((1) + ((2 + 5)) + 12) { console.log(1) }',
    );

    test(
        'if ((1) + 12) { console.log(1) } if ((1) + 12) { console.log(1) }',
        'if (!((1) + 12)) { console.log(1) } if (!((1) + 12)) { console.log(1) }',
    );

    test(
        'if ((1) + 12) { console.log(1) }     if ((1) + 12) { console.log(1) }',
        'if (!((1) + 12)) { console.log(1) }     if (!((1) + 12)) { console.log(1) }',
    );

    test(
        'if ((2 < 5) && (4 > 2)) { console.log(1) }',
        'if ((2 >= 5) || (4 <= 2)) { console.log(1) }',
    );

    test(
        'if ((2 >= 5) || (4 <= 2)) { console.log(1) }',
        'if ((2 < 5) && (4 > 2)) { console.log(1) }',
    );

    test(
        `if ('mouse' && cat) { console.log(2) }`,
        `if (!'mouse' || !cat) { console.log(2) }`,
    );

    test(
        `if ('false' && cat) { console.log(2) }`,
        `if (!'false' || !cat) { console.log(2) }`,
    );

    test(
        `if ('false && cat' && cat) { console.log(2) }`,
        `if (!'false && cat' || !cat) { console.log(2) }`,
    );

    test(
        'if (`false && cat` && cat) { console.log(2) }',
        'if (!`false && cat` || !cat) { console.log(2) }',
    );

    test(
        'if ("false && cat" && cat) { console.log(2) }',
        'if (!"false && cat" || !cat) { console.log(2) }',
    );

    test(
        'if ("false && `cat`" && `"cat"`) { console.log(2) }',
        'if (!"false && `cat`" || !`"cat"`) { console.log(2) }',
    );

    test(
        'if (!"false && `cat`" || !`"cat"`) { console.log(2) }',
        'if ("false && `cat`" && `"cat"`) { console.log(2) }',
    );

    test(
        'if ("1" + 2 && cat) { console.log(2) }',
        'if (!("1" + 2) || !cat) { console.log(2) }',
    );

    test(
        'if (!("1" + 2) || !("1" + 2)) { console.log(2) }',
        'if ("1" + 2 && "1" + 2) { console.log(2) }',
    );

    test(
        `if ('if (!("1" + 2) || !("1" + 2)) { console.log(2) }' && cat) { console.log(2) }`,
        `if (!'if (!("1" + 2) || !("1" + 2)) { console.log(2) }' || !cat) { console.log(2) }`,
    );

    test(
        `if (!'if (!("1" + 2) || !("1" + 2)) { console.log(2) }' || !cat) { console.log(2) }`,
        `if ('if (!("1" + 2) || !("1" + 2)) { console.log(2) }' && cat) { console.log(2) }`,
    );

    test(
        '  if   (  dog   -  cat  ||   mouse  ) { console.log(2) }  ',
        '  if   (  !(dog   -  cat)  &&   !mouse  ) { console.log(2) }  ',
    );

    test(
        '  if   (  dog   -  cat  ||   mouse  ) { console.log(2) }  if   (  dog   -  cat  ||   mouse  ) { console.log(2) }  ',
        '  if   (  !(dog   -  cat)  &&   !mouse  ) { console.log(2) }  if   (  !(dog   -  cat)  &&   !mouse  ) { console.log(2) }  ',
    );

    test(
        '  if   (  !(dog   -  cat)  &&   !mouse  ) { console.log(2) }  if   (  !(dog   -  cat)  &&   !mouse  ) { console.log(2) }  ',
        '  if   (  dog   -  cat  ||   mouse  ) { console.log(2) }  if   (  dog   -  cat  ||   mouse  ) { console.log(2) }  ',
    );

    test(
        'if ((1) && (12)) { console.log(1) }     if ((1) && (12)) { console.log(1) }',
        'if (!(1) || !(12)) { console.log(1) }     if (!(1) || !(12)) { console.log(1) }',
    );
}
