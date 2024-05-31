import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private resultsSubject = new BehaviorSubject<any[]>([]);
  results$ = this.resultsSubject.asObservable();

  private apiURL = 'http://localhost:8080/api/persons/search';

  constructor(private http: HttpClient) {}

  search(tipoPersona: string, criterio: string, documento?: string, nombre?: string): Observable<any[]> {
    let type: string;
    let value: string;

    switch (criterio) {
      case 'documento':
        type = 'D';
        value = documento ?? '';
        break;
      case 'nombre':
        type = 'N';
        value = nombre ?? '';
        break;
      default:
        throw new Error('Criterio no soportado'); // Lanza un error si el criterio no es soportado
    }

    const params = new HttpParams()
      .set('type', type)
      .set('value', value);

    return this.http.get<any[]>(this.apiURL, { params }).pipe(
      map(response => {
        this.updateResults(response); // Actualiza los resultados con la respuesta del servidor
        return response;
      })
    );
  }

  updateResults(results: any[]) {
    this.resultsSubject.next(results);
    console.log(results);
  }
}
