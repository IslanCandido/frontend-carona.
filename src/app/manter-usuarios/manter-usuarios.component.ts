import { MessageService } from 'primeng/api';
import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioServiceService } from '../manter-usuarios/usuario-service.service';

@Component({
  selector: 'app-manter-usuarios',
  templateUrl: './manter-usuarios.component.html',
  styleUrls: ['./manter-usuarios.component.css'],
  providers: [MessageService]
})
export class ManterUsuariosComponent implements OnInit {

  usuario: { id, nome, email, cpf, dt_nascimento, sexo, senha } = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
  contato: { id, tipo, telefone, usuario } = { id: null, tipo: "", telefone: "", usuario: { id_usu: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" } };

  usuarios;
  contatos;

  consultaCPF;

  constructor(public router: Router,
    public usuarioService: UsuarioServiceService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.mostrarDados();
  }

  mensagem(severity, summary, detail) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }

  salvar(form) {
    this.pegarDados();
    this.usuarioService.getCpfIgual(this.usuario.cpf).subscribe(r => {
      if (r) {
        if (this.usuario.id === null) {
          this.mensagem('warn', 'Atenção!', 'CPF ja foi cadastrado no sistema.');
        } else {
          this.usuarioService.post(this.usuario).subscribe(resultado => {
            this.limpar(form);
            this.mensagem('success', 'Sucesso!', 'Usuário salvo.');
          });
        }
      } else {
        if (this.isCPF(this.usuario.cpf)) {
          this.usuarioService.post(this.usuario).subscribe(resultado => {
            this.limpar(form);
            this.mensagem('success', 'Sucesso!', 'Usuário salvo');
          });
        } else {
          this.mensagem('error', 'Erro!', 'CPF inválido.');
        }
      }
    });
    localStorage.setItem('usuario', this.usuario.cpf);
    this.usuarioService.getByCpf(localStorage.getItem('usuario'));
  }

  excluir(id, form) {
    this.usuarioService.delete(id).subscribe(resultado => {
      if (localStorage.getItem('usuario') === this.usuario.cpf) {
        this.limpar(form);
        this.mensagem('success', 'Sucesso!', 'Usuário removido.');

        localStorage.setItem('usuario', '');
      } else {
        this.limpar(form);
        this.mensagem('success', 'Sucesso!', 'Usuário removido.');
      }
    });
  } 

  consultar(cpf) {
    this.usuarioService.getByCpf(cpf).subscribe(dados => {
      if (!dados) {
        this.mensagem('info', 'Atenção!', 'Usuário não encontrado.');
        this.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
      } else {
        this.usuario = {
          id: dados.id,
          nome: dados.nome,
          email: dados.email,
          cpf: dados.cpf,
          dt_nascimento: dados.dt_nascimento,
          sexo: dados.sexo,
          senha: dados.senha
        };
      }
    });
  }

  limpar(form) {
    form.reset();
    this.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
    this.consultaCPF = '';
    this.consultar(localStorage.getItem('usuario'));
    this.consultaCPF = localStorage.getItem('usuario');
    this.limparDados();
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

  pegarDados() {
    localStorage.setItem('nome', this.usuario.nome);
    localStorage.setItem('cpf', this.usuario.cpf);
    localStorage.setItem('email', this.usuario.email);
    localStorage.setItem('data_nascimento', this.usuario.dt_nascimento);
    localStorage.setItem('sexo', this.usuario.sexo);
    localStorage.setItem('senha', this.usuario.senha);
  }

  mostrarDados() {
    if (localStorage.getItem('usuario') === '') {
      this.usuario.nome = localStorage.getItem('nome');
      this.usuario.cpf = localStorage.getItem('cpf');
      this.usuario.email = localStorage.getItem('email');
      this.usuario.dt_nascimento = localStorage.getItem('data_nascimento');
      this.usuario.sexo = localStorage.getItem('sexo');
      this.usuario.senha = localStorage.getItem('senha');

      if (localStorage.getItem('nome') === null) {
        this.usuario.nome = '';
      }
      if (localStorage.getItem('cpf') === null) {
        this.usuario.cpf = '';
      }
      if (localStorage.getItem('email') === null) {
        this.usuario.email = '';
      }
      if (localStorage.getItem('senha') === null) {
        this.usuario.senha = '';
      }
    } else {
      this.consultar(localStorage.getItem('usuario'));
      this.consultaCPF = localStorage.getItem('usuario');
    }
  }

  limparDados() {
    localStorage.removeItem('nome');
    localStorage.removeItem('cpf');
    localStorage.removeItem('email');
    localStorage.removeItem('data_nascimento');
    localStorage.removeItem('sexo');
    localStorage.removeItem('senha');
  }

  getDataAtual() {
    var today = new Date();
    var dy = today.getDate();
    var mt = today.getMonth() + 1;
    var yr = today.getFullYear();
    return yr + "-" + mt + "-" + dy;
  }
}
