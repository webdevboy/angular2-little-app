import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { OccupancyComponent } from './occupancy.component';
import { PlanDashboardComponent } from './plan-dashboard/plan-dashboard.component';
import { PlanRoomListsComponent } from './plan-room-lists/plan-room-lists.component';
import { PlanSetupComponent } from './plan-setup/plan-setup.component';
import { OccupancyTransitionsComponent } from './occupancy-transitions/occupancy-transitions.component';

const occupancyRouting = [
  {
    path: '',
    component: OccupancyComponent,
    children: [
      { path: '', redirectTo: 'all', terminal: true },
      { path: 'all', component: PlanDashboardComponent },
      { path: 'rooms', component: PlanRoomListsComponent },
      { path: 'setup', component: PlanSetupComponent },
      { path: 'trans', component: OccupancyTransitionsComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(occupancyRouting);
