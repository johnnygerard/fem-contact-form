import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { delay, of, retry, throwError } from "rxjs";

export const nonHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry({
      count: 3,
      delay(res: HttpErrorResponse, retryCount: number) {
        // Retry non-HTTP errors after 1ms, 10ms, 100ms
        if (res.status === 0) {
          window.console.error(
            `Retry failed request (Attempt #${retryCount})...`,
          );
          return of(true).pipe(delay(10 ** (retryCount - 1)));
        }

        // Propagate user-friendly error message
        if (res.status >= 400)
          return throwError(() => res.error ?? Error("Unknown error"));

        throw Error("Invalid HTTP status code"); // Should never happen
      },
    }),
  );
};
