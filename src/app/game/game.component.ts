import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  drawingCard = false;
  game: Game = new Game();

  constructor() { }

  ngOnInit(): void {
    this.newGame();
    console.log(this.game);
  }

  /**
   * creates new game object
   */
  newGame(){
    this.game = new Game();
  }

  /**
   * sets 'drawingCard' true -> in html appears card; to be more precise the img. With *ngIf
   */
  takeCard() {
    this.drawingCard = true;
  }

}
