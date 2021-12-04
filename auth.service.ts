import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Login, userNoPW } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({
    ContentType: 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: User;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  prefEndpoint(ep) {
    // return "http://localhost:5000/" + ep;
    return ep;
  }
  registerUser(user): Observable<any> {
    const registerUrl = this.prefEndpoint('user/register');
    return this.http.post(registerUrl, user, httpOptions);
  }

  authenticateUser(login): Observable<any> {
    const authUrl = this.prefEndpoint('user/authenticate');
    return this.http.post<Login>(authUrl, login, httpOptions);
  }

  storeUserData(token: any, userNoPW: userNoPW) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userNoPW', JSON.stringify(userNoPW));
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userNoPW');
    localStorage.removeItem('card');
  }

  getProfile(): Observable<any> {
    let authToken: any = localStorage.getItem('authToken');
    const httpOptions0 = {
      headers: new HttpHeaders({
        ContentType: "application/json",
        Authorization: 'Bearer ' + authToken,
      }),
    };
    const profileUrl = "http:/localhost:5000/user/profile"
    return this.http.get<any>(profileUrl, httpOptions0);
  }

  getList(): Observable<any> {
    let authToken: any = localStorage.getItem('authToken');
    const httpOptions0 = {
      headers: new HttpHeaders({
        ContentType: "application/json",
        Authorization: 'Bearer ' + authToken,
      }),
    };
    const boardUrl = this.prefEndpoint('user/board');
    return this.http.get<any>(boardUrl, httpOptions0);
  }

  loggedIn(): boolean {
    let authToken: any = localStorage.getItem('authToken');
    return !this.jwtHelper.isTokenExpired(authToken);
  }

  regCard(card: any): Observable<any> {
    const regCardUrl = this.prefEndpoint('user/cardboard');
    return this.http.post<any>(regCardUrl, card, httpOptions);
  }

  getRate(): Observable<any> {
    const APIKey = '5e8f15348452012e268a4ec6bd7e9a2e';
    return this.http.get<any>(
      `http://api.exchangeratesapi.io/v1/latest?access_key=${APIKey}`
    );
  }

  getCard(username: any): Observable<any> {
    let authToken: any = localStorage.getItem('authToken');
    const httpOptions1 = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: 'Bearer ' + authToken,
      }),
    };
    const listUrl = this.prefEndpoint('user/myCard');
    return this.http.post<any>(listUrl, username, httpOptions1);
  }
}
