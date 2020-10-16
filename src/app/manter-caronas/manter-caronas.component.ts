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

  constructor(private caronaService: CaronaServiceService) { }

  ngOnInit(): void {
    this.caronaService.getRotas().subscribe(resultado => { this.rotas = resultado });
    this.caronaService.getUsuarios().subscribe(resultado => { this.usuarios = resultado });
    this.caronaService.getContribuicoes().subscribe(resultado => { this.contribuicoes = resultado });
  }

  salvar() {
    console.log(this.carona);
    this.caronaService.post(this.carona).subscribe(resultado => {
      this.carona = {
        id: null, horario_aproximado: '', ponto_encontro: '', acompanhantes: '', situacao: '', observacao: '',
        rota: { id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "", veiculo: null, contribuicao: null },
        usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" },
        contribuicao: { id: null, tipo: "", valor: "" }
      };
    });
    alert("Carona salva com sucesso!");
  }

  excluir(id) {
    var r = confirm("Você realmente deseja remover essa carona?");

    if (r == true) {
      this.caronaService.delete(this.carona.id).subscribe(resultado => {
        this.carona = {
          id: null, horario_aproximado: '', ponto_encontro: '', acompanhantes: '', situacao: '', observacao: '',
          rota: { id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "", veiculo: null, contribuicao: null },
          usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" },
          contribuicao: { id: null, tipo: "", valor: "" }
        };
      });
      alert("Carona removida com sucesso!");
    } else {
      alert("Carona não foi removida!");
    }
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

  limpar(form) {
    form.reset();
  }

}
