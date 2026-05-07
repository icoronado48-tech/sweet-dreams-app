import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root' // Esto hace que el servicio sea accesible desde cualquier parte de la app
})
export class ProductService {
  // Ruta donde tengo guardado el archivo con los datos productos
  private productsUrl = 'assets/data/products.json';

  constructor(private http: HttpClient) {}

  // Esta función pide la lista de productos al archivo JSON
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  // Esta función busca un producto por su ID para mostrarlo en la página de detalles
  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(
      // Uso .find para encontrar el producto que coincida con el ID que recibo
      map(products => products.find(p => p.id === id))
    );
  }
}
