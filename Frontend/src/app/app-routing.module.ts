import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { SalaComponent } from './sala/sala.component';
import { LoginComponent } from './login/login.component';
import { TemaComponent } from './tema/tema.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' } ,
  {path: 'login', component: LoginComponent} ,
  { path: 'lobby', component: LobbyComponent} ,
  { path: 'sala', component: SalaComponent } ,
  { path: 'tarjeta', component: TarjetaComponent },
  { path: 'tema', component: TemaComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
