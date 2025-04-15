import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { PaginationComponent } from './pagination/pagination.component';
import { ExpensesTableComponent } from './expenses-table/expenses-table.component';
import { Expense } from './interface/expense';

@Component({
  selector: 'app-expenses',
  standalone:true,
  imports: [ExpensesTableComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit{
onClickPage($event: number) {
throw new Error('Method not implemented.');
}

  private http = inject(HttpClient);
  public data: Array<Expense> = [];

  ngOnInit(): void {
    this.getAllExpenses()
  }



  private getAllExpenses(){
    this.http.get<any>('/api/expenses').subscribe({
      next: (data: any) => {
        console.log(data);
        this.data = data.data;
      }, error: (err) => console.log(err)
    });
  }
}
