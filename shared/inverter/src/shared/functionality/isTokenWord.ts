import { Token } from '../types/tokens';

export class IsTokenWord {
  public static check(token: Token): boolean {
    return Boolean((token as string)?.match(/(\w+)/g));
  }
}
