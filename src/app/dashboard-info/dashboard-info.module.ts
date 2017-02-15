import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardInfoComponent } from './dashboard-info.component';

import { routing } from './dashboard-info.routing';
@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [DashboardInfoComponent]
})
export class DashboardInfoModule { }
