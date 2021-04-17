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
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ColorPickerModule } from 'primeng/colorpicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderModule } from 'primeng/slider';
import { BuscarCaronasComponent } from './buscar-caronas/buscar-caronas.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

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
    RecuperarContaComponent,
    BuscarCaronasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InputMaskModule,
    InputTextModule,
    PasswordModule,
    DropdownModule,
    ToolbarModule,
    ButtonModule,
    RadioButtonModule,
    InputNumberModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    SliderModule,
    TableModule,
    ToastModule
  ],
  providers: [LoginGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
