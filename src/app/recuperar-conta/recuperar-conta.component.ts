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
      if (this.isCPF(this.usuario.cpf)) {
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
        this.mensagem('error', 'Erro!', 'CPF inválido.');
      }
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
          senha: this.confirmarSenha
        };
      }
    });
  }

  limpar(form) {
    form.reset();
    this.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
  }

  isCPF(cpf) {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    ) {
      return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(9, 10))) return false
    soma = 0
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(10, 11))) return false
    return true
  }
}
