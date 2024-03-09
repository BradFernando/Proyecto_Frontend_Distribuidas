import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoVerificacionService {

  private baseUrlProcesoVerificacion = 'http://localhost:8080/procesoVerificacion';

  constructor(private http: HttpClient) { }

  getAllProcesoVerificacion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlProcesoVerificacion}`);
  }

  saveProcesoVerificacion(dataProcesoVerificacion: any): Observable<any> {
    return this.http.post(`${this.baseUrlProcesoVerificacion}`, dataProcesoVerificacion);
  }

  getProcesoVerificacionById(codProcesoVerificacion: string): Observable<any> {
    return this.http.get(`${this.baseUrlProcesoVerificacion}/${codProcesoVerificacion}`);
  }

  updateProcesoVerificacion(dataProcesoVerificacion: any): Observable<any> {
    return this.http.put(`${this.baseUrlProcesoVerificacion}`, dataProcesoVerificacion);
  }

  deleteProcesoVerificacion(codProcesoVerificacion: string): Observable<any> {
    return this.http.delete(`${this.baseUrlProcesoVerificacion}/${codProcesoVerificacion}`);
  }

  getCodProcesosPasteurizacion_cod(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrlProcesoVerificacion}/ProcesosPasteurizacion_cod`);
  }

  getCodLoteProductos_cod(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrlProcesoVerificacion}/LoteProductos_cod`);
  }
  
}
