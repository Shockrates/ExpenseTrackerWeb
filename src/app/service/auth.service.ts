import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Login } from '../auth/interface/login';

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
    return this.http.post('api/users/login',user).pipe(
      tap(
        (response:any)=> this.doLoginUser(user.userEmail, response.data))
    )
  }

  private doLoginUser(username: string, tokens: any): void {
    this.loggedUser=username;
    
    this.storeJwtToken(tokens);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    // if (isPlatformBrowser(this.platformId)) {
    //   console.log("token:"+jwt);
    //   localStorage.setItem(this.JWT_TOKEN,jwt);
    // } else {
    //   console.log('This is running on the server, so localStorage is not available.');
    // }
    console.log("token:"+jwt);
    localStorage.setItem(this.JWT_TOKEN,jwt);
  }

  logout(){
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
  }
}
