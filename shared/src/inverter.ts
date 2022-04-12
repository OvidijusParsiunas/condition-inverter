import TraversalUtils from './traversalUtils';

export default class Inverter {
  private static insertValue(tokens: any[], arrayIndex: number, newValue: string): number {
    if (tokens[arrayIndex].substring(0, 2) === `\n`) {
      tokens[arrayIndex] = `${tokens[arrayIndex].substring(0, 2)}${newValue}${tokens[arrayIndex].substring(2, tokens[arrayIndex].length)}`;
      return 0;
    }
    tokens.splice(arrayIndex, 0, newValue);
    return 1;
  }

  static invertIfStatements(
    tokens: any[],
    conditionIndexes: {
      start: any;
      end: any;
      brackets: any;
      greaterOrLessThanHasFollowupEquals: any;
      removeNegationBrackets: any;
      revertBooleanLiteral: any;
    }[],
  ) {
    let newElementsDelta = 0;
    conditionIndexes.forEach(
      (
        { start, end, brackets, greaterOrLessThanHasFollowupEquals, removeNegationBrackets, revertBooleanLiteral }: any,
        conditionIndexesCurrentIndex: number,
      ) => {
        const arrayIndex = start + newElementsDelta;
        if (brackets) {
          newElementsDelta += Inverter.insertValue(tokens, arrayIndex, '(');
          newElementsDelta += Inverter.insertValue(tokens, end + newElementsDelta + 1, ')');
        } else {
          switch (tokens[arrayIndex]) {
            case '=':
              tokens[arrayIndex] = '!';
              break;
            case '<':
              tokens[arrayIndex] = '>';
              if (greaterOrLessThanHasFollowupEquals) {
                tokens.splice(arrayIndex + 1, 1);
                newElementsDelta -= 1;
              } else {
                newElementsDelta += Inverter.insertValue(tokens, arrayIndex + 1, '=');
              }
              break;
            case '>':
              tokens[arrayIndex] = '<';
              if (greaterOrLessThanHasFollowupEquals) {
                tokens.splice(arrayIndex + 1, 1);
                newElementsDelta -= 1;
              } else {
                newElementsDelta += Inverter.insertValue(tokens, arrayIndex + 1, '=');
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
                // REF - 1889
                if (removeNegationBrackets) {
                  const startIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, arrayIndex);
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
              newElementsDelta += Inverter.insertValue(tokens, arrayIndex, '!');
            }
          }
        }
      },
    );
  }
}
