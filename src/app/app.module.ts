import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ManterUsuariosComponent } from './manter-usuarios/manter-usuarios.component';
import { ManterVeiculosComponent } from './manter-veiculos/manter-veiculos.component';
import { ManterRotasComponent } from './manter-rotas/manter-rotas.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManterContatosComponent } from './manter-contatos/manter-contatos.component';
import { LoginComponent } from './login/login.component';
import { ManterContribuicoesComponent } from './manter-contribuicoes/manter-contribuicoes.component';
import { ManterCaronasComponent } from './manter-caronas/manter-caronas.component';
import { ConfirmarCaronasComponent } from './confirmar-caronas/confirmar-caronas.component';
import { LoginGuardGuard } from './login/login-guard.guard';
import { RecuperarContaComponent } from './recuperar-conta/recuperar-conta.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ManterUsuariosComponent,
    ManterVeiculosComponent,
    ManterRotasComponent,
    ManterContatosComponent,
    LoginComponent,
    ManterContribuicoesComponent,
    ManterCaronasComponent,
    ConfirmarCaronasComponent,
    RecuperarContaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LoginGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
