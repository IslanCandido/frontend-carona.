import { getLocaleDayPeriods } from '@angular/common';
import { normalizeGenFileSuffix } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from '../manter-usuarios/usuario-service.service';

@Component({
  selector: 'app-manter-usuarios',
  templateUrl: './manter-usuarios.component.html',
  styleUrls: ['./manter-usuarios.component.css']
})
export class ManterUsuariosComponent implements OnInit {

  usuario: { id, nome, email, cpf, dt_nascimento, sexo, senha } = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
  usuarios;

  constructor(public usuarioService: UsuarioServiceService) { }

  ngOnInit(): void {
  }

  salvar() {
    this.usuarioService.post(this.usuario).subscribe(resultado => {
      this.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
    });
  }

  excluir(id) {
    this.usuarioService.delete(this.usuario.id).subscribe(resultado => {
      this.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
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

  limpar(form) {
    form.reset();
  }
}
