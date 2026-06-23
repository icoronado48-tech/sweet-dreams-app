// MODULO PARA LA CONFIGURACION DE LA PAGINA DE CONTACTO  Y PEDIDOS ESPECIALES.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactPage } from './contact.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ContactPage }]) // Ruta base: /contact
  ],
  declarations: [ContactPage] // Solo este componente en el módulo
})
export class ContactPageModule {}
