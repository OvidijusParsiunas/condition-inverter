import { EvaluateAndPrepareOutsideStatement } from './utils/evaluateAndPrepare';
import { TraversalUtil } from '../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { ConditionAnalyzer } from '../shared/conditionAnalyzer';
import { AnalyzeOutsideStatement } from './utils/analyzeToken';
import { TokensJSON } from '../../../shared/types/tokensJSON';
import { Tokens } from '../../../shared/types/tokens';

export class AnalyzeConditionOutsideStatement {
  private static readonly logicalOperatorStartTokens: TokensJSON = { ['&']: true, ['|']: true };
  private static readonly pythonLogicalOperatorTokens: TokensJSON = { ['and']: true, ['or']: true };
  private static readonly lessOrGreaterThanOperatorTokens: TokensJSON = { ['<']: true, ['>']: true };

  private static readonly isConditionStartFuncs = [
    AnalyzeConditionOutsideStatement.isLogicalOperatorToken,
    AnalyzeConditionOutsideStatement.isTernaryOperatorToken,
    AnalyzeConditionOutsideStatement.isLessOrGreaterThanOperatorToken,
    AnalyzeConditionOutsideStatement.isPythonLogicalOperatorToken,
    AnalyzeConditionOutsideStatement.isEqualityOperatorToken,
  ];

  private static isLogicalOperatorToken(tokens: Tokens, currentIndex: number): boolean {
    return (
      AnalyzeConditionOutsideStatement.logicalOperatorStartTokens[tokens[currentIndex] as string] &&
      AnalyzeConditionOutsideStatement.logicalOperatorStartTokens[tokens[currentIndex + 1] as string] &&
      tokens[currentIndex + 2] !== '='
    );
  }

  private static isPythonLogicalOperatorToken(tokens: Tokens, currentIndex: number): boolean {
    return AnalyzeConditionOutsideStatement.pythonLogicalOperatorTokens[tokens[currentIndex] as string];
  }

  public static isTernaryOperatorToken(tokens: Tokens, currentIndex: number): boolean {
    if (tokens[currentIndex] === '?' && tokens[currentIndex + 1] !== '?' && tokens[currentIndex + 1] !== '.' && tokens[currentIndex - 1] !== '?') {
      // do not proceed to invert if there is no logic before the ternary operator
      const siblingTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, currentIndex - 1, false);
      return siblingTokenIndex > -1;
    }
    return false;
  }

  private static isLessOrGreaterThanOperatorToken(tokens: Tokens, currentIndex: number): boolean {
    return (
      AnalyzeConditionOutsideStatement.lessOrGreaterThanOperatorTokens[tokens[currentIndex] as string] &&
      !AnalyzeConditionOutsideStatement.lessOrGreaterThanOperatorTokens[tokens[currentIndex - 1] as string] &&
      !AnalyzeConditionOutsideStatement.lessOrGreaterThanOperatorTokens[tokens[currentIndex + 1] as string]
    );
  }

  private static isEqualityOperatorToken(tokens: Tokens, currentIndex: number): boolean {
    return tokens[currentIndex] === '=' && (tokens[currentIndex + 1] === '=' || tokens[currentIndex - 1] === '!');
  }

  // not inverting if expression starts with ! or not because that is regarded as a statement and not a condition
  // e.g:
  // const dog = !cat
  // or
  // const dog = not(cat)
  // not set to invert
  public static shouldAnalysisStart(tokens: Tokens, index: number): boolean {
    for (let i = 0; i < AnalyzeConditionOutsideStatement.isConditionStartFuncs.length; i += 1) {
      const isStart = AnalyzeConditionOutsideStatement.isConditionStartFuncs[i](tokens, index);
      if (isStart) return true;
    }
    return false;
  }

  public static traverseTokensAndUpdateEvaluationState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const startIndex = EvaluateAndPrepareOutsideStatement.getStartIndexAndUpdateState(tokens, index, evaluationState);
    return ConditionAnalyzer.traverseTokensAndUpdateEvaluationState(tokens, startIndex, evaluationState, AnalyzeOutsideStatement.analyze);
  }
}
