import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

//rutas del dasboard
import {LecheroIndependienteComponent} from './lechero-independiente/lechero-independiente.component';
import {HaciendaLecheraComponent} from './hacienda-lechera/hacienda-lechera.component';
import {ClienteComponent} from './cliente/cliente.component';
import {RecepcionLecheComponent} from './recepcion-leche/recepcion-leche.component';
import {ProcesoPasteurizacionComponent} from './proceso-pasteurizacion/proceso-pasteurizacion.component';
import {ProcesoVerificacionComponent} from './proceso-verificacion/proceso-verificacion.component';
import {LotesProductosComponent} from './lotes-productos/lotes-productos.component';
import {PedidosComponent} from './pedidos/pedidos.component';
import {DashCardHomeComponent} from './dash-card-home/dash-card-home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from "./login/login.component";

//import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
	{path: 'login', component: LoginComponent},
	{
		path: 'dashboard-Principal', component: DashboardComponent, children: [
			{path: '', redirectTo: 'dashboard-card', pathMatch: 'full'}, // Redirección a dashboard-card
			{path: 'dashboard-card', component: DashCardHomeComponent},
			{path: 'clientes', component: ClienteComponent},
			{path: 'hacienda-lechera', component: HaciendaLecheraComponent},
			{path: 'lechero-independiente', component: LecheroIndependienteComponent},
			{path: 'recepcion-leche', component: RecepcionLecheComponent},
			{path: 'proceso-pasteurizacion', component: ProcesoPasteurizacionComponent},
			{path: 'proceso-verificacion', component: ProcesoVerificacionComponent},
			{path: 'lotes-productos', component: LotesProductosComponent},
			{path: 'pedidos', component: PedidosComponent},
		]
	},
];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}

