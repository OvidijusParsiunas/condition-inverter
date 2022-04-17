import {
  GreaterOrLessThanHasFollowUpEquals,
  RemoveNegationBrackets,
  InvertBooleanLiteral,
  SyntaxToBeInverted,
  InsertNewBrackets,
} from '../shared/types/evaluationState';
import { InvertGreaterOrLessThanSign } from './invertGreaterOrLessThanSign';
import { InsertNewSyntax } from './insertNewSyntax';
import { TraversalUtils } from '../traversalUtils';
import { InsertBrackets } from './insertBrackets';
import { Tokens } from '../shared/types/tokens';

export class Inverter {
  private static isRemoveNegationBrackets(invertableSyntaxEntry: SyntaxToBeInverted): invertableSyntaxEntry is RemoveNegationBrackets {
    return !!(invertableSyntaxEntry as RemoveNegationBrackets).removeNegatedBrackets;
  }

  private static isInvertBooleanLiteral(invertableSyntaxEntry: SyntaxToBeInverted): invertableSyntaxEntry is InvertBooleanLiteral {
    return !!(invertableSyntaxEntry as InvertBooleanLiteral).invertBooleanLiteral;
  }

  public static invertIfStatements(tokens: Tokens, syntaxToBeInverted: SyntaxToBeInverted[]): void {
    let newElementsDelta = 0;
    syntaxToBeInverted.forEach((syntaxToBeInvertedEntry, index) => {
      const relativeTokenIndex = syntaxToBeInvertedEntry.start + newElementsDelta;
      if (InsertBrackets.isInsertNewBrackets(syntaxToBeInvertedEntry)) {
        newElementsDelta = InsertBrackets.insert(tokens, relativeTokenIndex, syntaxToBeInvertedEntry.end, newElementsDelta);
      } else {
        switch (tokens[relativeTokenIndex]) {
          case '=':
            tokens[relativeTokenIndex] = '!';
            break;
          case '<':
          case '>':
            newElementsDelta = InvertGreaterOrLessThanSign.invert(tokens, relativeTokenIndex, newElementsDelta, syntaxToBeInvertedEntry);
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
            } else if (!InsertBrackets.isInsertNewBrackets(syntaxToBeInverted[index + 1])) {
              // if brackets are present, remove the exclamation mark
              tokens.splice(relativeTokenIndex, 1);
              newElementsDelta -= 1;
              // REF - 1889
              if (Inverter.isRemoveNegationBrackets(syntaxToBeInvertedEntry)) {
                const startIndex = TraversalUtils.getNonSpaceCharacterIndex(tokens, relativeTokenIndex);
                tokens.splice(startIndex, 1);
                newElementsDelta -= 1;
                tokens.splice(syntaxToBeInvertedEntry.removeNegatedBrackets.end + newElementsDelta, 1);
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
