import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { nonHttpErrorInterceptor } from "./nonHttpError.interceptor";

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
  ],
};
