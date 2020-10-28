import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_usu: { usuario, senha } = { usuario: "", senha: "" };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.login_usu.usuario === '07760177135' && this.login_usu.senha === 'root') {
      localStorage.setItem('usuario', this.login_usu.usuario);
      this.router.navigate(['/home']);
    } else {
      alert('Usuário ou senha incorretos!');
    }
  }
}
