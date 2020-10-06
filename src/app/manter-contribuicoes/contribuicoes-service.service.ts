import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContribuicoesServiceService {

  constructor(private http : HttpClient) { }

  public get():Observable<any>{
    return this.http.get("http://localhost:8080/contribuições");
  }

  public post(contribuicoes: {id, tipo, valor}) : Observable<any>{
    return this.http.post("http://localhost:8080/contribuições", contribuicoes);
  }

  public delete(id):Observable<any>{
    return this.http.delete(`http://localhost:8080/contribuições/${id}`);
  }
}
