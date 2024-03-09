import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoPasteurizacionService {

  private baseUrlProcesoPasteurizacion = 'http://localhost:8080/procesoPasteurizacion';

  constructor(private http: HttpClient) { }

  getAllProcesoPasteurizacion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlProcesoPasteurizacion}`);
  }

  saveProcesoPasteurizacion(dataProcesoPasteurizacion: any): Observable<any> {
    return this.http.post(`${this.baseUrlProcesoPasteurizacion}`, dataProcesoPasteurizacion);
  }

  getProcesoPasteurizacionById(codProcesoPastz: string): Observable<any> {
    return this.http.get(`${this.baseUrlProcesoPasteurizacion}/${codProcesoPastz}`);
  }

  updateProcesoPasteurizacion(dataProcesoPasteurizacion: any): Observable<any> {
     return this.http.put(`${this.baseUrlProcesoPasteurizacion}`, dataProcesoPasteurizacion);
   }

  deleteProcesoPasteurizacion(codProcesoPastz: string): Observable<any> {
    return this.http.delete(`${this.baseUrlProcesoPasteurizacion}/${codProcesoPastz}`);
  }

  getCodRecepcionLeche(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrlProcesoPasteurizacion}/RecepcionLeche_cod`);
  }

}