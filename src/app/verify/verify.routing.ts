import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { VerifyComponent } from './verify.component';

const verifyRouting = [
  {
    path: '',
    component: VerifyComponent
  },
  {
    path: ':token',
    component: VerifyComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(verifyRouting);
