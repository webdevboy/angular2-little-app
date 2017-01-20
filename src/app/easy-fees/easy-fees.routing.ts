import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { EasyFeesComponent } from './easy-fees.component';
import { EasyFeesIntroComponent } from './easy-fees-intro/easy-fees-intro.component';
import { EasyFeesDashboardComponent } from './easy-fees-dashboard/easy-fees-dashboard.component';
import { EasyFeesSetupComponent } from './easy-fees-setup/easy-fees-setup.component';

const easyFeesRoutes = [
  {
    path: '',
    component: EasyFeesComponent,
    children: [
      { path: '', redirectTo: 'intro', terminal: true },
      { path: 'intro', component: EasyFeesIntroComponent },
      { path: 'view', component: EasyFeesDashboardComponent },
      { path: 'setup', component: EasyFeesSetupComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(easyFeesRoutes);
