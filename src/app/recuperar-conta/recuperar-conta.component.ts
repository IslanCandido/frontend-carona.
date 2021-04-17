import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { RecuperarContaService } from '../recuperar-conta/recuperar-conta-service.service';

@Component({
  selector: 'app-recuperar-conta',
  templateUrl: './recuperar-conta.component.html',
  styleUrls: ['./recuperar-conta.component.css'],
  providers: [MessageService]
})
export class RecuperarContaComponent implements OnInit {

  usuario: { id, nome, email, cpf, dt_nascimento, sexo, senha } = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };

  email: { remetente, destinatario, assunto, corpo } = { remetente: '', destinatario: '', assunto: '', corpo: '' };

  confirmarSenha;

  constructor(public recuperarContaService: RecuperarContaService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  mensagem(severity, summary, detail) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }

  recuperar(form) {
    if (this.usuario.senha === this.confirmarSenha) {
      this.recuperarContaService.post(this.usuario).subscribe(resultado => {
        this.email = {
          remetente: 'runsistemadecarona@gmail.com', destinatario: this.usuario.email,
          assunto: 'Recuperação de Conta realizada!',
          corpo: 'Olá ' + this.usuario.nome + '\n\nAviso: A recuperação da sua conta foi feita com sucesso!\natt: RUN - Sistema de Carona'
        }
        this.mensagem('success', 'Sucesso!', 'Conta recuperada.');
        this.limpar(form);

        this.recuperarContaService.enviarMensagem(this.email).subscribe(r => {
          this.email = { remetente: '', destinatario: '', assunto: '', corpo: '' };
        });
      });
    } else {
      this.mensagem('error', 'Erro!', 'Senhas são incompativeis.');
    }
  }

  consultar(cpf) {
    this.recuperarContaService.getByCpf(cpf).subscribe(dados => {
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
  }
}
