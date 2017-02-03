import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../../shared/http-client.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.scss'],
})
export class RegisterCardComponent implements OnInit {
  public registerForm: FormGroup;
  public email: FormControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$')
    ]));
  public name: FormControl = new FormControl('', Validators.required);
  public password: FormControl = new FormControl('', Validators.minLength(6));
  public businessName: FormControl = new FormControl('', Validators.required);
  public errorMessage: string;
  public loading: boolean;
  constructor(
    public http: HttpClientService,
    public router: Router,
    private fb:FormBuilder
  ) {
    this.registerForm = this.fb.group({
      email: this.email,
      name: this.name,
      password: this.password,
      businessName: this.businessName
    });
  }

  ngOnInit() {
  }

  register() {
    if(this.registerForm.valid && !this.loading) {
      this.loading = true;
      let { email, password, name, businessName } = this.registerForm.value;
      this.http.requestRegister(email, password, name, businessName).subscribe(res => {
        this.loading = false;
        if (res.status === 200) {
          this.router.navigate(['verify']);
        }
      }, error => {
        this.loading = false;
        if (error.status === 400) {
          this.errorMessage = error.json().message;
        } else {
          this.errorMessage = 'Bad response from the serve :/ Please try again later.'
        }
      });
    }
    return;
  }
}
