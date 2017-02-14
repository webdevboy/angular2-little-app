import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { CentreRoomsComponent } from './centre-rooms/centre-rooms.component';
import { CentreFamiliesComponent } from './centre-families/centre-families.component';
import { CentreChildrenComponent } from './centre-children/centre-children.component';
import { CentreDetailsComponent } from './centre-details/centre-details.component';
import { CentreSubventionsComponent } from './centre-subventions/centre-subventions.component';

const settingsRouting = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'families', terminal: true },
      { path: 'families', component: CentreFamiliesComponent },
      { path: 'rooms', component: CentreRoomsComponent },
      { path: 'children', component: CentreChildrenComponent },
      { path: 'details', component: CentreDetailsComponent },
      { path: 'subventions', component: CentreSubventionsComponent}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(settingsRouting);
