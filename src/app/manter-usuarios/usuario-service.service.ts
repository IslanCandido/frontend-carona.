import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor(private http: HttpClient) { }

  public getByCpf(cpf):Observable<any>{
    return this.http.get(`http://localhost:8080/usuarios/${cpf}`);
  }

  public get():Observable<any>{
    return this.http.get("http://localhost:8080/usuarios");
  }

  public post(usuarios: {id, nome, email, cpf, dt_nascimento, sexo, senha}) : Observable<any>{
    return this.http.post("http://localhost:8080/usuarios", usuarios);
  }

  public delete(id):Observable<any>{
    return this.http.delete(`http://localhost:8080/usuarios/${id}`);
  }
}
