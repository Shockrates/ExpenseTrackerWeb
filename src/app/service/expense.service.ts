import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../shared/interface/api-response';
import { PageResponse } from '../shared/interface/page-response';
import { Expense } from '../expenses/interface/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private http = inject(HttpClient);

  //Expense state signal
  private state =  signal<{
    appState:string; 
    appData?: ApiResponse<PageResponse<Expense>>;
    error?: HttpErrorResponse;
  }> ({ appState: 'APP_LOADING' });

  readonly expensesState = this.state.asReadonly();

  loadExpenses(page:number=0, size:number=20) {
    this.state.set({ appState: 'APP_LOADING' });

    this.http.get<ApiResponse<PageResponse<Expense>>>(`/api/expenses?page=${page}&size=${size}`)
      .subscribe({
        next: (res) => this.state.set({ appState: 'APP_LOADED', appData: res }),
        error: (err) => this.state.set({ appState: 'APP_ERROR', error: err })
      });
  }


  constructor() { }

  //FOR OBSERVABLE IMPLEMENTATION
  expenses$ = (page:number=0, size:number=50):Observable<ApiResponse<PageResponse<Expense>>>=>
    this.http.get<ApiResponse<PageResponse<Expense>>>(`/api/expenses?page=${page}&size=${size}`);
}
