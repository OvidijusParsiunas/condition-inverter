export const STATEMENTS = ['if', 'elif', 'while'] as const;

export const STATEMENT_JSON: Record<typeof STATEMENTS[number], boolean> = { if: true, elif: true, while: true };
