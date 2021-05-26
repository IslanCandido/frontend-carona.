import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RecuperarContaService {

  constructor(private http: HttpClient) { }

  public enviarMensagem(mensagem: { remetente, destinatario, assunto, corpo }): Observable<any> {
    return this.http.post("http://localhost:8080/mensagens", mensagem);
  }

  public post(usuarios: { id, nome, email, cpf, dt_nascimento, sexo, senha }): Observable<any> {
    return this.http.post("http://localhost:8080/usuarios", usuarios);
  }

  public getByCpf(cpf): Observable<any> {
    return this.http.get(`http://localhost:8080/usuarios/${cpf}`);
  }

}


