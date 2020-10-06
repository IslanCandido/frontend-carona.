import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManterContatosComponent } from './manter-contatos/manter-contatos.component';
import { ManterContribuicoesComponent } from './manter-contribuicoes/manter-contribuicoes.component';
import { ManterRotasComponent } from './manter-rotas/manter-rotas.component';
import { ManterUsuariosComponent } from './manter-usuarios/manter-usuarios.component';
import { ManterVeiculosComponent } from './manter-veiculos/manter-veiculos.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "manter-usuários", component: ManterUsuariosComponent },
  { path: "manter-veículos", component: ManterVeiculosComponent },
  { path: "manter-rotas", component: ManterRotasComponent },
  { path: "manter-contatos", component: ManterContatosComponent},
  { path: "manter-contribuições", component: ManterContribuicoesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
