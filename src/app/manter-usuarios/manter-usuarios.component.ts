import { ParsedVariable } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { UsuarioServiceService } from '../manter-usuarios/usuario-service.service';

@Component({
  selector: 'app-manter-usuarios',
  templateUrl: './manter-usuarios.component.html',
  styleUrls: ['./manter-usuarios.component.css']
})
export class ManterUsuariosComponent implements OnInit {

  usuario: { id, nome, email, cpf, dt_nascimento, sexo, senha } = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
  usuarios;

  consultaCPF: '';

  constructor(public usuarioService: UsuarioServiceService) { }

  ngOnInit(): void {
  }

  salvar() {
    if (this.isCPF(this.usuario.cpf)) {
      /*if (this.usuarioService.getCpfIgual(this.usuario.cpf)) {
      alert('Usuário já é cadastrado!');
    } else {*/
      this.usuarioService.post(this.usuario).subscribe(resultado => {
        this.limpar();
        alert('Usuário salvo com sucesso!');
      });
      //}
    } else {
      alert('CPF invalido!');
    }

  }

  excluir(id) {
    this.usuarioService.delete(id).subscribe(resultado => {
      this.limpar();
      alert('Usuário removido!');
    });
  }

  consultar(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf != null && cpf !== '') {
      this.usuarioService.getByCpf(cpf).subscribe(dados => {
        this.usuario = {
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
      this.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
    }
  }

  limpar() {
    this.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
    this.consultaCPF = '';
  }

  isCPF(cpf) {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    ) {
      return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(9, 10))) return false
    soma = 0
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(10, 11))) return false
    return true

  }
}
