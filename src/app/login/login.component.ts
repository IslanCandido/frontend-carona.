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
}
