import { ModuleWithProviders }  from '@angular/core';
import { Router, RouterModule } from '@angular/router';

const appRoutes = [
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full'
  }, {
    path: 'landing-page',
    loadChildren: 'app/landing-page/landing-page.module#LandingPageModule'
  },
  {
    path: 'verify',
    loadChildren: 'app/verify/verify.module#VerifyModule'
  },
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
  }
];


export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
