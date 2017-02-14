import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AttendanceComponent } from './attendance.component';

const attendanceRoutes = [
  {
    path: '',
    redirectTo: 'all',
    terminal: true
  },
  {
    path: ':id',
    component: AttendanceComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(attendanceRoutes);
