import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { fireBaseAPIDet } from './app/fireBaseAPICon';
import firebase from 'firebase/compat/app';

firebase.initializeApp(fireBaseAPIDet);

let appInit = false;

firebase.auth().onAuthStateChanged(() => {
  if (!appInit) {
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  }

  appInit = true;
});
