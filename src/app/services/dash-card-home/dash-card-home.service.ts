import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashCardHomeService {

  //******************* URL DE MONGODB ****************** */
  private baseUrlCliente = 'http://26.254.123.130:3500/cliente';
  private baseUrlPedido = 'http://26.254.123.130:3500/pedido';

   //******************* URL DE MONGODB ****************** */
   private baseUrlHaciendaLechera = 'http://localhost:8080/haciendaLechera';
   private baseUrl = 'http://localhost:8080/lecheroIndependiente';
   private baseUrlLoteProductos = 'http://localhost:8080/loteProductos';
   private baseUrlProcesoPasteurizacion = 'http://localhost:8080/procesoPasteurizacion';
   private baseUrlProcesoVerificacion = 'http://localhost:8080/procesoVerificacion';
   private baseUrlRecepcionLeche = 'http://localhost:8080/recepcionLeche';



  constructor(private http: HttpClient) { }

  //***************************************************** */
  //*                     METODOS DE MONGODB              */
  //***************************************************** */

  //Metodo para contar los documentos que hay dentro de Clientes 
  getClienteCount(): Observable<{ count: number }> { 
    return this.http.get<{ count: number }>(`${this.baseUrlCliente}/count`);
}

//Metodo para contar los documentos que hay dentro de Pedidos
getPedidoCount(): Observable<{ count: number }> { 
  return this.http.get<{ count: number }>(`${this.baseUrlPedido}/count`);
}

  //***************************************************** */
  //*              METODOS DE Java Spring Boot            */
  //***************************************************** */

  //Metodo para contar los documentos que hay dentro de HaciendaLechera
//Metodo para contar los documentos que hay dentro de HaciendaLechera
getHaciendaLecheraCount(): Observable<number> {
  return this.http.get<number>(`${this.baseUrlHaciendaLechera}/count`);
}

//Metodo para contar los documentos que hay dentro de LecheroIndependiente
getLecheroIndependienteCount(): Observable<number> { 
  return this.http.get<number>(`${this.baseUrl}/count`);
}

//Metodo para contar los documentos que hay dentro de LoteProductos
getLoteProductosCount(): Observable<number> { 
  return this.http.get<number>(`${this.baseUrlLoteProductos}/count`);
}

//Metodo para contar los documentos que hay dentro de ProcesoPasteurizacion
getProcesoPasteurizacionCount(): Observable<number> { 
  return this.http.get<number>(`${this.baseUrlProcesoPasteurizacion}/count`);
}

//Metodo para contar los documentos que hay dentro de ProcesoVerificacion
getProcesoVerificacionCount(): Observable<number> { 
  return this.http.get<number>(`${this.baseUrlProcesoVerificacion}/count`);
}

//Metodo para contar los documentos que hay dentro de RecepcionLeche
getRecepcionLecheCount(): Observable<number> { 
  return this.http.get<number>(`${this.baseUrlRecepcionLeche}/count`);
}


// Método para sumar la cantidad de leche recibida entre un rango de fechas y agrupar por fecha
sumRecepcionLecheByDateRangeGroupByFecha(fechaInicio: string, fechaFin: string): Observable<Object[]> {
  return this.http.get<Object[]>(`${this.baseUrlRecepcionLeche}/sumLecheByDateRangeGroupByFecha/${fechaInicio}/${fechaFin}`);
}

}
