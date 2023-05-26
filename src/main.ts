import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
// fetch('docker/prod.json').then(data => data.json()).then(data => data.prod)
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
