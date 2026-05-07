// LOGICA DE LA PAGINA HOME
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { Observable } from 'rxjs';

// @Component le indica a Angular que la siguiente clase es un componente.
// Define el selector (nombre con el que se usará en HTML), la plantilla (archivo HTML) y los estilos (archivo SCSS).
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  // Variable para guardar la lista de productos que vienen del servicio
  products$!: Observable<Product[]>;
// Inyectamos los servicios en el constructor.
  constructor(
    private productService: ProductService,  
    private cartService: CartService        
  ) {}

  ngOnInit() {
   // ngOnInit: se ejecuta cuando la página se inicializa
    this.products$ = this.productService.getProducts();
  }

 // Función que se ejecuta cuando el usuario hace clic en "Agregar al carrito"
  // desde el componente hijo ProductCardComponent.
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log('Producto agregado al carrito:', product.name);
  }
}
