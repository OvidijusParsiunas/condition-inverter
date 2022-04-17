import { InsertNewBrackets, SyntaxToBeInverted } from '../shared/types/evaluationState';
import { InsertNewSyntax } from './insertNewSyntax';
import { Tokens } from '../shared/types/tokens';

export class InsertBrackets {
  public static isInsertNewBrackets(invertableSyntaxEntry?: SyntaxToBeInverted): invertableSyntaxEntry is InsertNewBrackets {
    return (invertableSyntaxEntry as InsertNewBrackets)?.insertNewBrackets;
  }

  public static insert(tokens: Tokens, startIndex: number, endIndex: number, newElementsDelta: number): number {
    newElementsDelta += InsertNewSyntax.insert(tokens, startIndex, '(');
    newElementsDelta += InsertNewSyntax.insert(tokens, endIndex + newElementsDelta + 1, ')');
    return newElementsDelta;
  }
}
