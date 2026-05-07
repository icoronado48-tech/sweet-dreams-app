// LOGICA DE LA PAGINA DE CONTACTO.
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: false
})
export class ContactPage implements OnInit {
  // Objeto que guarda los datos del formulario
  contacto = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  constructor() { }
 // ngOnInit: se ejecuta al iniciar la página
  ngOnInit() {
    console.log('Contacto iniciado');
  }
// Función que se llamaría al enviar el formulario (por ahora no está enlazada al HTML)
  enviarFormulario() {
     // Validación básica: si todos los campos tienen contenido
    if (this.contacto.nombre && this.contacto.email && this.contacto.mensaje) {
      alert('¡Mensaje enviado!');
        // Limpiar formulario después de enviar
      this.contacto = { nombre: '', email: '', mensaje: '' };
    } else {
      alert('Por Favor Complete los campos,');
    }
  }
}
