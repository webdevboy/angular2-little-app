import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { LandingPageComponent } from './landing-page.component';

const landingPageRouting = [
  {
    path: '',
    component: LandingPageComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(landingPageRouting);
