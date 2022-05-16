import { STATEMENTS } from '../../../../shared/out/inverter/src/shared/consts/statements';

type ParametersExceptFirst<F, R> = F extends (statement: string, ...rest: infer E) => R ? E : never;

export class StatementTraversalCallbackUtil {
  public static traverseNullable<R, T extends (...args: any[]) => R | null, E extends ParametersExceptFirst<T, ReturnType<T>>>(
    callback: T,
    defaultReturn: R,
    ...parameters: E
  ): R {
    for (let i = 0; i < STATEMENTS.length; i += 1) {
      const result = callback(STATEMENTS[i], ...parameters);
      if (result) return result;
    }
    return defaultReturn;
  }
}
