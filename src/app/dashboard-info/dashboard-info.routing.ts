import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { DashboardInfoComponent } from './dashboard-info.component';

const dashboardInfoRouting = [
  {
    path: '',
    component: DashboardInfoComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(dashboardInfoRouting);
