import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { authGuard } from './auth/auth.guard';
import { guestGuard } from './auth/guest.guard';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent,canActivate: [guestGuard] },
    { path: 'register', component: RegisterComponent,canActivate: [guestGuard] },
    { path: 'expenses', component: ExpensesComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'expenses', pathMatch: 'full' }
];
