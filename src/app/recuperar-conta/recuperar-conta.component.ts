import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from '../manter-usuarios/usuario-service.service';

@Component({
  selector: 'app-recuperar-conta',
  templateUrl: './recuperar-conta.component.html',
  styleUrls: ['./recuperar-conta.component.css']
})
export class RecuperarContaComponent implements OnInit {

  usuario: { id, nome, email, cpf, dt_nascimento, sexo, senha } = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };

  confirmarSenha;
  mensagem;

  constructor(public usuarioService: UsuarioServiceService) { }

  ngOnInit(): void {
  }


  recuperar(){
    if(this.usuario.senha === this.confirmarSenha){
      this.usuarioService.post(this.usuario).subscribe(resultado => {
        this.limpar();
        this.mensagem = 'Conta recuperada com sucesso!';
      });
    } else {
      this.mensagem = "Senhas são incompativeis!";
    }
  }

  consultar(cpf){
    if (cpf !== '' || cpf.lenght != 9) {
      this.usuarioService.getByCpf(cpf).subscribe(dados => {
        this.usuario = {
          id: dados.id,
          nome: dados.nome,
          email: dados.email,
          cpf: dados.cpf,
          dt_nascimento: dados.dt_nascimento,
          sexo: dados.sexo,
          senha: ''
        };
      });
    } else {
      this.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
    }

  }

  limpar() {
    this.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
  }

}
