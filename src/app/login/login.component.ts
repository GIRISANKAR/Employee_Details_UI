import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../authentication/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  username: string;

  password: string;

  ngOnInit() {

  }

  login() : void {

    if(this.username == 'admin' && this.password == 'admin'){

      this.router.navigate(["admin"]);

    }else {

      alert("Invalid credentials");

    }

  }

}

  /*constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }


  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  loginForm: FormGroup;
  isSubmitted  =  false;

  get formControls() {
    return this.loginForm.controls;
  }

  login(){
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }

    this.authService.login(this.loginForm.value);
    this.router.navigateByUrl('/admin');
  }
}
/!*
login(){

  if(this.loginForm.valid){
    this.isSubmitted = true;
    const userCategory = this.loginForm.value.userCategory;
    const userName = 'admin'; //this.form.value.userName;
    const passwd = 'admin'; //this.form.value.passwd;

    console.log(userCategory, userName, passwd);
    this.authService.isLoggedIn = true;

    this.router.navigate(['admin']);
  }
}*!/*/
