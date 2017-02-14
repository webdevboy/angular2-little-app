import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SubventionsManagerService } from './subventions-manager.service';
import { SubventionsComponent } from './subventions.component';
import { ListButtonsComponent } from './components/list-buttons/list-buttons.component';
import { ColoredButtonComponent } from './components/colored-button/colored-button.component';
import { EcceModalComponent } from './components/ecce-modal/ecce-modal.component';

import { routing } from './subventions.routing';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    SubventionsComponent,
    ListButtonsComponent,
    ColoredButtonComponent,
    EcceModalComponent
  ],
  providers: [
    SubventionsManagerService
  ]
})
export class SubventionsModule { }
