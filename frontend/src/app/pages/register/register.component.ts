import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from '../../auth.service' ;
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  myForm:FormGroup;
  successMessage: String = '';
  constructor(private authService: AuthService, private router: Router) {
    this.myForm = new FormGroup({
      email: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required)
    });
    this.myForm.controls.password.valueChanges
   
   }

   isValid(controlName) {
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }
  ngOnInit(): void {
  }

  
  passValidator(control: AbstractControl) {
    if (control && (control.value == null || control.value == undefined)) {
    
      return null;
    }
 }
 onSignupButtonClicked(email: string, password: string) {
  this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
    console.log(res);
   
  });
}
}
