import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Desde aca se definen todas las páginas o vistas que tiene la app 
const routes: Routes = [
  {
    path: 'home', // Ruta de Inicio
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'personal-info', // Ruta para la informacion personal
    loadChildren: () => import('./pages/personal-info/personal-info.module').then( m => m.PersonalInfoPageModule)
  },
  {
    path: 'contact', // Ruta para el contacto
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'product-detail/:id', // Ruta con parámetro para ver el detalle de un producto específico
    loadChildren: () => import('./pages/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'cart', // Ruta para el carrito de compras
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: '', // Si la URL está vacía, redirige al Inicio
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
