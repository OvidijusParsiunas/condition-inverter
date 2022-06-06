// WORK - can remove this when extension code has been refactored
// elif - else if for python
export const STATEMENTS = ['if', 'elif', 'while', 'for'] as const;

export const STATEMENT_JSON: Record<typeof STATEMENTS[number], true> = { if: true, elif: true, while: true, for: true };
