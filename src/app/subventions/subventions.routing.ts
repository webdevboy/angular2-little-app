import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SubventionsComponent } from './subventions.component';

const subventionsRoutes = [
  {
    path: '',
    component: SubventionsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(subventionsRoutes);
