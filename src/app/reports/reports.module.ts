import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReportsComponent } from './reports.component';
import { AttendanceStatusComponent } from './components/attendance-status/attendance-status.component';

import { routing } from './reports.routing';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [ReportsComponent, AttendanceStatusComponent]
})
export class ReportsModule { }
