import { Component, computed, inject, input, signal } from '@angular/core';
import { Expense } from '../interface/expense';
import { PaginationComponent } from '../pagination/pagination.component';
import { ExpenseItemComponent } from '../expense-item/expense-item.component';
import { ExpenseService } from '../../service/expense.service';

@Component({
  selector: 'app-expenses-table',
  standalone:true,
  imports: [PaginationComponent, ExpenseItemComponent],
  templateUrl: './expenses-table.component.html',
  styleUrl: './expenses-table.component.css'
})
export class ExpensesTableComponent {

  //Signal Implementation
  expenses = input<Expense[]>([]);
  //State Implementation
  private expenseService = inject(ExpenseService);
  expensesState = this.expenseService.expensesState;

  
  ngOnInit(): void {
    console.log(this.expensesState().appData?.data);
    
  }


  itemsPerPage = signal<number>(5);
  currentPage = signal<number>(1);
  


  paginatedExpenses= computed(() => {
    const start = (this.currentPage() -1) * (this.itemsPerPage())
    const end = start + this.itemsPerPage();
    console.log(this.expenses());
    //console.log(this.expenses().slice(start, end));
    
    return  this.expenses().slice(start, end);
  }) ;    


  onClickPage(page: number) {
    this.currentPage.set(page)
    //this.currentPage=page
  }

}


