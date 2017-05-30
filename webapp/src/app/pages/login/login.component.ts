import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from "app/services/user.service";
import { Routes, Router } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  providers: [UserService]
})
export class Login {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;

  userService: UserService;

  constructor(fb: FormBuilder, userService: UserService, private router: Router) {
    this.userService = userService;
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
      this.userService.authUser(values['email'], values['password']).then((result) => {
        console.log(result);
        if (result['_body'] === 'invalid user') {
          alert('Invalid User Credentials');
        } else if (result['message'] === 'login success') {
          this.router.navigate(['/pages/showcase']);
        }
      });
    }
  }
}
