import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const dashboardRoutes = [
  {
    path: '',
    component: DashboardComponent,
    children: [{
      path: '',
      redirectTo: 'info',
    },
    {
      path: 'info',
      loadChildren: 'app/dashboard-info/dashboard-info.module#DashboardInfoModule'
    }, {
      path: 'subventions',
      loadChildren: 'app/subventions/subventions.module#SubventionsModule'
    }, {
      path: 'settings',
      loadChildren: 'app/settings/settings.module#SettingsModule'
    }, {
      path: 'attendance',
      loadChildren: 'app/attendance/attendance.module#AttendanceModule'
    }, {
      path: 'reports',
      loadChildren: 'app/reports/reports.module#ReportsModule'
    }, {
      path: 'easy-fees',
      loadChildren: 'app/easy-fees/easy-fees.module#EasyFeesModule'
    }, {
      path: 'occupancy',
      loadChildren: 'app/occupancy/occupancy.module#OccupancyModule'
    }]
  }
];

export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);
