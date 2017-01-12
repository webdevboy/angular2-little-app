import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { OccupancyComponent } from './occupancy.component';
import { PlanDashboardComponent } from './plan-dashboard/plan-dashboard.component';
import { PlanSetupComponent } from './plan-setup/plan-setup.component';
import { PlanRoomListsComponent } from './plan-room-lists/plan-room-lists.component';

import { routing } from './occupancy.routing';
import { RoomInfoAccordianComponent } from './components/room-info-accordian/room-info-accordian.component';
import { MoveClassComponent } from './components/move-class/move-class.component';
import { OccupancyModalComponent } from './components/occupancy-modal/occupancy-modal.component';
import { AddStaffComponent } from './components/add-staff/add-staff.component';
import { RemoveWaitingChildComponent } from './components/remove-waiting-child/remove-waiting-child.component';
import { OccupancyTransitionsComponent } from './occupancy-transitions/occupancy-transitions.component';
import { ScrollNavbarComponent } from './components/scroll-navbar/scroll-navbar.component';
import { OccupancyChlidComponent } from './components/occupancy-chlid/occupancy-chlid.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    OccupancyComponent,
    PlanDashboardComponent,
    PlanSetupComponent,
    RoomInfoAccordianComponent,
    MoveClassComponent,
    OccupancyModalComponent,
    AddStaffComponent,
    PlanRoomListsComponent,
    RemoveWaitingChildComponent,
    OccupancyTransitionsComponent,
    ScrollNavbarComponent,
    OccupancyChlidComponent
  ]
})
export class OccupancyModule { }
