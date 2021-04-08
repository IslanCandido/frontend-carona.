import { Component, OnInit } from '@angular/core';
import { RecuperarContaService } from '../recuperar-conta/recuperar-conta-service.service';

@Component({
  selector: 'app-recuperar-conta',
  templateUrl: './recuperar-conta.component.html',
  styleUrls: ['./recuperar-conta.component.css']
})
export class RecuperarContaComponent implements OnInit {

  usuario: { id, nome, email, cpf, dt_nascimento, sexo, senha } = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };

  mensagem: { remetente, destinatario, assunto, corpo } = { remetente: '', destinatario: '', assunto: '', corpo: '' };

  confirmarSenha;
  informacao;

  constructor(public recuperarContaService: RecuperarContaService) { }

  ngOnInit(): void {
  }


  recuperar(form) {
    if (this.usuario.senha === this.confirmarSenha) {
      this.recuperarContaService.post(this.usuario).subscribe(resultado => {
        this.mensagem = {
          remetente: 'runsistemadecarona@gmail.com', destinatario: this.usuario.email,
          assunto: 'Recuperação de Conta realizada!',
          corpo: 'Olá ' + this.usuario.nome + '\n\nAviso: A recuperação da sua conta foi feita com sucesso!\natt: RUN - Sistema de Carona'
        }
        this.informacao = 'Conta recuperada com sucesso!';
        this.limpar(form);

        this.recuperarContaService.enviarMensagem(this.mensagem).subscribe(r => {
          this.mensagem = { remetente: '', destinatario: '', assunto: '', corpo: '' };
        });
      });
    } else {
      this.informacao = "Senhas são incompativeis!";
    }
  }

  consultar(cpf) {
    if (cpf !== '' || cpf.lenght != 9) {
      this.recuperarContaService.getByCpf(cpf).subscribe(dados => {
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

  limpar(form) {
    form.reset();
    this.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
  }
}
