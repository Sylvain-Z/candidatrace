import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { appRoutes } from './services/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // importer le fichier routes

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideHttpClient(), provideAnimationsAsync()] // providers pour les routes et les requêtes http
};

