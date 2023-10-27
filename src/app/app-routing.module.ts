import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { SalaComponent } from './sala/sala.component';

const routes: Routes = [
  { path: '', redirectTo: '/lobby', pathMatch: 'full' } ,
  { path: 'lobby', component: LobbyComponent } ,
  { path: 'sala', component: SalaComponent } ,
  { path: 'tarjeta', component: TarjetaComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  }
