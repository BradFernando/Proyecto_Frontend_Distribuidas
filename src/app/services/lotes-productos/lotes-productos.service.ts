import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LotesProductosService {

  private baseUrlLoteProductos = 'http://26.47.197.63:8080/loteProductos';

  constructor(private http: HttpClient) { }

  getAllLoteProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlLoteProductos}`);
  }

  getListCodLoteNombreLote(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlLoteProductos}/listCodLoteNombreLote`);
  }
  
  getCantidadPaquetesDisponiblesByCodLote(codLote:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlLoteProductos}/getCantidadPaquetesDisponiblesByCodLote/${codLote}`);
  }

  saveLoteProductos(dataLoteProductos: any): Observable<any> {
    return this.http.post(`${this.baseUrlLoteProductos}`, dataLoteProductos);
  }

  getLoteProductosById(codLote: string): Observable<any> {
    return this.http.get(`${this.baseUrlLoteProductos}/${codLote}`);
  }

  updateLoteProductos(dataLoteProductos: any): Observable<any> {
    return this.http.put(`${this.baseUrlLoteProductos}`, dataLoteProductos);
  }

  deleteLoteProductos(codLote: string): Observable<any> {
    return this.http.delete(`${this.baseUrlLoteProductos}/${codLote}`);
  }
  
}
