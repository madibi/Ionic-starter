import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MasterModule } from './app/layouts/master/master.module';
import { environment } from '@environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(MasterModule)
  .catch(err => console.log(err));
