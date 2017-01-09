import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EasyFeesComponent } from './easy-fees.component';
import { EasyFeesIntroComponent } from './easy-fees-intro/easy-fees-intro.component';
import { EasyFeesSetupComponent } from './easy-fees-setup/easy-fees-setup.component';
import { ChooseOrgTypeComponent } from './components/choose-org-type/choose-org-type.component';

import { EasyFeesManagerService } from './easy-fees-manager.service';

import { routing } from './easy-fees.routing';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    EasyFeesComponent,
    EasyFeesIntroComponent,
    EasyFeesSetupComponent,
    ChooseOrgTypeComponent
  ],
  providers: [
    EasyFeesManagerService
  ]
})
export class EasyFeesModule { }
