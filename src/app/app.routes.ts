import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'expenses', component: ExpensesComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'expenses', pathMatch: 'full' }
];
