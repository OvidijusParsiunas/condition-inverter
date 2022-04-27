import { INDEX_OUT_OF_BOUNDS_DURING_TRAVERSAL } from 'inverter/src/shared/consts/errors';

export class ErrorHandler {
  public static displayMessageOnConsole(message: string): void {
    /* eslint-disable no-console */
    console.error(message);
  }

  public static errorHandlerCallback(
    message: string,
    displaySnackbar: (isDisplayed: boolean) => void,
    displaySyntaxError: (isDisplayed: boolean) => void,
  ): void {
    ErrorHandler.displayMessageOnConsole(message);
    if (message !== INDEX_OUT_OF_BOUNDS_DURING_TRAVERSAL) {
      displaySnackbar(true);
    } else {
      displaySyntaxError(true);
    }
  }
}
