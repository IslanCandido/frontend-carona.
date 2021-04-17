import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ContribuicoesServiceService } from '../manter-contribuicoes/contribuicoes-service.service'

@Component({
  selector: 'app-manter-contribuicoes',
  templateUrl: './manter-contribuicoes.component.html',
  styleUrls: ['./manter-contribuicoes.component.css'],
  providers: [MessageService]
})
export class ManterContribuicoesComponent implements OnInit {

  contribuicao: { id, tipo, valor } = { id: null, tipo: "", valor: "" };

  contribuicoes;

  constructor(private contribuicoesService: ContribuicoesServiceService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.contribuicoesService.get().subscribe(resultado => { this.contribuicoes = resultado });
  }

  mensagem(severity, summary, detail) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }

  salvar(form) {
    this.contribuicoesService.post(this.contribuicao).subscribe(resultado => {
      this.limpar(form);
      this.mensagem('success', 'Sucesso!', 'Contribuição salva.');
    });

  }

  excluir(id, form) {
    this.contribuicoesService.delete(id).subscribe(resultado => {
      this.limpar(form);
      this.mensagem('success', 'Sucesso!', 'Contribuição removida.');
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

  limpar(form) {
    form.reset();
    this.contribuicao = { id: null, tipo: "", valor: "" };
    this.contribuicoesService.get().subscribe(resultado => { this.contribuicoes = resultado });
  }
}
