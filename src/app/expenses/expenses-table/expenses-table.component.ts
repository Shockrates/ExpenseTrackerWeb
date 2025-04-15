import { Component, input } from '@angular/core';
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

  onClickPage($event: number) {
    throw new Error('Method not implemented.');
  }
}
