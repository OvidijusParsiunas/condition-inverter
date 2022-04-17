import { UNEXPECTED_ERROR_MESSAGE_INTRODUCTION } from '../../../shared/consts/errors';

export class ErrorHandling {
  private static constructUnexpectedMessage(errorMessage: string): string {
    return `${UNEXPECTED_ERROR_MESSAGE_INTRODUCTION}. \nError: ${errorMessage}`;
  }

  public static printErrorMessageOnConsole(error: Error): void {
    console.log(ErrorHandling.constructUnexpectedMessage(error.message));
  }
}
