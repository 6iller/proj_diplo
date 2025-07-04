import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';

import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(RouterModule.forRoot(routes)),
    providePrimeNG({
      theme: { preset: Lara },
      ripple: true,
      inputStyle: 'filled'
    })
  ]
}).catch(err => console.error(err));

