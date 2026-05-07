// ESTE ARCHIVO DEFINE EL MÓDULO PRINCIPAL DE LA APLICACIÓN ANGULAR.
// LOS MÓDULOS AGRUPAN COMPONENTES, SERVICIOS, Y OTRAS DEPENDENCIAS.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent], // Desde aca se declara el componente principal de la aplicación
  imports: [
    BrowserModule, // Necesario para apps web con Angular.
    IonicModule.forRoot(), // Inicializa Ionic con su configuración por defecto
    AppRoutingModule, // Carga las rutas definidas en app-routing.module.ts.
    HttpClientModule // Habilita el cliente HTTP para consumir APIs o archivos locales.
  ],
  // providers: servicios que estarán disponibles globalmente en la app.
  // Aquí le decimos a Angular que use IonicRouteStrategy para el manejo de rutas,
  // en lugar de la estrategia por defecto.
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  // bootstrap: componente raíz que se cargará al iniciar la aplicación.
  bootstrap: [AppComponent],
})
export class AppModule {}
