import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarCaronasComponent } from './buscar-caronas/buscar-caronas.component';
import { ConfirmarCaronasComponent } from './confirmar-caronas/confirmar-caronas.component';
import { HomeComponent } from './home/home.component';
import { LoginGuardGuard } from './login/login-guard.guard';
import { LoginComponent } from './login/login.component';
import { ManterCaronasComponent } from './manter-caronas/manter-caronas.component';
import { ManterContatosComponent } from './manter-contatos/manter-contatos.component';
import { ManterContribuicoesComponent } from './manter-contribuicoes/manter-contribuicoes.component';
import { ManterRotasComponent } from './manter-rotas/manter-rotas.component';
import { ManterUsuariosComponent } from './manter-usuarios/manter-usuarios.component';
import { ManterVeiculosComponent } from './manter-veiculos/manter-veiculos.component';
import { RecuperarContaComponent } from './recuperar-conta/recuperar-conta.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent },
  { path: "recuperar-conta", component: RecuperarContaComponent },
  { path: "home", component: HomeComponent, canActivate: [LoginGuardGuard] },
  { path: "manter-usuários", component: ManterUsuariosComponent },
  { path: "manter-veículos", component: ManterVeiculosComponent, canActivate: [LoginGuardGuard] },
  { path: "manter-rotas", component: ManterRotasComponent, canActivate: [LoginGuardGuard] },
  { path: "manter-contatos", component: ManterContatosComponent},
  { path: "manter-contribuições", component: ManterContribuicoesComponent, canActivate: [LoginGuardGuard] },
  { path: "manter-caronas", component: ManterCaronasComponent, canActivate: [LoginGuardGuard] },
  { path: "buscar-caronas", component: BuscarCaronasComponent, canActivate: [LoginGuardGuard] },
  { path: "confirmar-caronas", component: ConfirmarCaronasComponent, canActivate: [LoginGuardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
