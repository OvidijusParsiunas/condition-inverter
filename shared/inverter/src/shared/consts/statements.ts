// elif - else if for python
export const STATEMENTS = ['if', 'elif', 'while', 'for'] as const;

export const STATEMENT_JSON: Record<typeof STATEMENTS[number], boolean> = { if: true, elif: true, while: true, for: true };
