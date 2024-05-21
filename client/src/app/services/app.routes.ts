import { inject } from "@angular/core";
import { Routes } from "@angular/router";
import { UsersService } from "./users/users.service";
// import { DashboardComponent } from "../components/user/dashboard.component";   // route de base

// fonctionne avec le providers: [provideRouter(appRoutes)] du fichier app.config.ts

export const appRoutes: Routes = [
    {
        path : '',
        title : 'Bienvenue',
        loadComponent: () => import('../components/home/home.component') 
    },
    {
        path : 'connexion',
        title : 'Connexion',
        loadComponent: () => import('../components/users/logs/signIn.component'),
    },
    {
        path : 'creer-mon-compte',
        title : 'Créer un compte',
        loadComponent: () => import('../components/users/logs/signUp.component'),
    },
    {
        path : 'tableau-de-bord/:id',
        title : 'Tableau de Bord',
        canActivate : [() => inject(UsersService).isLoggedIn()], // bloque l'accès à certaine pages lorsque le use n'est pas connecté
        loadComponent: () => import('../components/users/dashboard.component') // lazyloading
        // component: DashboardComponent,  // route de base
    },
    {
        path : 'candidatures/:id',
        title : 'Candidatures',
        canActivate : [() => inject(UsersService).isLoggedIn()],
        loadComponent: () => import('../components/users/applications.component'),
    },
    {
        path : 'profil/:id',
        title : 'Profil',
        canActivate : [() => inject(UsersService).isLoggedIn()],
        loadComponent: () => import('../components/users/profil/profil.component') ,
    },
    {
        path : 'documents/:id',
        title : 'Documents',
        canActivate : [() => inject(UsersService).isLoggedIn()],
        loadComponent: () => import('../components/users/myFiles.component') ,
    },
    {
        path : '**', // pour toute pages inexistantes l'application va renvoyer à ce composant
        title : 'Not Found',
        loadComponent: () => import('../components/others/not-found.component') ,
    },
]
