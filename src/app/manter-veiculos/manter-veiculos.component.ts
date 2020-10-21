import { Component, OnInit } from '@angular/core';
import { VeiculoServiceService } from '../manter-veiculos/veiculo-service.service'

@Component({
  selector: 'app-manter-veiculos',
  templateUrl: './manter-veiculos.component.html',
  styleUrls: ['./manter-veiculos.component.css']
})
export class ManterVeiculosComponent implements OnInit {

  veiculo: { id, placa, renavam, modelo, cor, ano_fabricacao, tipo, capacidade, usuario } =
    { id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: null, tipo: "", capacidade: null, usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" } };

  veiculos;
  usuarios;

  consultaPlaca: '';

  constructor(private veiculoService: VeiculoServiceService) { }

  ngOnInit(): void {
    this.veiculoService.getUsuarios().subscribe(resultado => { this.usuarios = resultado })
  }

  salvar() {
    this.veiculoService.post(this.veiculo).subscribe(resultado => {
      this.limpar();
    });
  }

  excluir(id) {
    this.veiculoService.delete(id).subscribe(resultado => {
      this.limpar();
    });
  }

  consultar(placa) {
    if (placa != null && placa !== '') {
      this.veiculoService.getByPlaca(placa).subscribe(dados => {
        this.veiculo = {
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
      this.veiculo = { id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: "", tipo: "", capacidade: "", usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" } };
    }
  }

  consultarUsuario(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf != null && cpf !== '') {
      this.veiculoService.getByCpf(cpf).subscribe(dados => {
        this.veiculo.usuario = {
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
      this.veiculo.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
    }
  }

  limpar() {
    this.veiculo = { 
      id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: null, tipo: "", capacidade: null, 
      usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" } 
    };
    this.consultaPlaca = '';
  }

}
