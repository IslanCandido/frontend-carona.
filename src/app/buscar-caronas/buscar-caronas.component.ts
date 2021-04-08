import { Component, OnInit } from '@angular/core';
import { CaronaServiceService } from '../manter-caronas/carona-service.service';

@Component({
  selector: 'app-buscar-caronas',
  templateUrl: './buscar-caronas.component.html',
  styleUrls: ['./buscar-caronas.component.css']
})
export class BuscarCaronasComponent implements OnInit {

  carona: { id, horario_aproximado, ponto_encontro, acompanhantes, situacao, observacao, rota, usuario, contribuicao } =
    {
      id: null, horario_aproximado: '', ponto_encontro: '', acompanhantes: '', situacao: '', observacao: '',
      rota: { id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "", veiculo: null, contribuicao: null },
      usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" },
      contribuicao: { id: null, tipo: "", valor: "" }
    };

  caronas;
  rotas;
  consultaDestino;

  constructor(private caronaService: CaronaServiceService) { }

  ngOnInit(): void {
    this.limpar();
  }

  consultarDestino(destino) {
    if (this.consultaDestino == "") {
      this.caronaService.getRotasDisponiveis("Disponivel", "2050-01-01").subscribe(resultado => { this.rotas = resultado });
    } else {
      this.caronaService.getRotasPesquisada("Disponivel", destino, "2050-01-01").subscribe(resultado => { this.rotas = resultado });
    }
  }

  consultarCarona(verificador) {
    this.caronaService.getCarona(verificador, localStorage.getItem('usuario')).subscribe(dados => {
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

  consultarRota(verificador) {
    localStorage.setItem('verificadorRotaSelecionada', verificador);
    if (verificador != null && verificador !== '') {
      this.caronaService.getByVerificador(verificador).subscribe(dados => {
        this.carona.rota = {
          id: dados.id,
          data: dados.data,
          horario: dados.horario,
          inicio: dados.inicio,
          fim: dados.fim,
          status: dados.status,
          verificador: dados.verificador,
          veiculo: dados.veiculo,
          contribuicao: dados.contribuicao
        };
      });
    } else {
      this.carona.rota = {
        id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "",
        veiculo: { id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: null, tipo: "", capacidade: null, usuario: null },
        contribuicao: { id: null, tipo: "", valor: "" }
      };
    }

  }

  limpar() {
    this.caronaService.getRotasDisponiveis("Disponivel", "2050-01-01").subscribe(resultado => { this.rotas = resultado });
    this.consultaDestino = '';
    localStorage.removeItem('verificadorRotaSelecionada');
  }

}
