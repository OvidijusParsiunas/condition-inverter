import { EvaluationState } from '../../../../../shared/types/evaluationState';
import { AnalyzeBrackatableSyntax } from './analyzeBrackatableSyntax';
import { Tokens } from '../../../../../shared/types/tokens';
import { AnalyzeFunction } from './analyzeFunction';

export class AnalyzeEqualsSign {
  private static getNewIndex(tokens: Tokens, index: number): number {
    if (tokens[index + 2] === '=') {
      return index + 2;
    }
    return index + 1;
  }

  private static analyzeComparisonOperator(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    evaluationState.markedForOperatorInversion = true;
    evaluationState.syntaxToBeInverted.push({ start: index });
    // this is run for == and === but not = as it is invalid inside an if statement
    return AnalyzeEqualsSign.getNewIndex(tokens, index);
  }

  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const nextToken = tokens[index + 1];
    if (nextToken === '>') {
      return AnalyzeFunction.updateStateForArrow(tokens, index + 1, evaluationState);
    } else if (nextToken === ' ') {
      // for destructuring e.g. if ({ dog } = cat)
      AnalyzeBrackatableSyntax.updateState(evaluationState);
      return index;
    }
    return AnalyzeEqualsSign.analyzeComparisonOperator(tokens, index, evaluationState);
  }
}
