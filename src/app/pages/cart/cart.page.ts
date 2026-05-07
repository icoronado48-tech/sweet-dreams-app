import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false
})
export class CartPage implements OnInit {
  // Lista observable para que la pantalla se actualice sola si cambia el carrito
  cartItems$!: Observable<CartItem[]>;
  total: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    // Me suscribo a la lista de items del carrito
    this.cartItems$ = this.cartService.getCart();
    
    // Cada vez que cambian los items, actualizo el total de la compra
    this.cartItems$.subscribe(() => {
      this.total = this.cartService.getTotal();
    });
  }

  // Permite borrar un item de la lista
  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  // Simula el proceso de finalizar la compra
  checkout() {
    alert('¡Gracias por tu compra! Tu pedido está en camino.');
  }
}
