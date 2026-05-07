// Módulo que configura la página de detalle de un producto.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProductDetailPage } from './product-detail.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule, // Directivas comunes (ngIf, ngFor)
    FormsModule, // En caso de necesitar formularios
    IonicModule, // Componentes de Ionic (ion-header, ion-content, etc.)
    RouterModule.forChild([
      {
        path: '',  // Ruta base: /product-detail/:id
        component: ProductDetailPage
      }
    ])
  ],
  declarations: [ProductDetailPage] // Solo este componente
})
export class ProductDetailPageModule {}
