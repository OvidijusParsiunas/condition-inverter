export class ErrorHandler {
  public static displayMessageOnConsole(message: string): void {
    /* eslint-disable no-console */
    console.error(message);
  }
}
