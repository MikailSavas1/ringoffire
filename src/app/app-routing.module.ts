import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndScreenComponent } from './end-screen/end-screen.component';
import { GameComponent } from './game/game.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
  {path: '', component: StartScreenComponent},
  {path: 'game/:id', component: GameComponent},
  {path: 'end-screen', component: EndScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
