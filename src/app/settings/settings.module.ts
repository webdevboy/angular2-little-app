import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings.component';
import { CentreRoomsComponent } from './centre-rooms/centre-rooms.component';
import { CentreChildrenComponent } from './centre-children/centre-children.component';
import { CentreDetailsComponent } from './centre-details/centre-details.component';
import { CentreSubventionsComponent } from './centre-subventions/centre-subventions.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { EcceCapitationsComponent } from './components/ecce-capitations/ecce-capitations.component';

import { routing } from './settings.routing';
import { AddChildComponent } from './components/add-child/add-child.component';
import { CentreFamiliesComponent } from './centre-families/centre-families.component';
import { AddNewFamiliesComponent } from './centre-families/components/add-new-families/add-new-families.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    SettingsComponent,
    CentreRoomsComponent,
    CentreChildrenComponent,
    CentreDetailsComponent,
    CentreSubventionsComponent,
    AddRoomComponent,
    EcceCapitationsComponent,
    AddChildComponent,
    CentreFamiliesComponent,
    AddNewFamiliesComponent
  ]
})
export class SettingsModule { }
