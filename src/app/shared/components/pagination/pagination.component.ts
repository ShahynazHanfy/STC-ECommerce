import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() data!: any[]; // Data list is passed as an input

  @Output() pageChange = new EventEmitter<number>();

  constructor() {}

  // get totalPages(): number {
  //   return Math.ceil(this.data.length / this.itemsPerPage);
  // }
  // totalPagesArray(): number[] {
  //   return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  // }
}
