import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

public loginStatusSubject = new Subject<boolean>

  //generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData)
  }


  //login user: set token in LocalStorage
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }


  //current user: which is Loggedin
  public getCurrrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //isLogin:user is Logged in or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }


  // Remove token from local storage 
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }


  //get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //set userDetail
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //getUser
  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
