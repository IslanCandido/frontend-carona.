import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RotaServiceService {

  constructor(private http: HttpClient) { }

  public getByVerificador(verificador):Observable<any>{
    return this.http.get(`http://localhost:8080/rotas/${verificador}`);
  }

  public get():Observable<any>{
    return this.http.get("http://localhost:8080/rotas");
  }

  public getVerificadorIgual(verificador):Observable<any>{
    return this.http.get(`http://localhost:8080/rotas/existe/${verificador}`)
  }

  public getContribuicoes():Observable<any>{
    return this.http.get("http://localhost:8080/contribuições");
  }

  public getByIdContribuicoes(id):Observable<any>{
    return this.http.get(`http://localhost:8080/contribuições/${id}`);
  }

  public getVeiculos():Observable<any>{
    return this.http.get("http://localhost:8080/veiculos");
  }

  public getByPlaca(placa):Observable<any>{
    return this.http.get(`http://localhost:8080/veiculos/${placa}`);
  }

  public getPlacaExiste(placa):Observable<any>{
    return this.http.get(`http://localhost:8080/veiculos/verificar/existe/${placa}`)
  }

  public post(rotas: {id, data, horario, inicio, fim, status, verificador, veiculo, contribuicao}) : Observable<any>{
    return this.http.post("http://localhost:8080/rotas", rotas);
  }

  public delete(id):Observable<any>{
    return this.http.delete(`http://localhost:8080/rotas/${id}`);
  }

  public enviarMensagem(mensagem: { remetente, destinatario, assunto, corpo }): Observable<any> {
    return this.http.post("http://localhost:8080/mensagens", mensagem);
  }
}