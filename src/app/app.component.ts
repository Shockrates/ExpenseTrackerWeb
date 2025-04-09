import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, ExpensesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ExpenseTrackerWeb';

  authService = inject(AuthService);

  constructor(){
    this.authService.login({
        userEmail:"Tester@example.com",
        userPassword:"test1234"
    }).subscribe((resp)=> console.log(resp))
    
  }
}
