import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { Tokens } from '../../../../shared/types/tokens';

// important to note that html attribute conditions are regarded and analysed as outside of statement conditions, however there
// are dom conditions that must be inverted without a condition symbol such as ng-hide; ng-hide="dog" = ng-hide="!dog"
export class AnalyzeFrontendFramework {
  // ng-hide, ng-show, v-show
  public static isStartOfAngularJSOrVueDirective(tokens: Tokens, index: number): boolean {
    // ng - angular
    // v - vue
    if (tokens[index] === 'ng' || tokens[index] === 'v') {
      if (tokens[index + 1] === '-') {
        return tokens[index + 2] === 'hide' || tokens[index + 2] === 'show';
      }
    }
    return false;
  }

  // ng-hide, ng-show, v-show
  public static isEndofAngularJSOrVueDirective(tokens: Tokens, index: number): boolean {
    if (tokens[index] === 'hide' || tokens[index] === 'show') {
      // ng - angular
      // v - vue
      return tokens[index - 1] === '-' && (tokens[index - 2] === 'ng' || tokens[index - 2] === 'v');
    }
    return false;
  }

  private static isEmberIsActiveVariablePrefixSymbols(tokens: Tokens, isActiveTokenIndex: number): boolean {
    const indexOfTokenAfterIsActive = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, isActiveTokenIndex + 1);
    if (tokens[indexOfTokenAfterIsActive] === '=') {
      const indexOfTokenAfterEquals = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, indexOfTokenAfterIsActive + 1);
      if (tokens[indexOfTokenAfterEquals] === '{') {
        const indexOfTokenAfterOpenCurlyBrace = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, indexOfTokenAfterEquals + 1);
        return tokens[indexOfTokenAfterOpenCurlyBrace] === '{';
      }
    }
    return false;
  }

  public static isStartOfEmberIsActiveArgument(tokens: Tokens, atSymbolTokenIndex: number): boolean {
    if (tokens[atSymbolTokenIndex] === '@' && tokens[atSymbolTokenIndex + 1] === 'isActive') {
      return AnalyzeFrontendFramework.isEmberIsActiveVariablePrefixSymbols(tokens, atSymbolTokenIndex + 1);
    }
    return false;
  }

  public static isEndOfEmberIsActiveArgument(tokens: Tokens, atSymbolTokenIndex: number): boolean {
    if (tokens[atSymbolTokenIndex] === 'isActive' && tokens[atSymbolTokenIndex - 1] === '@') {
      return AnalyzeFrontendFramework.isEmberIsActiveVariablePrefixSymbols(tokens, atSymbolTokenIndex);
    }
    return false;
  }

  public static isAngular2Directive(tokens: Tokens, index: number): boolean {
    // [hidden]=
    if (tokens[index] === 'hidden') {
      const indexOfTokenAfterHidden = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index + 1);
      if (tokens[indexOfTokenAfterHidden] === ']') {
        const indexOfTokenAfterCloseSqrBracket = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, indexOfTokenAfterHidden + 1);
        return tokens[indexOfTokenAfterCloseSqrBracket] === '=';
      }
    }
    // [class.name]=
    if (tokens[index] === 'class' && tokens[index + 1] === '.') {
      const nextTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index + 2);
      // when class.name]=", we need to skip the name and set indexOfTokenAfterStartSymbol to ] index
      const indexOfTokenAfterNext = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, nextTokenIndex + 1);
      if (tokens[indexOfTokenAfterNext] === ']') {
        const indexOfTokenAfterCloseSqrBracket = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, indexOfTokenAfterNext + 1);
        return tokens[indexOfTokenAfterCloseSqrBracket] === '=';
      }
    }
    // *ngIf=
    return tokens[index] === 'ngIf';
  }
}
