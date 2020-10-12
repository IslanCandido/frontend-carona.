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
  }

  excluir(id) {
    this.contatoService.delete(this.contato.id).subscribe(resultado => {
      this.contato = { id: null, tipo: "", telefone: "", usuario: { id_usu: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" }};
    });
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

  limpar(form) {
    form.reset();
  }

}
