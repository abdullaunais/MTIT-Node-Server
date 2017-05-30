import { Routes, RouterModule }  from '@angular/router';

import { MovieList } from './movielist.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: MovieList
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
