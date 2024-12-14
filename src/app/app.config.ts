import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngxs/store';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(routes, withComponentInputBinding()),
    provideStore(
      [],
      withNgxsFormPlugin(),
      withNgxsRouterPlugin(),
      withNgxsReduxDevtoolsPlugin({ disabled: !isDevMode() })
    )
  ]
};
