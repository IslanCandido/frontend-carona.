import { Component, OnInit } from '@angular/core';
import { RotaServiceService } from '../manter-rotas/rota-service.service';

@Component({
  selector: 'app-manter-rotas',
  templateUrl: './manter-rotas.component.html',
  styleUrls: ['./manter-rotas.component.css']
})
export class ManterRotasComponent implements OnInit {

  rota: { id, data, horario, inicio, fim, status, verificador, veiculo, contribuicao } =
    {
      id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "",
      veiculo: { id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: null, tipo: "", capacidade: null, usuario: null },
      contribuicao: { id: null, tipo: "", valor: "" }
    };

    mensagem: { remetente, destinatario, assunto, corpo } = { remetente: '', destinatario: '', assunto: '', corpo: '' };

  rotas;
  veiculos;
  contribuicoes;

  consultaCodVer;
  notificacao;

  constructor(private rotaService: RotaServiceService) { }

  ngOnInit(): void {
    this.rotaService.getContribuicoes().subscribe(resultado => { this.contribuicoes = resultado });
    this.rotaService.getVeiculos().subscribe(resultado => { this.veiculos = resultado });
    this.gerarVerificador();
    this.mostrarDados();
    this.consultarVeiculo(this.rota.veiculo.placa);
  }

  salvar() {
    if (this.rota.horario.length === 5) {
      this.rota.horario = this.rota.horario + ":00";
    }
    if(this.rota.verificador === '' || this.rota.verificador === null){
      this.rota.verificador = this.gerarVerificador();
    }

    this.rotaService.getVerificadorIgual(this.rota.verificador).subscribe(r => {
      if (r) {
        if (this.rota.id === null) {
          this.notificacao = 'Código Verificador ja está sendo usado em outra rota!';
        } else {
          this.rotaService.getPlacaExiste(this.rota.veiculo.placa).subscribe(p => {
            if (p) {
              this.rotaService.post(this.rota).subscribe(resultado => {
                this.limpar();
                this.notificacao = 'Rota salva com sucesso!';
              });
            } else {
              this.notificacao = 'Placa não existe no sistema!';
            }
          });
        }
      } else {
        this.rotaService.getPlacaExiste(this.rota.veiculo.placa).subscribe(p => {
          if (p) {
            this.rotaService.post(this.rota).subscribe(resultado => {
              this.mensagem = {
                remetente: 'runsistemadecarona@gmail.com', destinatario: this.rota.veiculo.usuario.email,
                assunto: 'Código da sua rota',
                corpo: 'Olá ' + this.rota.veiculo.usuario.nome + '.' +
                  '\n\nRecentemente você cadastrou uma rota no nosso sistema de carona.' + 
                  '\nCada rota tem o seu código verificador, e ele é muito importante para que possa alterar ou excluir sua rota futuramente.' +
                  '\nEsse é o código verificador da sua rota com destino para '+ this.rota.fim +
                  '\n\n COD: '+ this.rota.verificador
                  +'.\n\natt: RUN - Sistema de Carona.'
              }

              this.rotaService.enviarMensagem(this.mensagem).subscribe(r => {
                this.mensagem = { remetente: '', destinatario: '', assunto: '', corpo: '' };
              });

              this.limpar();
              this.notificacao = 'Rota salva com sucesso!';
            });
          } else {
            this.notificacao = 'Placa não existe no sistema!';
          }
        });
      }
    });
  }

  excluir(id) {
    this.rotaService.delete(id).subscribe(resultado => {
      this.limpar();
      this.notificacao = 'Rota removida com sucesso!';
    });
    this.notificacao = 'Rota não pode ser removida!';
  }

  consultar(verificador) {
    if (verificador != null && verificador !== '') {
      this.rotaService.getByVerificador(verificador).subscribe(dados => {
        this.rota = {
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
      this.rota = {
        id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "",
        veiculo: { id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: null, tipo: "", capacidade: null, usuario: null },
        contribuicao: { id: null, tipo: "", valor: "" }
      };
    }
  }

  consultarVeiculo(placa) {
    if (placa != null && placa !== '') {
      this.rotaService.getByPlaca(placa).subscribe(dados => {
        this.rota.veiculo = {
          id: dados.id,
          placa: dados.placa,
          renavam: dados.renavam,
          modelo: dados.modelo,
          cor: dados.cor,
          ano_fabricacao: dados.ano_fabricacao,
          tipo: dados.tipo,
          capacidade: dados.capacidade,
          usuario: dados.usuario
        };
      });
    } else {
      this.rota.veiculo = { id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: "", tipo: "", capacidade: "", usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" } };
    }
  }

  limpar() {
    this.rota = {
      id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "",
      veiculo: { id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: null, tipo: "", capacidade: null, usuario: null },
      contribuicao: { id: null, tipo: "", valor: "" }
    }
    this.consultaCodVer = '';
    this.gerarVerificador();
    this.limparDados();
  }

  gerarVerificador() {
    let cod = '';

    do {
      cod += Math.random().toString(36).substr(2);
    } while (cod.length < 8);

    cod = cod.substr(0, 8);
    cod.toLowerCase();

    this.rota.verificador = cod;

  }

  getData(data){
    data = new Date();
    var dy = data.getDate() + 1;
    var mt = data.getMonth() + 1;
    var yr = data.getFullYear();

    return yr + "-" + mt + "-" + dy;
  }

  getDataAtual() {
    var today = new Date();
    var dy = today.getDate();
    var mt = today.getMonth() + 1;
    var yr = today.getFullYear();
    return yr + "-" + mt + "-" + dy;
  }

  pegarDados() {
    localStorage.setItem('data', this.rota.data);
    localStorage.setItem('hotario', this.rota.horario);
    localStorage.setItem('veiculo', this.rota.veiculo.placa);
    localStorage.setItem('saida', this.rota.inicio);
    localStorage.setItem('destino', this.rota.fim);
    localStorage.setItem('status', this.rota.status);
  }

  mostrarDados() {
      this.rota.data = localStorage.getItem('data');
      this.rota.horario = localStorage.getItem('hotario');
      this.rota.veiculo.placa = localStorage.getItem('veiculo');
      this.rota.inicio = localStorage.getItem('saida');
      this.rota.fim = localStorage.getItem('destino');
      this.rota.status = localStorage.getItem('status');

      if (localStorage.getItem('veiculo') === null) {
        this.rota.veiculo.placa = '';
      }
      if (localStorage.getItem('saida') === null) {
        this.rota.inicio = '';
      }
      if (localStorage.getItem('destino') === null) {
        this.rota.fim = '';
      }
  }

  limparDados() {
    localStorage.removeItem('data');
    localStorage.removeItem('hotario');
    localStorage.removeItem('veiculo');
    localStorage.removeItem('saida');
    localStorage.removeItem('destino');
    localStorage.removeItem('status');
  }

}
