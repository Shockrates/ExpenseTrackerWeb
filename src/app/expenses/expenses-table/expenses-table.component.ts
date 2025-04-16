import { Component, computed, input } from '@angular/core';
import { Expense } from '../interface/expense';
import { PaginationComponent } from '../pagination/pagination.component';
import { ExpenseItemComponent } from '../expense-item/expense-item.component';

@Component({
  selector: 'app-expenses-table',
  standalone:true,
  imports: [PaginationComponent, ExpenseItemComponent],
  templateUrl: './expenses-table.component.html',
  styleUrl: './expenses-table.component.css'
})
export class ExpensesTableComponent {

  expenses = input<Expense[]>([]);
  itemsPerPage:number = 50;
  currentPage:number = 1;

  get paginatedExpenses(){
    const start = (this.currentPage -1) * (this.itemsPerPage)
    const end = start + this.itemsPerPage;

    return computed(() => this.expenses().slice(start, end)) ;    
  }

  onClickPage(page: number) {
    this.currentPage=page;
  }
}
