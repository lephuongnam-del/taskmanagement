import { Injectable } from '@angular/core';
import {HttpClient,HttpResponse} from '@angular/common/http'
import { WebrequestService } from './webrequest.service';
import { shareReplay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private webService: WebrequestService, private router: Router) { }

  signup(email: string, password: string) {
    return this.webService.signup(email, password);
  }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'));
        console.log("LOGGED IN!");
      })
    )
  }

  logout() {
    this.removeSession();
    this.router.navigate(['/login']);
  }


  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  
  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }
  private setSession(userId: string, accessToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    
  }

}
