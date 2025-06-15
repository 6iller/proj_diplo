// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideHttpClient } from '@angular/common/http';
// import { provideAnimations } from '@angular/platform-browser/animations';

// import { AppComponent } from './app/app.component';
// import { AppRoutingModule } from './app/app.routes';
// import { importProvidersFrom } from '@angular/core';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(), // ✅ это вместо импорта HttpClientModule
//     provideAnimations(),  // ✅ если используешь PrimeNG анимации
//     importProvidersFrom(AppRoutingModule)
//   ]
// }).catch(err => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(RouterModule.forRoot(routes))
  ]
}).catch(err => console.error(err));

