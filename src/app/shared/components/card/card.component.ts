import { Component, Input } from '@angular/core';
import { Product } from 'src/app/features/admin-feature/models/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent {
@Input() product!:Product;

}
