import { InsertNewBrackets, SyntaxToBeInverted } from '../shared/types/evaluationState';
import { InsertNewSyntax } from './insertNewSyntax';
import { Tokens } from '../shared/types/tokens';

export class InsertBrackets {
  public static isInsertNewBrackets(invertableSyntaxEntry?: SyntaxToBeInverted): invertableSyntaxEntry is InsertNewBrackets {
    return (invertableSyntaxEntry as InsertNewBrackets)?.insertNewBrackets;
  }

  public static insert(tokens: Tokens, startIndex: number, endIndex: number, tokenIndexDelta: number): number {
    tokenIndexDelta += InsertNewSyntax.insert(tokens, startIndex, '(');
    tokenIndexDelta += InsertNewSyntax.insert(tokens, endIndex + tokenIndexDelta + 1, ')');
    return tokenIndexDelta;
  }
}
