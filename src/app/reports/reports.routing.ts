import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';

const reportRoutes = [
  {
    path: '',
    redirectTo: 'all',
    terminal: true
  },
  {
    path: ':id',
    component: ReportsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(reportRoutes);
