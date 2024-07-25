import {
  ApplicationConfig,
  ErrorHandler,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { nonHttpErrorInterceptor } from "./nonHttpError.interceptor";
import { GlobalErrorHandler } from "./global-error-handler";
import { provideClientHydration } from "@angular/platform-browser";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([nonHttpErrorInterceptor])),
    provideAnimationsAsync(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "noop"
        : "animations",
    ),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    provideClientHydration(),
  ],
};
