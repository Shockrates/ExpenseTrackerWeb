import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { PaginationComponent } from './pagination/pagination.component';

@Component({
  selector: 'app-expenses',
  standalone:true,
  imports: [PaginationComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit{

  ngOnInit(): void {
    this.getAllExpenses()
  }

  private http = inject(HttpClient);
  public data: Array<any> = [];

  private getAllExpenses(){
    this.http.get<any>('/api/expenses').subscribe({
      next: (data: any) => {
        console.log(data);
        this.data = data.data;
      }, error: (err) => console.log(err)
    });
  }
}
