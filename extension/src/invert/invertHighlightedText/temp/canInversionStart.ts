import { Evaluator } from 'shared/inverter/src/evaluator/evaluator';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { Range, TextEditor } from 'vscode';

export class CanInversionStart {
  public static verifyUsingAnalyzers(highlightedRange: Range, editor: TextEditor): boolean {
    const statementText = editor.document.getText(highlightedRange);
    const tokens = Tokenizer.tokenize(statementText);
    for (let index = 0; index < tokens.length; index += 1) {
      for (let i = 0; i < Evaluator.conditionAnalyzers.length; i += 1) {
        if (Evaluator.conditionAnalyzers[i].shouldAnalysisStart(tokens, index)) {
          return true;
        }
      }
    }
    return false;
  }
}
