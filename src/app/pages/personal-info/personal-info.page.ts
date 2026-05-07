// Lógica de la página Sobre la Chef.
import { Component, OnInit } from '@angular/core';
// @Component le indica a Angular que la siguiente clase es un componente.
// Define el selector (nombre con el que se usará en HTML), la plantilla y estilo
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
  standalone: false
})
export class PersonalInfoPage implements OnInit {
   // Datos personales que se muestran en la plantilla
  nombre: string = 'Iliana Coronado';
  carrera: string = 'Chef Pastelera & Repostera';
  descripcion: string = 'Especialista en repostería creativa y diseño de postres de autor. Con más de 5 años endulzando los momentos más especiales de mis clientes.';

  // Conocimientos específicos para la temática
  habilidades: string[] = [
    'Decoración con Fondant',
    'Técnicas de Repostería Francesa',
    'Diseño de Pasteles de Boda',
    'Manejo de Chocolatería Fina'
  ];

  constructor() { }
   // ngOnInit: ciclo de vida que se ejecuta al iniciar la página

  ngOnInit() {
    console.log('Perfil de la Chef Iliana cargado');
  }
}
