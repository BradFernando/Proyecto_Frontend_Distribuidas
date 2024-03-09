import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseUrlCliente = 'http://26.254.123.130:5000/cliente';

  constructor(private http: HttpClient) { }

  getAllClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlCliente}`);
  }

  createCliente(dataCliente: any): Observable<any> {
    return this.http.post(`${this.baseUrlCliente}`, dataCliente);
  }

  getClienteById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrlCliente}/byId/${id}`);
  }

  getClienteByCedula(cedula: string): Observable<any> {
    return this.http.get(`${this.baseUrlCliente}/byCedula/${cedula}`);
  }

  updateCliente(id: string, dataCliente: any): Observable<any> {
    return this.http.put(`${this.baseUrlCliente}/${id}`, dataCliente);
  }

  deleteCliente(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrlCliente}/${id}`);
  }

  //Metodo para contar los documentos que hay dentro de Clientes 
  getClienteCount(): Observable<number> { 
    return this.http.get<number>(`${this.baseUrlCliente}/count`);
  }

}
