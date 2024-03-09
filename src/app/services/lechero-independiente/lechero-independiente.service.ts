import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecheroIndependienteService {

 /* GetColorList(): colorentity[] {
    return [
      { code: 'c0', name: 'black' },
      { code: 'c1', name: 'Red' },
      { code: 'c2', name: 'Green' },
      { code: 'c3', name: 'Yellow' },
      { code: 'c4', name: 'White' }
    ]
  }*/

  private baseUrl = 'http://localhost:8080/lecheroIndependiente';

  constructor(private http: HttpClient) {}
/*
  getAllLecheros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  addLechero(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  updateLechero(cedula: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${cedula}`, data);
  }

  deleteLechero(cedula: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${cedula}`);
  }*/

  getAllLecheros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
  
  addLechero(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }
  
  updateLechero(codLechero: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${codLechero}`, data);
  }
  
  deleteLechero(codLechero: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${codLechero}`);
  }


  

}
