import { ErrorHandler } from "@angular/core";

export class GlobalErrorHandler implements ErrorHandler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleError(error: any): void {
    console.error(error);
    alert(
      "Sorry, the application encountered an unexpected error.\n" +
        "Please try again later.\n\n" +
        "If the problem persists, send us an email at support@example.com.",
    );
  }
}
