// ============================================================
// LÓGICA DE LA PÁGINA DE PEDIDOS ESPECIALES — SWEET DREAMS
// Se aplica mejoras de Formularios Reactivos (ReactiveFormsModule).
// para mayor interactividad de la pagina.
// ============================================================

import { Component, OnInit } from '@angular/core';

// FormBuilder: Este servicio simplifica la creación del FormGroup
// FormGroup: Desde este contenedor agrupamos todos los controles del formulario
// Validators: Funciones definidas de validación (required, minLength, etc.)
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// ToastController: servicio de Ionic para mostrar notificaciones emergentes
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: false
})
export class ContactPage implements OnInit {

  // PROPIEDADES DEL FORMULARIO  

  // contactForm: FormGroup que centraliza toda la lógica del formulario.
  // El signo '!' indica a TypeScript que se inicializará en ngOnInit (no en el constructor).
  contactForm!: FormGroup;

  // submitted: Se activa cuando el usuario presiona Solicitar Cotización.
  // Muestra todos los mensajes de error aunque el usuario no haya tocado los campos.
  submitted = false;

  // today: fecha actual en formato ISO. Sirve como límite mínimo en el selector de fecha
  // esto es con el fin de evitar para que el usuario elija fechas anteriores a la fecha actual
  today: string = new Date().toISOString();

  // PROPIEDADES DEL MENÚ DE POSTRES 

  // Esta seccion ofrece diversas opciones de postres disponibles para seleccionar.
  menuPostres: string[] = [
    'Tortas Temáticas',
    'Tortas Modernas',
    'Mesa de Dulces',
    'Cupcakes',
    'Galletas',
    'Pastelería Fina'
  ];

  // Usamos mapa emojis decorativos segun el tipo de postre, para una mejor experiencia
  // Se accede desde el HTML con getPostreIcono(postre)
  postreIconos: { [key: string]: string } = {
    'Tortas Temáticas': '🎭',
    'Tortas Modernas': '🎨',
    'Mesa de Dulces': '🍬',
    'Cupcakes': '🧁',
    'Galletas': '🍪',
    'Pastelería Fina': '✨'
  };

  // postresSeleccionados: array con los postres que el usuario marcó.
  // No forma parte del FormGroup, es  un estado local debido a que es selección múltiple.
  postresSeleccionados: string[] = [];

  // PROPIEDADES DE LA IMAGEN DE REFERENCIA 

  // selectedFile: guarda el objeto File del archivo que el usuario seleccionó
  selectedFile: File | null = null;

  // filePreview: guarda la URL base64 generada por FileReader para mostrar la vista previa
  filePreview: string | ArrayBuffer | null = null;

   constructor(
    private fb: FormBuilder,         // Aqui se inyecta FormBuilder
    private toastCtrl: ToastController // Aca se inyecta ToastController
  ) {}

  // ngOnInit: se ejecuta justo cuando el componente esta listo. 
  // Es el lugar correcto para crear el formulario porque en el constructor Angular 
  // aún no ha terminado de configurar todo.
  ngOnInit() {
    this.contactForm = this.fb.group({

      // Nombre: Obligatorio, mínimo 3 caracteres y texto libre.
      nombre: ['', [Validators.required, Validators.minLength(3)]],

      // Tipo de evento: Selector obligatorio (se debe elegir una opción).
      tipoEvento: ['', Validators.required],

      // Fecha del evento: Obligatorio, se asigna mediante el popover de ion-datetime.
      fechaEvento: ['', Validators.required],

      // numeroPersonas: número entero, obligatorio, mínimo 1
      // Valor inicial: 1 (valor por defecto sugerido)
      numeroPersonas: [1, [Validators.required, Validators.min(1)]],

      // Detalles: texto entre 10 y 500 caracteres
      detalles: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]]
    });
  }

  // GETTER DE CONTROLES 
  // Permite acceder a los campos en el HTML de forma más corta, 
  // omitiendo el nombre del formulario.
  get controles() {
    return this.contactForm.controls;
  }

  // MÉTODOS DE CONTACTO DIRECTO 

  abrirInstagram() {
    // _blank: abre en una nueva pestaña del navegador
    window.open('https://instagram.com/SweetDreams', '_blank');
  }

  abrirWhatsApp() {
    // wa.me genera un enlace directo a WhatsApp Web o la app instalada
    window.open('https://wa.me/584241234567', '_blank');
  }

  // window.open abre el correo sin bloquear la navegación actual de la app.
   abrirCorreo() {
    window.open('mailto:contacto@gmail.com');
  }

  abrirMapa() {
    // Abre Google Maps centrado en Caracas, Venezuela
    window.open('https://maps.google.com/?q=Caracas+Venezuela', '_blank');
  }

  // GESTIÓN DE FECHA CON ION-DATETIME 

  // onDateChange: Captura la fecha seleccionada por el usuario en el ion-datetime.
  // patchValue actualiza solo la fecha sin modificar ni borrar los otros campos.
  onDateChange(event: any, popover: any) {
    this.contactForm.patchValue({ fechaEvento: event.detail.value });
    // dismiss: cierra el popover automáticamente después de elegir la fecha
    popover.dismiss();
  }

  // formatearFecha: convierte la cadena ISO (2025-12-25T00:00:00) a texto legible.
  // Se usa en el campo de solo lectura que muestra la fecha seleccionada.
  formatearFecha(isoString: string): string {
    if (!isoString) return '';
    // Usa la configuración regional de Venezuela para dar formato nativo a la fecha.
    return new Date(isoString).toLocaleDateString('es-VE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  // CONTADOR DE PERSONAS 

  incrementarPersonas() {
    const val = this.contactForm.get('numeroPersonas')?.value || 0;
    // patchValue actualiza el control sin necesidad de reasignar todo el formulario
    this.contactForm.patchValue({ numeroPersonas: val + 1 });
  }

  decrementarPersonas() {
    const val = this.contactForm.get('numeroPersonas')?.value || 0;
    // Límite inferior: 1 persona mínimo
    if (val > 1) {
      this.contactForm.patchValue({ numeroPersonas: val - 1 });
    }
  }

  // ── SELECCIÓN MÚLTIPLE DE POSTRES ────────────────────────────────────

  // togglePostre: agrega o quita un postre de la lista de seleccionados.
  // Si ya existe lo elimina; si no, lo agrega.
  togglePostre(postre: string) {
    const index = this.postresSeleccionados.indexOf(postre);
    if (index > -1) {
      this.postresSeleccionados.splice(index, 1); // Quitar
    } else {
      this.postresSeleccionados.push(postre); // Agregar
    }
  }

  // isPostreSelected: retorna true si el postre ya está en la selección.
  // Usado en el HTML para alternar el color y el ícono del chip.
  isPostreSelected(postre: string): boolean {
    return this.postresSeleccionados.includes(postre);
  }

  // getPostreIcono: retorna el emoji del mapa postreIconos.
  // Devuelve un valor por defecto, si no se encuentra el resultado.
  getPostreIcono(postre: string): string {
    return this.postreIconos[postre] || '🍰';
  }

  // ── GESTIÓN DE IMAGEN DE REFERENCIA ──────────────────────────────────

  // onFileSelected: se ejecuta cuando el usuario elige un archivo en el input[type=file].
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // FileReader lee el archivo localmente (sin subirlo a ningún servidor aún)
      // y genera una URL base64 que puede usarse directamente en un <img src="...">
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // removerImagen: limpia la imagen seleccionada.
  // stopPropagation evita que el click en "Quitar" propague al contenedor
  // .upload-zone y abra nuevamente el selector de archivos.
  removerImagen(event: Event) {
    event.stopPropagation();
    this.selectedFile = null;
    this.filePreview = null;
  }

  // ENVÍO DEL FORMULARIO 

  async enviarFormulario() {
    // Activar la visualización de errores en todos los campos simultáneamente
    this.submitted = true;

    // contactForm.valid es true solo cuando todos los controles pasan sus validadores
    if (this.contactForm.valid) {

      // Construir el objeto completo del pedido, incluyendo datos que no están
      // en el FormGroup (selección de postres e imagen de referencia)
      const pedido = {
        ...this.contactForm.value,           // Datos del formulario (nombre, tipoEvento, etc.)
        postres: this.postresSeleccionados,  // Lista de postres elegidos
        imagen: this.selectedFile?.name || null  // Nombre del archivo (si se eligió)
      };

      // En producción aquí se llamaría a un servicio HTTP para enviar el pedido al backend
      console.log('Pedido a enviar:', pedido);

      // Notificación de éxito
      await this.mostrarToast('¡Solicitud enviada con éxito! 🎉 Te contactaremos pronto.', 'success');

      // Limpiar el formulario. Se pasa { numeroPersonas: 1 } para que ese campo
      // no vuelva a null sino que retome su valor por defecto.
      this.contactForm.reset({ numeroPersonas: 15 });
      this.postresSeleccionados = [];
      this.selectedFile = null;
      this.filePreview = null;
      this.submitted = false;

    } else {
      // Si el formulario no es válido, se muestra un toast de advertencia
      await this.mostrarToast('Por favor completa los campos requeridos.', 'warning');
    }
  }

  // mostrarToast: método privado reutilizable para todas las notificaciones.
  // El parámetro 'color' acepta los colores de Ionic: 'success', 'warning', 'danger', etc.
  private async mostrarToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
      color
    });
    await toast.present();
  }
}
