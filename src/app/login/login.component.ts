import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioServiceService } from '../manter-usuarios/usuario-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usu: { cpf, senha } = { cpf: "", senha: "" };

  mensagem;

  constructor(private router: Router, private usuarioService: UsuarioServiceService) { }

  ngOnInit(): void {
  }

  login() {
    this.usuarioService.autenticar(this.usu.cpf, this.usu.senha).subscribe(r => {
      if (r) {
        localStorage.setItem('usuario', this.usu.cpf);
        this.router.navigate(['/home']);
        this.mensagem = '';
      } else {
        this.mensagem = 'Usuário ou senha incorretos!';
        alert(this.mensagem);
      }
    });
  }   
  
  registrar() {
    localStorage.setItem('usuario', '');
  }
}
