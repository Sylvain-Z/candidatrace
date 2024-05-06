import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { appRoutes } from './services/app.routes'; // importer le fichier routes

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideHttpClient()] // providers pour les routes et les requêtes http
};

