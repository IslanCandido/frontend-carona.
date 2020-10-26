import { Component, OnInit } from '@angular/core';
import { CaronaServiceService } from '../manter-caronas/carona-service.service';

@Component({
  selector: 'app-manter-caronas',
  templateUrl: './manter-caronas.component.html',
  styleUrls: ['./manter-caronas.component.css']
})
export class ManterCaronasComponent implements OnInit {

  carona: { id, horario_aproximado, ponto_encontro, acompanhantes, situacao, observacao, rota, usuario, contribuicao } =
    {
      id: null, horario_aproximado: '', ponto_encontro: '', acompanhantes: '', situacao: '', observacao: '',
      rota: { id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "", veiculo: null, contribuicao: null },
      usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" },
      contribuicao: { id: null, tipo: "", valor: "" }
    };

  caronas
  rotas
  usuarios
  contribuicoes

  consultaDestino: '';
  consultaCarona: '';

  constructor(private caronaService: CaronaServiceService) { }

  ngOnInit(): void {
    this.caronaService.getRotasDisponiveis("Disponivel", this.getDataAtual(), this.getData()).subscribe(resultado => { this.rotas = resultado });
    this.caronaService.getUsuarios().subscribe(resultado => { this.usuarios = resultado });
    this.caronaService.getContribuicoes().subscribe(resultado => { this.contribuicoes = resultado });
  }

  consultarDestino(destino) {
    if (this.consultaDestino == "") {
      this.caronaService.getRotasDisponiveis("Disponivel", this.getDataAtual(),  this.getData()).subscribe(resultado => { this.rotas = resultado });
    } else {
      this.caronaService.getRotasPesquisada("Disponivel", destino, this.getDataAtual(),  this.getData()).subscribe(resultado => { this.rotas = resultado });
    }
  }

  salvar() {
    if (this.carona.situacao == "") {
      this.carona.situacao = "Em andamento";
    }
    this.caronaService.post(this.carona).subscribe(resultado => {
      this.limpar();
    });
  }

  excluir(id) {
    this.caronaService.delete(id).subscribe(resultado => {
      this.limpar();
    });
  }

  consultarCarona(id) {
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
    console.log(this.carona);
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
    cpf = cpf.replace(/\D/g, '');

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

  limpar() {
    this.carona = {
      id: null, horario_aproximado: '', ponto_encontro: '', acompanhantes: '', situacao: '', observacao: '',
      rota: { id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "", veiculo: null, contribuicao: null },
      usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" },
      contribuicao: { id: null, tipo: "", valor: "" }
    };
    this.caronaService.getRotasDisponiveis("Disponivel", this.getDataAtual(),  this.getData()).subscribe(resultado => { this.rotas = resultado });

    this.consultaDestino = '';
    this.consultaCarona = '';
  }

  getDataAtual(){
    var today = new Date();
    var dy = today.getDate();
    var mt = today.getMonth()+1;
    var yr = today.getFullYear();
    return yr+"-"+mt+"-"+dy;
  }

  getData(){
    var today = new Date();
    var dy = 30;
    var mt = 10;
    var yr = 2021;
    return yr+"-"+mt+"-"+dy;
  }

}
