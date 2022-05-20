import { SyntaxToBeInverted, InvertBooleanLiteral as InvertBooleanLiteralT } from '../../shared/types/evaluationState';
import { InsertNewSyntax } from '../insert/insertNewSyntax';
import { Tokens } from '../../shared/types/tokens';

export class InvertBooleanLiteral {
  private static readonly booleanLiteralToInveted: { [key: string]: number | boolean | string } = {
    [0]: 1,
    [1]: 0,
    true: false,
    false: true,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    True: 'False',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    False: 'True',
  };

  private static isInvertBooleanLiteral(invertableSyntaxEntry: SyntaxToBeInverted): invertableSyntaxEntry is InvertBooleanLiteralT {
    return !!(invertableSyntaxEntry as InvertBooleanLiteralT).invertBooleanLiteral;
  }

  // True and False boolean values are used in Python
  public static invert(tokens: Tokens, tokenIndex: number, syntaxToBeInvertedEntry: SyntaxToBeInverted, tokenIndexDelta: number): number {
    if (InvertBooleanLiteral.isInvertBooleanLiteral(syntaxToBeInvertedEntry)) {
      const currentBoolean = tokens[tokenIndex];
      tokens[tokenIndex] = InvertBooleanLiteral.booleanLiteralToInveted[currentBoolean as string];
    } else {
      tokenIndexDelta += InsertNewSyntax.insert(tokens, tokenIndex, '!');
    }
    return tokenIndexDelta;
  }
}
