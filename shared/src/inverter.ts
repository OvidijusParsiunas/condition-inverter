import {
  Brackets,
  GreaterOrLessThanHasFollowupEquals,
  InvertableSyntaxIndex,
  InvertableSyntaxIndexes,
  InvertBooleanLiteral,
  RemoveNegationBrackets,
} from './shared/types/evaluationState';
import { Tokens } from './shared/types/tokens';
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

  private static isBrackets(invertableSyntax?: InvertableSyntaxIndex): invertableSyntax is Brackets {
    return (invertableSyntax as Brackets)?.brackets;
  }

  private static isRemoveNegationBrackets(invertableSyntax: InvertableSyntaxIndex): invertableSyntax is RemoveNegationBrackets {
    return !!(invertableSyntax as RemoveNegationBrackets).removeNegationBrackets;
  }

  private static isInvertBooleanLiteral(invertableSyntax: InvertableSyntaxIndex): invertableSyntax is InvertBooleanLiteral {
    return !!(invertableSyntax as InvertBooleanLiteral).invertBooleanLiteral;
  }

  private static isGreaterOrLessThanHasFollowupEquals(
    invertableSyntax: InvertableSyntaxIndex,
  ): invertableSyntax is GreaterOrLessThanHasFollowupEquals {
    return (invertableSyntax as GreaterOrLessThanHasFollowupEquals).greaterOrLessThanHasFollowupEquals;
  }

  static invertIfStatements(tokens: Tokens, invertableSyntaxIndexes: InvertableSyntaxIndexes) {
    let newElementsDelta = 0;
    invertableSyntaxIndexes.forEach((invertableSyntaxIndex, conditionIndexesCurrentIndex: number) => {
      const arrayIndex = invertableSyntaxIndex.start + newElementsDelta;
      if (Inverter.isBrackets(invertableSyntaxIndex)) {
        newElementsDelta += Inverter.insertValue(tokens, arrayIndex, '(');
        newElementsDelta += Inverter.insertValue(tokens, invertableSyntaxIndex.end + newElementsDelta + 1, ')');
      } else {
        switch (tokens[arrayIndex]) {
          case '=':
            tokens[arrayIndex] = '!';
            break;
          case '<':
            tokens[arrayIndex] = '>';
            if (Inverter.isGreaterOrLessThanHasFollowupEquals(invertableSyntaxIndex)) {
              tokens.splice(arrayIndex + 1, 1);
              newElementsDelta -= 1;
            } else {
              newElementsDelta += Inverter.insertValue(tokens, arrayIndex + 1, '=');
            }
            break;
          case '>':
            tokens[arrayIndex] = '<';
            if (Inverter.isGreaterOrLessThanHasFollowupEquals(invertableSyntaxIndex)) {
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
            } else if (!Inverter.isBrackets(invertableSyntaxIndexes[conditionIndexesCurrentIndex + 1])) {
              // if brackets are present, remove the exclamation mark
              tokens.splice(arrayIndex, 1);
              newElementsDelta -= 1;
              // REF - 1889
              if (Inverter.isRemoveNegationBrackets(invertableSyntaxIndex)) {
                const startIndex = TraversalUtils.getNonSpaceCharacterIndex(tokens, arrayIndex);
                tokens.splice(startIndex, 1);
                newElementsDelta -= 1;
                tokens.splice(invertableSyntaxIndex.removeNegationBrackets.end + newElementsDelta, 1);
                newElementsDelta -= 1;
              }
              break;
            }
          case 'true':
            if (Inverter.isInvertBooleanLiteral(invertableSyntaxIndex)) {
              tokens[arrayIndex] = false;
              break;
            }
          case 'false':
            if (Inverter.isInvertBooleanLiteral(invertableSyntaxIndex)) {
              tokens[arrayIndex] = true;
              break;
            }
          case '0':
            if (Inverter.isInvertBooleanLiteral(invertableSyntaxIndex)) {
              tokens[arrayIndex] = 1;
              break;
            }
          case '1':
            if (Inverter.isInvertBooleanLiteral(invertableSyntaxIndex)) {
              tokens[arrayIndex] = 0;
              break;
            }
          // if brackets are required - proceed to go onto the next section and append a ! at the start before the brackets
          default: {
            newElementsDelta += Inverter.insertValue(tokens, arrayIndex, '!');
          }
        }
      }
    });
  }
}
