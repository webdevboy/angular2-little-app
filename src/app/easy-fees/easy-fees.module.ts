import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EasyFeesComponent } from './easy-fees.component';
import { EasyFeesIntroComponent } from './easy-fees-intro/easy-fees-intro.component';
import { EasyFeesSetupComponent } from './easy-fees-setup/easy-fees-setup.component';
import { ChooseOrgTypeComponent } from './components/choose-org-type/choose-org-type.component';

import { EasyFeesManagerService } from './easy-fees-manager.service';

import { routing } from './easy-fees.routing';
import { EasyFeesDashboardComponent } from './easy-fees-dashboard/easy-fees-dashboard.component';
import { AccordionPaymentsViewComponent } from './components/accordion-payments-view/accordion-payments-view.component';
import { PopupPrintMandateComponent } from './components/popup-print-mandate/popup-print-mandate.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    EasyFeesComponent,
    EasyFeesIntroComponent,
    EasyFeesSetupComponent,
    ChooseOrgTypeComponent,
    EasyFeesDashboardComponent,
    AccordionPaymentsViewComponent,
    PopupPrintMandateComponent
  ],
  providers: [
    EasyFeesManagerService
  ]
})
export class EasyFeesModule { }
