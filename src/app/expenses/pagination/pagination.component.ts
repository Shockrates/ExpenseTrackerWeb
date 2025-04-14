import { NgClass } from '@angular/common';
import { Component, effect, input, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone:true,
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {


totalItems = input<any>();
currentPage = input<any>();
itemsPerPage = input<any>();
totalPages = 0;
pages:number[] = [];
onClick = output<number>();

constructor(){
  effect(() => {
    if (this.totalItems()) {
      this.totalPages =  Math.ceil(this.totalItems()/ this.itemsPerPage());
      this.pages = Array.from({length: this.totalPages}, (_,i) => i+1);
    } else {
      this.totalPages = 0;
    }
  });
}

pageClicked(page:number) {
  this.onClick.emit(page);
}



}
