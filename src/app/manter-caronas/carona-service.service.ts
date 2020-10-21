import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CaronaServiceService {

  constructor(private http: HttpClient) { }

  public get():Observable<any>{
    return this.http.get("http://localhost:8080/caronas");
  }

  public getById(id):Observable<any>{
    return this.http.get(`http://localhost:8080/caronas/${id}`);
  }

  public getBySituacao(situacao):Observable<any>{
    return this.http.get(`http://localhost:8080/caronas/filter/${situacao}`);
  }

  public post(caronas: {id, horario_aproximado, ponto_encontro, acompanhantes, situacao, observacao, rota, usuario, contribuicao}) : Observable<any>{
    return this.http.post("http://localhost:8080/caronas", caronas);
  }

  public delete(id):Observable<any>{
    return this.http.delete(`http://localhost:8080/caronas/${id}`);
  }

  public getRotas():Observable<any>{
    return this.http.get("http://localhost:8080/rotas");
  }

  public getRotasPesquisada(fim){
    return this.http.get(`http://localhost:8080/rotas/filter/${fim}`)
  }

  public getByVerificador(verificador):Observable<any>{
    return this.http.get(`http://localhost:8080/rotas/${verificador}`);
  }

  public getUsuarios():Observable<any>{
    return this.http.get("http://localhost:8080/usuarios");
  }

  public getByCpf(cpf):Observable<any>{
    return this.http.get(`http://localhost:8080/usuarios/${cpf}`);
  }

  public getContribuicoes():Observable<any>{
    return this.http.get("http://localhost:8080/contribuições");
  }

  public getByIdContribuicoes(id):Observable<any>{
    return this.http.get(`http://localhost:8080/contribuições/${id}`);
  }
}
