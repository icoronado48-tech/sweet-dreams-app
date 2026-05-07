// MODULO QUE ORGANIZA LA INFORMACION REFERENTE AL CHEF.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PersonalInfoPage } from './personal-info.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '', // Ruta base: /personal-info
        component: PersonalInfoPage
      }
    ])
  ],
  declarations: [PersonalInfoPage] // Solo este componente
})
export class PersonalInfoPageModule {}
