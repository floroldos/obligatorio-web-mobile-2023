import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';

const routes: Routes = [
  {path : '', component : TarjetaComponent} ,
  {path : 'home', component : TarjetaComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
