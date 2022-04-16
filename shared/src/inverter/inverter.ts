import {
  GreaterOrLessThanHasFollowupEquals,
  RemoveNegationBrackets,
  InvertBooleanLiteral,
  SyntaxToBeInverted,
  Brackets,
} from '../shared/types/evaluationState';
import { Tokens } from '../shared/types/tokens';
import { TraversalUtils } from '../traversalUtils';
import { InsertNewSyntax } from './insertNewSyntax';

export class Inverter {
  private static isBrackets(invertableSyntaxEntry?: SyntaxToBeInverted): invertableSyntaxEntry is Brackets {
    return (invertableSyntaxEntry as Brackets)?.brackets;
  }

  private static isRemoveNegationBrackets(invertableSyntaxEntry: SyntaxToBeInverted): invertableSyntaxEntry is RemoveNegationBrackets {
    return !!(invertableSyntaxEntry as RemoveNegationBrackets).removeNegationBrackets;
  }

  private static isInvertBooleanLiteral(invertableSyntaxEntry: SyntaxToBeInverted): invertableSyntaxEntry is InvertBooleanLiteral {
    return !!(invertableSyntaxEntry as InvertBooleanLiteral).invertBooleanLiteral;
  }

  private static isGreaterOrLessThanHasFollowupEquals(
    invertableSyntaxEntry: SyntaxToBeInverted,
  ): invertableSyntaxEntry is GreaterOrLessThanHasFollowupEquals {
    return (invertableSyntaxEntry as GreaterOrLessThanHasFollowupEquals).greaterOrLessThanFollowedUpByEquals;
  }

  static invertIfStatements(tokens: Tokens, syntaxToBeInverted: SyntaxToBeInverted[]) {
    let newElementsDelta = 0;
    syntaxToBeInverted.forEach((syntaxToBeInvertedEntry, index) => {
      const relativeTokenIndex = syntaxToBeInvertedEntry.start + newElementsDelta;
      if (Inverter.isBrackets(syntaxToBeInvertedEntry)) {
        newElementsDelta += InsertNewSyntax.insert(tokens, relativeTokenIndex, '(');
        newElementsDelta += InsertNewSyntax.insert(tokens, syntaxToBeInvertedEntry.end + newElementsDelta + 1, ')');
      } else {
        switch (tokens[relativeTokenIndex]) {
          case '=':
            tokens[relativeTokenIndex] = '!';
            break;
          case '<':
            tokens[relativeTokenIndex] = '>';
            if (Inverter.isGreaterOrLessThanHasFollowupEquals(syntaxToBeInvertedEntry)) {
              tokens.splice(relativeTokenIndex + 1, 1);
              newElementsDelta -= 1;
            } else {
              newElementsDelta += InsertNewSyntax.insert(tokens, relativeTokenIndex + 1, '=');
            }
            break;
          case '>':
            tokens[relativeTokenIndex] = '<';
            if (Inverter.isGreaterOrLessThanHasFollowupEquals(syntaxToBeInvertedEntry)) {
              tokens.splice(relativeTokenIndex + 1, 1);
              newElementsDelta -= 1;
            } else {
              newElementsDelta += InsertNewSyntax.insert(tokens, relativeTokenIndex + 1, '=');
            }
            break;
          case '&':
            tokens[relativeTokenIndex] = '|';
            tokens[relativeTokenIndex + 1] = '|';
            break;
          case '|':
            tokens[relativeTokenIndex] = '&';
            tokens[relativeTokenIndex + 1] = '&';
            break;
          case '!':
            if (tokens[relativeTokenIndex + 1] === '=') {
              tokens[relativeTokenIndex] = '=';
              break;
            } else if (!Inverter.isBrackets(syntaxToBeInverted[index + 1])) {
              // if brackets are present, remove the exclamation mark
              tokens.splice(relativeTokenIndex, 1);
              newElementsDelta -= 1;
              // REF - 1889
              if (Inverter.isRemoveNegationBrackets(syntaxToBeInvertedEntry)) {
                const startIndex = TraversalUtils.getNonSpaceCharacterIndex(tokens, relativeTokenIndex);
                tokens.splice(startIndex, 1);
                newElementsDelta -= 1;
                tokens.splice(syntaxToBeInvertedEntry.removeNegationBrackets.end + newElementsDelta, 1);
                newElementsDelta -= 1;
              }
              break;
            }
          case 'true':
            if (Inverter.isInvertBooleanLiteral(syntaxToBeInvertedEntry)) {
              tokens[relativeTokenIndex] = false;
              break;
            }
          case 'false':
            if (Inverter.isInvertBooleanLiteral(syntaxToBeInvertedEntry)) {
              tokens[relativeTokenIndex] = true;
              break;
            }
          case '0':
            if (Inverter.isInvertBooleanLiteral(syntaxToBeInvertedEntry)) {
              tokens[relativeTokenIndex] = 1;
              break;
            }
          case '1':
            if (Inverter.isInvertBooleanLiteral(syntaxToBeInvertedEntry)) {
              tokens[relativeTokenIndex] = 0;
              break;
            }
          // if brackets are required - proceed to go onto the next section and append a ! at the start before the brackets
          default: {
            newElementsDelta += InsertNewSyntax.insert(tokens, relativeTokenIndex, '!');
          }
        }
      }
    });
  }
}
