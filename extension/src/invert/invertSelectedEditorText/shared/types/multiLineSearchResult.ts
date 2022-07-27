import { Token, Tokens } from 'shared/inverter/src/shared/types/tokens';

export interface MultiLineSearchResult {
  token: Token;
  tokenIndex: number;
  line: number;
  fullLineTokens: Tokens;
}
