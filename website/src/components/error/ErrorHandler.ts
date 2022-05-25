export class ErrorHandler {
  public static displayMessageOnConsole(message: string): void {
    /* eslint-disable no-console */
    console.error(message);
  }

  // the displaySnackbar callback has been kept in-case it is needed in the future
  public static errorHandlerCallback(
    message: string,
    displaySnackbar: (isDisplayed: boolean) => void,
    displaySyntaxError: (isDisplayed: boolean) => void,
  ): void {
    ErrorHandler.displayMessageOnConsole(message);
    displaySyntaxError(true);
  }
}
