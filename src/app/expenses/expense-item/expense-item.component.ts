import { Component, input } from '@angular/core';
import { Expense } from '../interface/expense';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-item',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './expense-item.component.html',
  styleUrl: './expense-item.component.css'
})
export class ExpenseItemComponent {

  expense = input<Expense>();
  idx = input<number>(0);
  

}
