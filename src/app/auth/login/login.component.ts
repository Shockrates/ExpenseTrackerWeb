import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CommonModule, NgClass } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../interface/login';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login2.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  private authService = inject(AuthService);
  private router = inject(Router);

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })


  constructor(){}

  ngOnInit(): void {
    // if (this.isLoggedIn) {
    //   this.router.navigate(['/expenses']); 
    // }
  }

  
  onSubmit(): void {
    const loginData = this.mapFormToLogin();

    //this.authService.login({userEmail:username, userPassword:password}).subscribe({
    this.authService.login(loginData).subscribe({
      next: data => {
        //this.storageService.saveUser(data);
        //console.log(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
       // this.roles = this.storageService.getUser().roles;
        this.router.navigate(['/expenses']); 
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

 
  private mapFormToLogin(): Login {
    const { email, password } = this.loginForm.value;
    return {
      userEmail: email ?? '',
      userPassword: password ?? ''
    };
  }

 

}
