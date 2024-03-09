import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecepcionLecheService {

 
  private baseUrlRecepcionLeche = 'http://localhost:8080/recepcionLeche';

  constructor(private http: HttpClient) {}

  getAllRecepcionLeche(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlRecepcionLeche}`);
  }
  
  saveRecepcionLecheroIndependiente(recepciondeLechero_dto: any): Observable<any> {
    return this.http.post(`${this.baseUrlRecepcionLeche}/lecheroIndependiente`, recepciondeLechero_dto);
  }

  saveRecepcionHaciendaLechera(recepcionHaciendasLecheras_dto: any): Observable<any> {
    return this.http.post(`${this.baseUrlRecepcionLeche}/haciendaLechera`, recepcionHaciendasLecheras_dto);
  }
  
  /*updateRecepcionLeche(codRecepcion: string, recepcionLeche: any): Observable<any> {
    return this.http.put(`${this.baseUrlRecepcionLeche}/${codRecepcion}`, recepcionLeche);
  }
  */

  updateRecepcionLeche(recepcionLecheUpdateDto: any): Observable<any> {
    return this.http.put(`${this.baseUrlRecepcionLeche}`, recepcionLecheUpdateDto);
  }

  deleteRecepcionLeche(codRecepcion: string): Observable<any> {
    return this.http.delete(`${this.baseUrlRecepcionLeche}/${codRecepcion}`);
  }
  
  getCodLechero(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrlRecepcionLeche}/lecheroIndependiente_cod`);
  }
  
  getCodHacienda(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrlRecepcionLeche}/haciendaLechera_cod`);
  }


}
