import { Component, OnInit } from '@angular/core';
import { CaronaServiceService } from '../manter-caronas/carona-service.service';

@Component({
  selector: 'app-confirmar-caronas',
  templateUrl: './confirmar-caronas.component.html',
  styleUrls: ['./confirmar-caronas.component.css']
})
export class ConfirmarCaronasComponent implements OnInit {

  carona: { id, horario_aproximado, ponto_encontro, acompanhantes, situacao, observacao, rota, usuario, contribuicao } =
    {
      id: null, horario_aproximado: '', ponto_encontro: '', acompanhantes: '', situacao: '', observacao: '',
      rota: { id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "", veiculo: null, contribuicao: null },
      usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" },
      contribuicao: { id: null, tipo: "", valor: "" }
    };

  caronas
  rotas
  usuarios
  contribuicoes


  constructor(private caronaService: CaronaServiceService) { }

  ngOnInit(): void {
    this.caronaService.getBySituacao("Em andamento").subscribe(resultado => { this.caronas = resultado });
  }

  confirmar() {
    this.carona.situacao = "Carona confirmada";

    this.caronaService.post(this.carona).subscribe(resultado => {
      this.limpar();
      alert('Pedido de carona confirmado com sucesso!');
    });
  }

  cancelar() {
    var r = confirm("Você realmente deseja cancelar essa carona?");

    if (r) {
      this.carona.situacao = "Carona cancelada";

      this.caronaService.post(this.carona).subscribe(resultado => {
        this.limpar();
        alert('Pedido de carona cancelado com sucesso!');
      });
    } else {
      alert('Pedido de carona não foi cancelado!');
    }

  }

  consultar(id) {
    this.caronaService.getById(id).subscribe(dados => {
      this.carona = {
        id: dados.id,
        horario_aproximado: dados.horario_aproximado,
        ponto_encontro: dados.ponto_encontro,
        acompanhantes: dados.acompanhantes,
        situacao: dados.situacao,
        observacao: dados.observacao,
        rota: dados.rota,
        usuario: dados.usuario,
        contribuicao: dados.contribuicao
      };
    });
    console.log(this.carona);
  }

  limpar() {
    this.carona = {
      id: null, horario_aproximado: '', ponto_encontro: '', acompanhantes: '', situacao: '', observacao: '',
      rota: { id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "", veiculo: null, contribuicao: null },
      usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" },
      contribuicao: { id: null, tipo: "", valor: "" }
    };
    this.caronaService.getBySituacao("Em andamento").subscribe(resultado => { this.caronas = resultado });
  }
}

