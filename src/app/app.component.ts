// ESTE ES EL ARCHIVO DE LOGICA DEL COMPONENTE PRINCIPAL DE LA APLICACION.
// Importamos Component (decorador necesario para definir un componente Angular)
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

// El decorador @Component le dice a Angular que esta clase es un componente.
// Configuramos el selector (etiqueta HTML), la plantilla y los estilos.
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  // Inyectamos el controlador de menú para poder manejarlo desde el código
  constructor(private menu: MenuController) {}

  // Función para cerrar el menú cuando el usuario hace clic en una opción
  closeMenu() {
    this.menu.close(); 
  }
}
