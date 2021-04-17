import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { CaronaServiceService } from '../manter-caronas/carona-service.service';

@Component({
  selector: 'app-manter-caronas',
  templateUrl: './manter-caronas.component.html',
  styleUrls: ['./manter-caronas.component.css'],
  providers: [MessageService]
})
export class ManterCaronasComponent implements OnInit {

  carona: { id, horario_aproximado, ponto_encontro, acompanhantes, situacao, observacao, rota, usuario, contribuicao } =
    {
      id: null, horario_aproximado: '', ponto_encontro: '', acompanhantes: '', situacao: '', observacao: '',
      rota: { id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "", veiculo: null, contribuicao: null },
      usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" },
      contribuicao: { id: null, tipo: "", valor: "" }
    };

  email: { remetente, destinatario, assunto, corpo } = { remetente: '', destinatario: '', assunto: '', corpo: '' };

  caronas
  rotas
  usuarios
  contribuicoes

  consultaCarona;

  constructor(private caronaService: CaronaServiceService, private messageService: MessageService) { }

  ngOnInit(): void {

    this.caronaService.getUsuarios().subscribe(resultado => { this.usuarios = resultado });
    this.caronaService.getContribuicoes().subscribe(resultado => { this.contribuicoes = resultado });

    this.consultarUsuario(localStorage.getItem('usuario'));
    this.consultarRota(localStorage.getItem('verificadorRotaSelecionada'));

    if (this.carona.situacao == "") {
      this.carona.situacao = "Em andamento";
    }
    this.mostrarDados();
  }

  mensagem(severity, summary, detail) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }


  salvar(form) {
    if (this.carona.horario_aproximado.length === 5) {
      this.carona.horario_aproximado = this.carona.horario_aproximado + ":00";
    }

    this.caronaService.verificarCarona(this.carona.rota.verificador, this.carona.usuario.cpf).subscribe(r => {
      if (r) {
        if (this.carona.id === null) {
          this.mensagem('warn', 'Atenção!', 'Pedido de Carona já foi feito por esse usuário.');
        } else {
          if (this.carona.situacao == "Carona confirmada") {
            this.mensagem('warn', 'Atenção!', 'Pedido de carona já foi confirmado, então não pode mais ser alterado.');
          } else {
            if (this.carona.usuario.cpf === this.carona.rota.veiculo.usuario.cpf) {
              this.mensagem('error', 'Erro!', 'Não é possivel fazer um pedido de carona para a sua rota.');
            } else {
              this.caronaService.post(this.carona).subscribe(resultado => {
                this.limpar(form);
                this.mensagem('success', 'Sucesso!', 'Pedido de carona salvo');
              });
            }
          }
        }
      } else {
        if (this.carona.situacao == "Carona confirmada") {
          this.mensagem('warn', 'Atenção!', 'Pedido de carona já foi confirmado, então não pode mais ser alterado.');
        } else {

          if (this.carona.usuario.cpf === this.carona.rota.veiculo.usuario.cpf) {
            this.mensagem('error', 'Erro!', 'Não é possivel fazer um pedido de carona para a sua rota.');
          } else {
            this.caronaService.post(this.carona).subscribe(resultado => {
              this.email = {
                remetente: 'runsistemadecarona@gmail.com', destinatario: this.carona.rota.veiculo.usuario.email,
                assunto: 'Novo Pedido de Carona',
                corpo: 'Olá ' + this.carona.rota.veiculo.usuario.nome + '.' +
                  '\n\nAviso: Você tem um novo pedido de carona na sua rota ' + this.carona.rota.verificador + ' com destino para '
                  + this.carona.rota.fim + '.\n\natt: RUN - Sistema de Carona'
              }

              this.caronaService.enviarMensagem(this.email).subscribe(r => {
                this.email = { remetente: '', destinatario: '', assunto: '', corpo: '' };
              });

              this.limpar(form);
              this.mensagem('success', 'Sucesso!', 'Pedido de carona salvo');
            });
          }
        }
      }
    });
  }

  excluir(id, form) {
    this.caronaService.delete(id).subscribe(resultado => {

      if (this.carona.situacao == "Carona confirmada") {
        this.mensagem('warn', 'Atenção!', 'Como o seu pedido já havia sido confirmado,\n a exclusão dele faz com que ele seja cancelado automaticamente.');

        this.email = {
          remetente: 'runsistemadecarona@gmail.com', destinatario: this.carona.rota.veiculo.usuario.email + '.',
          assunto: 'Carona Cancelada pelo passageiro',
          corpo: 'Olá ' + this.carona.rota.veiculo.usuario.nome +
            '\n\nAviso: O passageiro ' + this.carona.usuario.nome + ' cancelou a carona para '
            + this.carona.rota.fim + '.\n\natt: RUN - Sistema de Carona'
        }

        this.caronaService.enviarMensagem(this.email).subscribe(r => {
          this.email = { remetente: '', destinatario: '', assunto: '', corpo: '' };
        });
      } else {
        this.mensagem('success', 'Sucesso!', 'Pedido de carona removido.');

      }
      this.limpar(form);
    });
  }

  consultarCarona(verificador) {
    this.caronaService.getCarona(verificador, localStorage.getItem('usuario')).subscribe(dados => {
      if (!dados) {
        this.mensagem('info', 'Atenção!', 'Pedido de Carona não encontrado.');
      } else {
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
      }
    });
  }

  consultarRota(verificador) {
    if (verificador != null && verificador !== '') {
      this.caronaService.getByVerificador(verificador).subscribe(dados => {
        this.carona.rota = {
          id: dados.id,
          data: dados.data,
          horario: dados.horario,
          inicio: dados.inicio,
          fim: dados.fim,
          status: dados.status,
          verificador: dados.verificador,
          veiculo: dados.veiculo,
          contribuicao: dados.contribuicao
        };
      });
    } else {
      this.carona.rota = {
        id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "",
        veiculo: { id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: null, tipo: "", capacidade: null, usuario: null },
        contribuicao: { id: null, tipo: "", valor: "" }
      };
    }
  }

  consultarUsuario(cpf) {
    if (cpf != null && cpf !== '') {
      this.caronaService.getByCpf(cpf).subscribe(dados => {
        this.carona.usuario = {
          id: dados.id,
          nome: dados.nome,
          email: dados.email,
          cpf: dados.cpf,
          dt_nascimento: dados.dt_nascimento,
          sexo: dados.sexo,
          senha: dados.senha
        };
      });
    } else {
      this.carona.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
    }
  }

  limpar(form) {
    form.reset();
    this.carona = {
      id: null, horario_aproximado: '', ponto_encontro: '', acompanhantes: '', situacao: '', observacao: '',
      rota: { id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "", veiculo: null, contribuicao: null },
      usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" },
      contribuicao: { id: null, tipo: "", valor: "" }
    };
    this.caronaService.getRotasDisponiveis("Disponivel", "2050-01-01").subscribe(resultado => { this.rotas = resultado });
    this.consultarUsuario(localStorage.getItem('usuario'));

    this.consultaCarona = '';
    this.carona.situacao = "Em andamento";
    this.limparDados();
    this.carona.rota.verificador = localStorage.getItem('verificadorRotaSelecionada');
  }

  pegarDados() {
    localStorage.setItem('rota', this.carona.rota.verificador);
    localStorage.setItem('acompanhantes', this.carona.acompanhantes);
    localStorage.setItem('contribuicao', this.carona.contribuicao.id);
    localStorage.setItem('hora', this.carona.horario_aproximado);
    localStorage.setItem('encontro', this.carona.ponto_encontro);
  }

  mostrarDados() {
    this.carona.rota.verificador = localStorage.getItem('rota');
    this.carona.acompanhantes = localStorage.getItem('acompanhantes');
    this.carona.contribuicao.id = localStorage.getItem('contribuicao');
    this.carona.horario_aproximado = localStorage.getItem('hora');
    this.carona.ponto_encontro = localStorage.getItem('encontro');

    if (localStorage.getItem('rota') === null) {
      this.carona.rota.verificador = '';
    }
    if (localStorage.getItem('acompanhantes') === null) {
      this.carona.acompanhantes = '';
    }
    if (localStorage.getItem('encontro') === null) {
      this.carona.ponto_encontro = '';
    }
  }

  limparDados() {
    localStorage.removeItem('rota');
    localStorage.removeItem('acompanhantes');
    localStorage.removeItem('contribuicao');
    localStorage.removeItem('hora');
    localStorage.removeItem('encontro');
  }
}
