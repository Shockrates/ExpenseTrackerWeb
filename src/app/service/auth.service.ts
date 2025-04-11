import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Login } from '../auth/interface/login';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = "JWT_TOKEN";
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private http = inject(HttpClient);
  

  constructor() { }

  login(user:Login):Observable<any> {
    return this.http.post('api/auth/login',user)
      .pipe(
        tap((response:any)=> {
          if (response && response.data) {
            this.doLoginUser(user.userEmail, response.data)
          }
          
        })
      )
  }

  private doLoginUser(username: string, tokens: any): void {
    this.loggedUser=username;
    this.storeJwtToken(tokens);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    console.log("token:"+jwt);
    localStorage.setItem(this.JWT_TOKEN,jwt);
  }

  logout(){
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null; 
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
