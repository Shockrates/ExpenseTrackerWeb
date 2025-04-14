import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { AuthService } from './service/auth.service';
import { ModalComponent } from './shared/components/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ExpenseTrackerWeb';

  authService = inject(AuthService);
  user: any;

  constructor(){
    this.user = this.authService.getDecodedToken();
    console.log(this.user);
    
    this.authService.login({
        userEmail:"Tester@example.com",
        userPassword:"test1234"
    }).subscribe((resp)=> {
      //console.log(resp);
      this.authService.getCurrentAuthUser().subscribe((r) =>{
        //console.log(r);
      })
    })
    
  }

  onLogout(): void {
    this.authService.logout();
  }
}
