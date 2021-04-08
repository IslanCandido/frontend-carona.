import { Component, OnInit } from '@angular/core';
import { ContribuicoesServiceService } from '../manter-contribuicoes/contribuicoes-service.service'

@Component({
  selector: 'app-manter-contribuicoes',
  templateUrl: './manter-contribuicoes.component.html',
  styleUrls: ['./manter-contribuicoes.component.css']
})
export class ManterContribuicoesComponent implements OnInit {

  contribuicao: { id, tipo, valor } = { id: null, tipo: "", valor: "" };

  contribuicoes;
  mensagem;

  constructor(private contribuicoesService: ContribuicoesServiceService) { }

  ngOnInit(): void {
    this.contribuicoesService.get().subscribe(resultado => { this.contribuicoes = resultado });
  }

  salvar(form) {
    this.contribuicoesService.post(this.contribuicao).subscribe(resultado => {
      this.limpar(form);
      this.mensagem = 'Contribuição salva com sucesso!';
    });

  }

  excluir(id, form) {
    this.contribuicoesService.delete(id).subscribe(resultado => {
      this.limpar(form);
      this.mensagem = 'Contribuição removida com sucesso!';
    });
    this.mensagem = 'Contribuição não pode ser removida!';
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

  limpar(form) {
    form.reset();
    this.contribuicao = { id: null, tipo: "", valor: "" };
    this.contribuicoesService.get().subscribe(resultado => { this.contribuicoes = resultado });
  }
}
