import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importar BrowserAnimationsModule
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LecheroIndependienteComponent } from './lechero-independiente/lechero-independiente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import { MatSliderModule } from '@angular/material/slider';

import { HttpClientModule } from '@angular/common/http';
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatButtonModule} from '@angular/material/button';
import { HaciendaLecheraComponent } from './hacienda-lechera/hacienda-lechera.component';
import { HomeComponent } from './home/home.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTabsModule} from "@angular/material/tabs";
import {MatMenuModule} from "@angular/material/menu";
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//se agrega para el dasboard 
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PopupRegistroComponent } from './lechero-independiente/popup-registro/popup-registro.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { PopupRegistroHlComponent } from './hacienda-lechera/popup-registro-hl/popup-registro-hl.component';
import { RecepcionLecheComponent } from './recepcion-leche/recepcion-leche.component';
import { PopupRegistroRlComponent } from './recepcion-leche/popup-registro-rl/popup-registro-rl.component';
import { ClienteComponent } from './cliente/cliente.component';
import { PopupRegistroClienteComponent } from './cliente/popup-registro-cliente/popup-registro-cliente.component';
import { PopupRegistroRlindepComponent } from './recepcion-leche/popup-registro-rlindep/popup-registro-rlindep.component';
import { ProcesoPasteurizacionComponent } from './proceso-pasteurizacion/proceso-pasteurizacion.component';
import { PopupRegistroPp4Component } from './proceso-pasteurizacion/popup-registro-pp4/popup-registro-pp4.component';

//Modulo de busqueda en el select
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ProcesoVerificacionComponent } from './proceso-verificacion/proceso-verificacion.component';
import { PopupRegistroPv5Component } from './proceso-verificacion/popup-registro-pv5/popup-registro-pv5.component';
import { LotesProductosComponent } from './lotes-productos/lotes-productos.component';
import { PopupRegistroLppp5Component } from './lotes-productos/popup-registro-lppp5/popup-registro-lppp5.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { DashCardHomeComponent } from './dash-card-home/dash-card-home.component';
import { PopupCreatePedidoComponent } from './pedidos/popup-create-pedido/popup-create-pedido.component';
import { PopupAbastecerPedidoComponent } from './pedidos/popup-abastecer-pedido/popup-abastecer-pedido.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PopupVerdetallesComponent } from './pedidos/popup-verdetalles/popup-verdetalles.component';
//import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LecheroIndependienteComponent,
    HaciendaLecheraComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    PopupRegistroComponent,
    PopupRegistroHlComponent,
    RecepcionLecheComponent,
    PopupRegistroRlComponent,
    ClienteComponent,
    PopupRegistroClienteComponent,
    PopupRegistroRlindepComponent,
    ProcesoPasteurizacionComponent,
    PopupRegistroPp4Component,
    ProcesoVerificacionComponent,
    PopupRegistroPv5Component,
    LotesProductosComponent,
    PopupRegistroLppp5Component,
    PedidosComponent,
    DashCardHomeComponent,
    PopupCreatePedidoComponent,
    PopupAbastecerPedidoComponent,
    PopupVerdetallesComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // Usar BrowserAnimationsModule
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    HttpClientModule,
    MatListModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatRippleModule,
    MatTooltipModule,
    MatTabsModule,
    MatMenuModule,
    MatBadgeModule,
    MatPaginatorModule, //Paginator de las tables 
    MatDialogModule,
    MatSortModule, 
    NgxMatSelectSearchModule,
    MatSliderModule,
    NgxChartsModule,
   //NgChartsModule,  // Agrega el módulo ChartsModule aquí
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
