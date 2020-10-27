import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmarCaronasComponent } from './confirmar-caronas/confirmar-caronas.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManterCaronasComponent } from './manter-caronas/manter-caronas.component';
import { ManterContatosComponent } from './manter-contatos/manter-contatos.component';
import { ManterContribuicoesComponent } from './manter-contribuicoes/manter-contribuicoes.component';
import { ManterRotasComponent } from './manter-rotas/manter-rotas.component';
import { ManterUsuariosComponent } from './manter-usuarios/manter-usuarios.component';
import { ManterVeiculosComponent } from './manter-veiculos/manter-veiculos.component';

const routes: Routes = [
  //{ path: "", pathMatch: "full", redirectTo: "login" },
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "manter-usuários", component: ManterUsuariosComponent },
  { path: "manter-veículos", component: ManterVeiculosComponent },
  { path: "manter-rotas", component: ManterRotasComponent },
  { path: "manter-contatos", component: ManterContatosComponent},
  { path: "manter-contribuições", component: ManterContribuicoesComponent},
  { path: "manter-caronas", component: ManterCaronasComponent },
  { path: "confirmar-caronas", component: ConfirmarCaronasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
