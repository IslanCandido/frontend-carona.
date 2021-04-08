import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fechar(){
    localStorage.removeItem('usuario');
    localStorage.removeItem('nome');
    localStorage.removeItem('cpf');
    localStorage.removeItem('email');
    localStorage.removeItem('data_nascimento');
    localStorage.removeItem('sexo');
    localStorage.removeItem('senha');
  }
}
