import { Component, OnInit } from '@angular/core';
import { ContatoServiceService } from '../manter-contatos/contato-service.service';

@Component({
  selector: 'app-manter-contatos',
  templateUrl: './manter-contatos.component.html',
  styleUrls: ['./manter-contatos.component.css']
})
export class ManterContatosComponent implements OnInit {

  contato: { id, tipo, telefone, usuario } = { id: null, tipo: "", telefone: "", usuario: null };
  contatos;

  constructor(private contatoService: ContatoServiceService) { }

  ngOnInit(): void {
    this.contatoService.get().subscribe(resultado => { this.contatos = resultado });
  }

  salvar() {
    console.log(this.contato);
    this.contatoService.post(this.contato).subscribe(resultado => {
      this.contato = { id: null, tipo: "", telefone: "", usuario: null };
    });
  }

  excluir(id) {
    this.contatoService.delete(this.contato.id).subscribe(resultado => {
      this.contato = { id: null, tipo: "", telefone: "", usuario: "" };
    });
  }

  consultar(id) {
    this.contatoService.getById(id).subscribe(dados => {
      this.contato = {
        id: dados.id,
        tipo: dados.tipo,
        telefone: dados.telefone,
        usuario: dados.usuario.cpf
      };
    });
  }

  limpar() {
    console.log(this.contato);
    this.contato = { id: null, tipo: "", telefone: "", usuario: "" };
  }

}
