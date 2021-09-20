import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  drawingCard: boolean = false; // animation

  game: Game = new Game();
  currentCard = this.game.stack.pop(); // drawn card

  constructor() { }

  ngOnInit(): void {
    this.newGame();
    console.log(this.game);
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {

    if (!this.drawingCard) { // if you arent drawing a card, only then you can draw

      this.startDrawAnimation();

      this.currentCard = this.game.stack.pop();

      setTimeout(() => {
        this.drawingCard = false;
        this.addCardToPlayedStack();
      }, 1000);

    }

  }

  /**
   * START animation & drawing phase
   * By setting 'drawingCard' true, the html element appears, because *ngIf="drawingCard". Then the Animation/Keyframe is played.
   */
  startDrawAnimation(){
    this.drawingCard = true;
  }

  /**
   * Adds the drawn currentCard to the playedCards stack
   * array to annother array
   */
  addCardToPlayedStack() {
    this.game.playedCards.push(this.currentCard!);
  }

}
