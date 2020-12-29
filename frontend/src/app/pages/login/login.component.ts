import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  auth2: any;
  @ViewChild('GoogleLogin', {static: true }) loginElement: ElementRef;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.googleSDK();
  }
  onLoginButtonClicked(email: string, password: string) {
    this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200) {
        // we have logged in successfully
        this.router.navigate(['/list']);
      }
      console.log(res);
      
    });
  }
  prepareLoginButton() {
 
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
 
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
        this.authService.signup(profile.getEmail(), "iahshsdbfuabewiurgfwaiehlfiawuenfuiwa98233479263874965lxzkcjvoisj").subscribe((res: HttpResponse<any>) => {
          console.log(res.body);
          this.authService.login(profile.getEmail(), "iahshsdbfuabewiurgfwaiehlfiawuenfuiwa98233479263874965lxzkcjvoisj").subscribe((res: HttpResponse<any>) => {
            if (res.status === 200) {
              // we have logged in successfully
              this.router.navigate(['/list']);
            }
            console.log(res);
            
          });
   
        });
        
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
 
  }
  googleSDK() {
 
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '454714860786-q90sroav4hdnl3rndubs8nmdlar1juel.apps.googleusercontent.com',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }
 
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
 
  }
 

}
