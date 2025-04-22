import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Register } from '../interface/register';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isRegisterFailed = false;
  errorMessage ='';

  private authService = inject(AuthService);
  private router = inject(Router);

  protected registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  onSubmit(): void {
    const loginData = this.mapFormToRegister();

    console.log(loginData);
    
  }

  private mapFormToRegister(): Register {
      const { name, email, password } = this.registerForm.value;
      return {
        userName: name ?? '',
        userEmail: email ?? '',
        userPassword: password ?? ''
      };
    }

}
