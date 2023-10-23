import { NgModule, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalaComponent } from './sala/sala.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { LobbyComponent } from './lobby/lobby.component';
import { LoginInterceptor } from './login.interceptor';
import { FormsModule } from '@angular/forms';
import { TarjetaService } from './tarjeta.service';

@NgModule({
  declarations: [
    AppComponent,
    SalaComponent,
    TarjetaComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [LoginInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
