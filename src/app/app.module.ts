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
    ManterCaronasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
