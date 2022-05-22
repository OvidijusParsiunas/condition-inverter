import { Tokens, Token } from '../types/tokens';

export class TokenOccurrences {
  public static getIndexes(tokens: Tokens, target: Token): number[] {
    return tokens.reduce(
      (accumulator: number[], currentValue: Token, currentIndex: number) => (currentValue === target && accumulator.push(currentIndex), accumulator),
      [],
    );
  }
}
