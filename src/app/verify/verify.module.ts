import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { VerifyComponent } from './verify.component';
import { routing } from './verify.routing';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [VerifyComponent]
})
export class VerifyModule { }
