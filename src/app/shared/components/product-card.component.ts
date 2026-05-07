import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: false
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  constructor() {}

  onAddToCart(event: Event) {
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }
}
