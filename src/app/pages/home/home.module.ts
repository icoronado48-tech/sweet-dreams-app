// MÓDULO QUE ORGANIZA TODO LO NECESARIO PARA EL HOME (PÁGINA DE INICIO).
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card.component';

@NgModule({
  imports: [
    CommonModule,  // Necesario para directivas básicas
    FormsModule, // Para trabajar con formularios 
    IonicModule, // Componentes de Ionic (ion-header, ion-content, etc.)
    RouterModule.forChild([ // Rutas específicas de este módulo (carga diferida)
      {
        path: '', // Ruta base del home (ej: /home)
        component: HomePage // HomePage
      }
    ])
  ],
  declarations: [HomePage, ProductCardComponent] // Los componentes de este módulo
})
export class HomePageModule {}
