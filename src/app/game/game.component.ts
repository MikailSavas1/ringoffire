import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  drawingCard = false; // animation

  game: Game = new Game();
  currentCard = this.game.stack.pop(); // Frage: Wiesoo kann ich hier keine leeren Werte lassen. Und muss sie immer befükllen, dass triggert mich.

  constructor() { }

  ngOnInit(): void {
    this.newGame();
    console.log(this.game);
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {

    if (!this.drawingCard) { // if you arent drawing a card, only then execute the command/function

      this.drawingCard = true; // START animation & drawing phase

      this.currentCard = this.game.stack.pop();
      console.log(this.currentCard);

      setTimeout(() => {
        this.drawingCard = false;
      }, 1500);

    }

  }

}
