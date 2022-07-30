import { BackboneJSASPNETUtil } from '../expandSelection/htmlTagUtils/specialisedSyntax/backboneJSASPNETUtil';
import { DjangoFlaskUtil } from '../expandSelection/htmlTagUtils/specialisedSyntax/djangoFlaskUtil';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class PercentageSyntaxUtil {
  // when |%> for backboneJSASPNET or %} for DjangoFlask
  public static isCloseClause(tokens: Tokens, currentIndex: number): boolean {
    return BackboneJSASPNETUtil.isCloseTag(tokens, currentIndex) || DjangoFlaskUtil.isCloseClauseStartingWthPercentage(tokens, currentIndex);
  }
}
