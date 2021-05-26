import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioServiceService } from '../manter-usuarios/usuario-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  usu: { cpf, senha } = { cpf: "", senha: "" };

  email: { remetente, destinatario, assunto, corpo } = { remetente: '', destinatario: '', assunto: '', corpo: '' };

  descEmail = '';
  flagDialog: boolean = false;

  constructor(private router: Router,
    private usuarioService: UsuarioServiceService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  mensagem(severity, summary, detail) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }

  login() {
    this.usuarioService.autenticar(this.usu.cpf, this.usu.senha).subscribe(r => {
      if (r) {
        localStorage.setItem('usuario', this.usu.cpf);
        this.router.navigate(['/home']);
      } else {
        this.mensagem('error', 'Erro!', 'Usuário ou senha incorretos.');
      }
    });
  }

  registrar() {
    localStorage.setItem('usuario', '');
  }

  recuperar() {
    this.email = {
      remetente: 'runsistemadecarona@gmail.com', destinatario: this.descEmail,
      assunto: 'Recuperação de Conta.',
      corpo: 'Alguém, espero que você, solicitou a redefinição da senha da sua conta RUN - Sistema de carona.\n\n'
        + 'Se você não realizou essa solicitação, pode ignorar este e-mail com segurança.\n'
        + 'Caso contrário, clique no link abaixo para concluir o processo.\n\n'
        + 'http://localhost:4200/recuperar-conta'
    }
    this.mensagem('info', 'Informação!', 'Email Enviado.');
    this.descEmail = '';

    this.usuarioService.enviarMensagem(this.email).subscribe(r => {
      this.email = { remetente: '', destinatario: '', assunto: '', corpo: '' };
    });
  }
}
