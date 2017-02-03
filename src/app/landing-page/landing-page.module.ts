import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LandingPageComponent } from './landing-page.component';
import { LoginCardComponent } from './login-card/login-card.component';
import { RegisterCardComponent } from './register-card/register-card.component';
import { routing } from './landing-page.routing';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    LandingPageComponent,
    LoginCardComponent,
    RegisterCardComponent
  ]
})
export class LandingPageModule { }
