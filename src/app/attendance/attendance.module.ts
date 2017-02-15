import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AttendanceComponent } from './attendance.component';
import { TimepickerComponent } from './components/timepicker/timepicker.component';
import { PresenceBarComponent } from './components/presence-bar/presence-bar.component';

import { routing } from './attendance.routing';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [AttendanceComponent, TimepickerComponent, PresenceBarComponent]
})
export class AttendanceModule { }
