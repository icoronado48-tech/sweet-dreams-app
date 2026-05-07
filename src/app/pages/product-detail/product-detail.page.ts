// LOGICA DE LA PAGINA DETALLE DEL PRODUCTOLógica de la página de detalle de producto.
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: false
})
export class ProductDetailPage implements OnInit {
  product?: Product;  // Propiedad que guardará el producto actual (undefined hasta que se cargue)

  // Inyectamos servicios necesarios
  constructor(
    private route: ActivatedRoute,       // Lee el ID en la URL
    private productService: ProductService, // Buscar info del producto
    private cartService: CartService        // Agregar al carrito
  ) { }

  ngOnInit() {
    
    // Saco el ID de la ruta (URL)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Si hay un ID, le solicita al servicio los datos del producto
      this.productService.getProductById(+id).subscribe(p => {
        this.product = p;
      });
    }
  }

  // Función para agregar este producto específico al carrito
  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      alert('¡Agregado al carrito!');
    }
  }
}
