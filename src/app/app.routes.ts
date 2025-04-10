import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ExpensesComponent } from './expenses/expenses.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'expenses', component: ExpensesComponent },
    { path: '', redirectTo: 'expenses', pathMatch: 'full' }
];
