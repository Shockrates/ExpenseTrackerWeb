import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Login } from '../auth/interface/login';
import { jwtDecode } from "jwt-decode";
import { LoginResponse } from '../auth/interface/login-response';
import { ApiResponse } from '../shared/interface/api-response';
import { Register } from '../auth/interface/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly LOGIN_URL = 'api/auth/login';
  private readonly REGISTER_URL = 'api/auth/register';
  private readonly REFRESH_URL = '';
  private loggedUser?: string;
  private loggedId?: number;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private http = inject(HttpClient);
  

  constructor() { }

  login(user:Login):Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(this.LOGIN_URL ,user)
      .pipe(
        tap((response:ApiResponse<LoginResponse>)=> {
          if (response && response.data) {
            this.doLoginUser(response.data.userEmail, response.data.token, response.data.id)
          }
          
        })
      )
  }

  register(user:Register):any{
    return this.http.post(this.REGISTER_URL ,user)
  }

  private doLoginUser(username: string, token: any, id:number): void {
    this.loggedUser=username;
    this.loggedId=id;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string): void {
    //console.log("token:"+jwt);
    localStorage.setItem(this.JWT_TOKEN,jwt);
  }

  logout(): void{
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

  isTokenExpired(): boolean{
    const decodedToken = this.getDecodedToken();
    if (decodedToken == null || !decodedToken.exp) {
      return true;
    }
    const expirationDate = decodedToken.exp * 1000
    const now = new Date().getTime();

    return expirationDate < now
  }

  getCurrentAuthUser(): Observable<any>{
    // console.log(this.loggedId);
    return this.http.get('api/users/'+ this.loggedId)
  }

  refreshToken(){
    return this.http
              .post<any>(this.REFRESH_URL,{})
              .pipe(
                tap((tokens:any) => 
                  this.storeJwtToken(tokens.access_tokens)
              ));
  }


}
