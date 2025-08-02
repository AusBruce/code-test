import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { provideForms } from '@angular/forms';


export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration(), provideHttpClient(), provideForms()]
};
