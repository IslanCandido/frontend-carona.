import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { CaronaServiceService } from '../manter-caronas/carona-service.service';

@Component({
  selector: 'app-confirmar-caronas',
  templateUrl: './confirmar-caronas.component.html',
  styleUrls: ['./confirmar-caronas.component.css'],
  providers: [MessageService]
})
export class ConfirmarCaronasComponent implements OnInit {

  carona: { id, horario_aproximado, ponto_encontro, acompanhantes, situacao, observacao, rota, usuario, contribuicao } =
    {
      id: null, horario_aproximado: '', ponto_encontro: '', acompanhantes: '', situacao: '', observacao: '',
      rota: { id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "", veiculo: null, contribuicao: null },
      usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" },
      contribuicao: { id: null, tipo: "", valor: "" }
    };

  caronas;
  rotas;
  usuarios;
  contribuicoes;

  email: { remetente, destinatario, assunto, corpo } = { remetente: '', destinatario: '', assunto: '', corpo: '' };

  constructor(private caronaService: CaronaServiceService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.caronaService.getCaronasEmAndamento(localStorage.getItem('usuario'), "Em andamento").subscribe(resultado => { this.caronas = resultado });
  }

  mensagem(severity, summary, detail) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }

  confirmar() {
    this.carona.situacao = "Carona confirmada";

    if (this.carona.observacao === '') {
      this.carona.observacao = 'Sem observações.';
    }

    this.caronaService.post(this.carona).subscribe(resultado => {
      this.email = {
        remetente: 'runsistemadecarona@gmail.com', destinatario: this.carona.usuario.email,
        assunto: 'Pedido de Carona Confirmado',
        corpo: 'Olá ' + this.carona.usuario.nome + '.' +
          '\n\nAviso: Sua carona para ' + this.carona.rota.fim + ' foi confirmada pelo motorista, boa viagem!\n\nStatus da carona: ' + this.carona.situacao + '.'
          + '\nObservação do motorista: ' + this.carona.observacao + '.'
          + '\n\natt: RUN - Sistema de Carona.'
      }

      this.limpar();
      this.mensagem('success', 'Sucesso!', 'Pedido de carona confirmado.');

      this.caronaService.enviarMensagem(this.email).subscribe(r => {
        this.email = { remetente: '', destinatario: '', assunto: '', corpo: '' };
      });
    });
  }

  cancelar(id) {
    if (this.carona.observacao === '') {
      this.carona.observacao = 'Sem observações.';
    }

    this.caronaService.delete(id).subscribe(resultado => {
      this.email = {
        remetente: 'runsistemadecarona@gmail.com', destinatario: this.carona.usuario.email,
        assunto: 'Pedido de Carona Cancelado',
        corpo: 'Olá ' + this.carona.usuario.nome + '.' +
          '\n\nAviso: Infelizmente sua carona para ' + this.carona.rota.fim + ' foi cancelada pelo motorista, boa sorte!\n\nStatus da carona: ' + this.carona.situacao + '.'
          + '\nObservação do motorista: ' + this.carona.observacao + '.'
          + '\n\natt: RUN - Sistema de Carona.'
      }

      this.limpar();
      this.mensagem('success', 'Sucesso!', 'Pedido de carona cancelado.');

      this.caronaService.enviarMensagem(this.email).subscribe(r => {
        this.email = { remetente: '', destinatario: '', assunto: '', corpo: '' };
      });
    });
  }

  consultar(id) {
    this.caronaService.getById(id).subscribe(dados => {
      this.carona = {
        id: dados.id,
        horario_aproximado: dados.horario_aproximado,
        ponto_encontro: dados.ponto_encontro,
        acompanhantes: dados.acompanhantes,
        situacao: dados.situacao,
        observacao: dados.observacao,
        rota: dados.rota,
        usuario: dados.usuario,
        contribuicao: dados.contribuicao
      };
    });
  }

  limpar() {
    this.carona = {
      id: null, horario_aproximado: '', ponto_encontro: '', acompanhantes: '', situacao: '', observacao: '',
      rota: { id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "", veiculo: null, contribuicao: null },
      usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" },
      contribuicao: { id: null, tipo: "", valor: "" }
    };
    this.caronaService.getCaronasEmAndamento(localStorage.getItem('usuario'), "Em andamento").subscribe(resultado => { this.caronas = resultado });
  }
}

