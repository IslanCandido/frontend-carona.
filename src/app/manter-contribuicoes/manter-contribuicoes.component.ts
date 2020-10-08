import { Component, OnInit } from '@angular/core';
import { ContribuicoesServiceService } from '../manter-contribuicoes/contribuicoes-service.service'

@Component({
  selector: 'app-manter-contribuicoes',
  templateUrl: './manter-contribuicoes.component.html',
  styleUrls: ['./manter-contribuicoes.component.css']
})
export class ManterContribuicoesComponent implements OnInit {

  contribuicao: { id, tipo, valor } = { id: null, tipo: "", valor: ""};

  contribuicoes;

  constructor(private contribuicoesService: ContribuicoesServiceService) { }

  ngOnInit(): void {
    this.contribuicoesService.get().subscribe(resultado => {this.contribuicoes = resultado});
  }
 
  salvar() {
    console.log(this.contribuicao);
    this.contribuicoesService.post(this.contribuicao).subscribe(resultado => {
      this.contribuicao = { id: null, tipo: "", valor: "" };
    });
  }

  excluir(id) {
    this.contribuicoesService.delete(this.contribuicao.id).subscribe(resultado => {
      this.contribuicao = { id: null, tipo: "", valor: "" };
    });
  }

  consultar(id) {
      this.contribuicoesService.getById(id).subscribe(dados => {
        this.contribuicao = {
          id: dados.id,
          tipo: dados.tipo,
          valor: dados.valor
        };
      });
  }

  limpar() {
    console.log(this.contribuicao);
    this.contribuicao = { id: null, tipo: "", valor: "" };
  }

}
