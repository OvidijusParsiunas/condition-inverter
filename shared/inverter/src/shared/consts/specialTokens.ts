import { TokensJSON } from '../types/tokensJSON';

// elif - else if for python
export const STATEMENT_JSON: TokensJSON = { if: true, elif: true, while: true, for: true };

export const SPACE_JSON: TokensJSON = { [' ']: true, ['\n']: true, ['\r']: true };
