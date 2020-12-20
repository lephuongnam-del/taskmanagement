import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebrequestService {

  readonly ROOT_URL;
  constructor(private http:HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
   }


   get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/register`, {
      email,
      password
    }, {
        observe: 'response'
      });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/login`, {
      email,
      password
    }, {
        observe: 'response'
      });
  }


}