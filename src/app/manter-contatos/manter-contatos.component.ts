import { Component, OnInit } from '@angular/core';
import { ContatoServiceService } from '../manter-contatos/contato-service.service';

@Component({
  selector: 'app-manter-contatos',
  templateUrl: './manter-contatos.component.html',
  styleUrls: ['./manter-contatos.component.css']
})
export class ManterContatosComponent implements OnInit {

  contato: { id, tipo, telefone, usuario } = { id: null, tipo: "", telefone: "", usuario: { id_usu: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" }};
  
  contatos;
  usuarios; 

  constructor(private contatoService: ContatoServiceService) { }

  ngOnInit(): void {
    this.contatoService.get().subscribe(resultado => { this.contatos = resultado });
    this.contatoService.getUsuarios().subscribe(resultado => { this.usuarios = resultado })
  }

  salvar() {
    this.contatoService.post(this.contato).subscribe(resultado => {
      this.contato = { id: null, tipo: "", telefone: "", usuario: { id_usu: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" }};
    });
    alert("Contato salvo com sucesso!");
  }

  excluir(id) {
    var r = confirm("Você realmente deseja remover esse contato?");

    if (r == true) {
      this.contatoService.delete(this.contato.id).subscribe(resultado => {
        this.contato = { id: null, tipo: "", telefone: "", usuario: { id_usu: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" }};
      });
      alert("Contato removido com sucesso!");
    } else {
      alert("Contato não foi removido!");
    }
  }

  consultar(id) {
    this.contatoService.getById(id).subscribe(dados => {
      this.contato = {
        id: dados.id,
        tipo: dados.tipo,
        telefone: dados.telefone,
        usuario: dados.usuario
      };
    });
  }

  consultarUsuario(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf != null && cpf !== '') {
      this.contatoService.getByCpf(cpf).subscribe(dados => {
        this.contato.usuario = {
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
      this.contato.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
    }
    console.log(this.contato.usuario);
  }

  limpar(form) {
    form.reset();
  }

}
