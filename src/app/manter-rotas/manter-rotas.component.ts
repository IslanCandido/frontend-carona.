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

  rotas;
  veiculos;
  contribuicoes;

  constructor(private rotaService: RotaServiceService) { }

  ngOnInit(): void {
    this.rotaService.getContribuicoes().subscribe(resultado => { this.contribuicoes = resultado });
    this.rotaService.getVeiculos().subscribe(resultado => { this.veiculos = resultado });
  }

  salvar() {
    console.log(this.rota);
    this.rotaService.post(this.rota).subscribe(resultado => {
      this.rota = {
        id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "",
        veiculo: { id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: null, tipo: "", capacidade: null, usuario: null },
        contribuicao: { id: null, tipo: "", valor: "" }
      };
    });
  }

  excluir(id) {
    var r = confirm("Você realmente deseja remover esse usuário?");

    if (r == true) {
      this.rotaService.delete(this.rota.id).subscribe(resultado => {
        this.rota = {
          id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "",
          veiculo: { id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: null, tipo: "", capacidade: null, usuario: null },
          contribuicao: { id: null, tipo: "", valor: "" }
        };
      });
      alert("Usuário removido com sucesso!");
    } else {
      alert("Usuário não foi removido!");
    }
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

  consultarContribuicao(id) {
    this.rotaService.getByIdContribuicoes(id).subscribe(dados => {
      this.rota.contribuicao = {
        id: dados.id,
        tipo: dados.tipo,
        valor: dados.valor
      };
    });
  }

  limpar(form) {
    form.reset();
  }

  gerarVerificador(tamanho) {
    let cod = '';

    do {
      cod += Math.random().toString(36).substr(2);
    } while (cod.length < tamanho);

    cod = cod.substr(0, tamanho);
    cod.toLowerCase();

    console.log(cod);
  }

}
