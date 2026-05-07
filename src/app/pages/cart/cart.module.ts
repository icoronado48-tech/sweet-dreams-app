// MODULO QUE CONFIGURA LA PAGINA DEL CARRITO DE COMPRAS

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CartPage } from './cart.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule, // Directivas como ngIf, ngFor
    FormsModule, // En caso de usar formularios en el carrito
    IonicModule, // Componentes de Ionic (ion-header, ion-list, etc.)
    RouterModule.forChild([
      {
        path: '',  // Ruta base: /cart
        component: CartPage
      }
    ])
  ],
  declarations: [CartPage] // Solo este componente pertenece a este módulo
})
export class CartPageModule {}
