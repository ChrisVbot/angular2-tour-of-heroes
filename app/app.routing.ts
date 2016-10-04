import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './heroes.component';

import { DashboardComponent } from './dashboard.component';

import { HeroDetailComponent } from './hero-detail.component';

//the Routes are an array of route definitions
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }, 
  {
    path: 'detail/:id',
    component: HeroDetailComponent
  }
];
//export a routing constant initialized using the RouterModule.forRoot method applied to our array of routes.
//This method returns a configured router module that we'll add to our root ngModule, AppModule.
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);