import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ExpensesTableComponent } from './expenses-table/expenses-table.component';
import { Expense } from './interface/expense';
import { ApiResponse } from '../shared/interface/api-response';
import { PageResponse } from '../shared/interface/page-response';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { ExpenseService } from '../service/expense.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expenses',
  standalone:true,
  imports: [ExpensesTableComponent, CommonModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit{
onClickPage($event: number) {
throw new Error('Method not implemented.');
}

  private http = inject(HttpClient);
  public data: Array<Expense> = [];

  private expenseService = inject(ExpenseService);

  // OBSERVABLE IMPLEMENTATION
  //expensesState$: Observable<{appState:string, appData?: ApiResponse<PageResponse<Expense>>, error?: HttpErrorResponse}> | undefined =undefined;

  //STATE (w/ signal)
  expensesState = this.expenseService.expensesState;


  ngOnInit(): void {
    //this.getAllExpenses()

    // OBSERVABLE IMPLEMENTATION
    // this.expensesState$ = this.expenseService.expenses$().pipe(
    //   map((resp:ApiResponse<PageResponse<Expense>>) => {
    //     console.log(resp);
    //     return({appState:'APP_LOADED', appData: resp})
    //   }),
    //   startWith({appState: 'APP_LOADING'}),
    //   catchError((error:HttpErrorResponse) => of({appState: 'APP_ERROR',error}))
    // )


    this.expenseService.loadExpenses();
    
  }



  private getAllExpenses(){
    this.http.get<ApiResponse<PageResponse<Expense>>>('/api/expenses').subscribe({
      next: (resp: ApiResponse<PageResponse<Expense>>) => {
        console.log(resp);
        this.data = resp.data.content;
      }, error: (err) => console.log(err)
    });
  }
}
