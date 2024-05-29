import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private resultsSubject = new BehaviorSubject<any[]>([]);
  results$ = this.resultsSubject.asObservable();

  constructor(private http: HttpClient) {}

  search(tipoPersona: string, criterio: string, documento?: string, nombre?: string): Observable<any[]> {
    return this.http.get<any[]>('../assets/personas.json').pipe(
      map(personas => personas.filter(persona => {
        if (persona.tipoPersona !== tipoPersona) {
          return false;
        }
        if (criterio === 'documento' && persona.documento !== documento) {
          return false;
        }
        if (criterio === 'nombre' && persona.nombre?.toLowerCase() !== nombre?.toLowerCase()) {
          return false;
        }
        return true;
      }))
    );
  }

  updateResults(results: any[]) {
    this.resultsSubject.next(results);
  }
}
