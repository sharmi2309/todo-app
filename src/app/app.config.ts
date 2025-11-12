import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptor/jwt.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { errorInterceptor } from './core/interceptor/error.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),  provideHttpClient(
      withFetch(),
      withInterceptors([JwtInterceptor, errorInterceptor])
    ),
  importProvidersFrom(MatSnackBarModule), provideAnimationsAsync()]
};
