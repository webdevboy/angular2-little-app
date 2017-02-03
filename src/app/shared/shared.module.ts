import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MdlModule } from 'angular2-mdl';
import { MdlSelectModule } from '@angular2-mdl-ext/select';

// Shared Providers
import { HttpClientService } from './http-client.service';
import { SessionManagerService } from './session-manager.service';
import { ProfileManagerService } from './profile-manager.service';
import { ChildrenManagerService } from './children-manager.service';
import { RoomsManagerService } from './rooms-manager.service';
import { ReportsManagerService } from './reports-manager.service';
import { CookieService } from 'angular2-cookie/core';

// Shared Components

import { NavbarComponent } from './components/navbar/';
import { NavbarSmallComponent } from './components/navbar-small/';
import { ModalComponent } from './components/modal/';
import { SearchbarComponent } from './components/searchbar/';
import { ConfirmDialogComponent } from './components/confirm-dialog/';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { FlexCardComponent } from './components/flex-card/flex-card.component';

const sharedProviders = [
  HttpClientService,
  SessionManagerService,
  ProfileManagerService,
  ChildrenManagerService,
  RoomsManagerService,
  ReportsManagerService,
  CookieService
];

const sharedComponents = [
  NavbarComponent,
  NavbarSmallComponent,
  ModalComponent,
  SearchbarComponent,
  ConfirmDialogComponent,
  DatepickerComponent,
  FlexCardComponent
];

@NgModule({
  imports: [
    CommonModule,
    MdlModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...sharedComponents
  ],
  exports: [
    CommonModule,
    MdlModule,
    MdlSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ...sharedComponents
  ],
  providers: [
    ...sharedProviders
  ]
})
export class SharedModule { }
