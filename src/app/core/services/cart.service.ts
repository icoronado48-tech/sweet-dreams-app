import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Lista donde guardo los productos que el usuario va agregando
  private cartItems: CartItem[] = [];
  
  // Uso un BehaviorSubject para que cualquier parte de la app sepa cuando cambia el carrito (reactividad)
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor() { }

  // Permite que otras páginas se "suscriban" a los cambios del carrito
  getCart() {
    return this.cartSubject.asObservable();
  }

  // Lógica para agregar productos
  addToCart(product: Product) {
    // Reviso si el producto ya estaba en el carrito
    const existingItem = this.cartItems.find(item => item.id === product.id);

    if (existingItem) {
      // Si ya estaba, solo le sumo uno a la cantidad
      existingItem.quantity += 1;
    } else {
      // Si es nuevo, lo agrego a la lista con cantidad 1
      this.cartItems.push({ ...product, quantity: 1 });
    }
    
    // Aviso a todos que el carrito cambió
    this.cartSubject.next([...this.cartItems]);
  }

  // Lógica para sacar un producto del carrito
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.cartSubject.next([...this.cartItems]);
  }

  // Calcula el precio total sumando cantidad por precio de cada item
  getTotal() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
