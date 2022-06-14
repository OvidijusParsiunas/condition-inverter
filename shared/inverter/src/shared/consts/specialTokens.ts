import { TokensJSON } from '../types/tokensJSON';

// WORK - can remove this when extension code has been refactored
// elif - else if for python
const STATEMENTS = ['if', 'elif', 'while', 'for'] as const;

export const STATEMENT_JSON: Record<typeof STATEMENTS[number], true> = { if: true, elif: true, while: true, for: true };

export const SPACE_JSON: TokensJSON = { [' ']: true, ['\n']: true, ['\r']: true };
