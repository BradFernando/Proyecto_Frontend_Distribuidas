import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HaciendaLecheraService {

  
  private baseUrlHaciendaLechera = 'http://localhost:8080/haciendaLechera';

  constructor(private http: HttpClient) {}

  getAllHaciendaLechera(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlHaciendaLechera}`);
  }
  
  addHaciendaLechera(dataHacLechera: any): Observable<any> {
    return this.http.post(`${this.baseUrlHaciendaLechera}`, dataHacLechera);
  }
  
  updateHaciendaLechera(codHacienda: string, dataHacLechera: any): Observable<any> {
    return this.http.put(`${this.baseUrlHaciendaLechera}/${codHacienda}`, dataHacLechera);
  }
  
  deleteHaciendaLechera(codHacienda: string): Observable<any> {
    return this.http.delete(`${this.baseUrlHaciendaLechera}/${codHacienda}`);
  }
  
}
