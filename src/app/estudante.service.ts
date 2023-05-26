import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudante } from './estudante';

@Injectable({
    providedIn: 'root'
  })
  export class EstudanteService {
  
    url = "http://localhost:3000/estudantes";
  
    constructor(private http: HttpClient) { }
    getEstudantes(): Observable<Estudante[]>{
      return this.http.get<Estudante[]>(this.url);
    }
  
    save(estudante: Estudante): Observable<Estudante>{
      return this.http.post<Estudante>(this.url, estudante);
    }
  
    remove(estudante: Estudante): Observable<void>{
      return this.http.delete<void>(`${this.url}/${estudante.ra}`);
    }
  
    update(estudante: Estudante): Observable<Estudante>{
      return this.http.put<Estudante>(`${this.url}/${estudante.ra}`, estudante);
    }
  }