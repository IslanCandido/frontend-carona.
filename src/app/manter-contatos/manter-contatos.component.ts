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
  contatoSelecionado;

  constructor(private contatoService: ContatoServiceService) { }

  ngOnInit(): void {
    this.contatoService.get().subscribe(resultado => { this.contatos = resultado });
  }

  selecionarContato(contato) {
    this.contatoSelecionado = contato;
  }

  salvar() {
    console.log(this.contato);
    this.contatoService.post(this.contato).subscribe(resultado => {
      this.contato = { id: null, tipo: "", telefone: "", usuario: null };
    });
  }

  limpar() {
    console.log(this.contato);
    this.contato = { id: null, tipo: "", telefone: "", usuario: "" };
  }

  delete(id) {
    this.contatoService.delete(id).subscribe(r => { this.contatoService.get().subscribe(resultado => { this.contatos = resultado }); });
  }


}
