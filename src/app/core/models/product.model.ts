/**
 * Interfaz que define la estructura de un producto de la tienda.
 */
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
}

/**
 * Interfaz que extiende el producto para incluir la cantidad en el carrito.
 */
export interface CartItem extends Product {
  quantity: number;
}
