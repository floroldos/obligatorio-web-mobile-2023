import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { SalaComponent } from './sala/sala.component';

const routes: Routes = [
<<<<<<< HEAD
  {path : '', component : LobbyComponent} ,
  {path : 'home', component : LobbyComponent}
=======
  {path : '', component : SalaComponent} ,
  {path : 'home', component : TarjetaComponent}
>>>>>>> bbc32cde8c9e74933caf9acd0789344f239ea48f
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
