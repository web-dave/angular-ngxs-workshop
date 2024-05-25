import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { provideStore } from '@ngxs/store';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideStore([], withNgxsReduxDevtoolsPlugin({ disabled: !isDevMode() }), withNgxsFormPlugin()),
    provideRouter(routes, withComponentInputBinding())
  ]
};
