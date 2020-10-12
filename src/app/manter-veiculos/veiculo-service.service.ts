import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculoServiceService {

  constructor(private http: HttpClient) { }

  public getByPlaca(placa):Observable<any>{
    return this.http.get(`http://localhost:8080/veiculos/${placa}`);
  }

  public get():Observable<any>{
    return this.http.get("http://localhost:8080/veiculos");
  }

  public getUsuarios():Observable<any>{
    return this.http.get("http://localhost:8080/usuarios");
  }

  public getByCpf(cpf):Observable<any>{
    return this.http.get(`http://localhost:8080/usuarios/${cpf}`);
  }

  public post(veiculos: {id, placa, renavam, modelo, cor, ano_fabricacao, tipo, capacidade, usuario}) : Observable<any>{
    return this.http.post("http://localhost:8080/veiculos", veiculos);
  }

  public delete(id):Observable<any>{
    return this.http.delete(`http://localhost:8080/veiculos/${id}`);
  }
}
