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
  contribuicaoSelecionada;

  constructor(private contribuicoesService: ContribuicoesServiceService) { }

  ngOnInit(): void {
    this.contribuicoesService.get().subscribe(resultado => {this.contribuicoes = resultado});
  }

  selecionarContribuicao(contribuicao){
    this.contribuicaoSelecionada = contribuicao;
  }
 
  salvar() {
    console.log(this.contribuicao);
    this.contribuicoesService.post(this.contribuicao).subscribe(resultado => {
      this.contribuicao = { id: null, tipo: "", valor: "" };
    });
  }

  limpar() {
    console.log(this.contribuicao);
    this.contribuicao = { id: null, tipo: "", valor: "" };
  }

  excluir(id) {
    this.contribuicoesService.delete(id).subscribe(r => { this.contribuicoesService.get().subscribe(resultado => { this.contribuicoes = resultado }); });
  }

}
