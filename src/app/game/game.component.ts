import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';

import { MatDialog } from '@angular/material/dialog';
import { DialogAddNewPlayerComponent } from '../dialog-add-new-player/dialog-add-new-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  drawingCard: boolean = false; // animation

  game: Game;
  currentCard: string; // drawn card

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {

    if (!this.drawingCard) { // if you arent drawing a card, only then you can draw

      this.startDrawAnimation();

      this.currentCard = this.game.stack.pop(); // drawing card from stack

      this.nextPlayer();

      setTimeout(() => {
        this.drawingCard = false;
        this.addCardToPlayedStack();
      }, 1000);

    }

  }

  nextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }

  /**
   * START animation & drawing phase
   * By setting 'drawingCard' true, the html element appears, because *ngIf="drawingCard". Then the Animation/Keyframe is played.
   */
  startDrawAnimation() {
    this.drawingCard = true;
  }

  /**
   * Adds the drawn currentCard to the playedCards stack
   * array to annother array
   */
  addCardToPlayedStack() {
    this.pushIntoArray(this.game.playedCards, this.currentCard);
  }

  pushIntoArray(array: any[], elementValue: any) {
    array.push(elementValue);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddNewPlayerComponent);

    dialogRef.afterClosed().subscribe(nameOfInputfield => {
      console.log('The dialog was closed');
      this.pushIntoArray(this.game.players, nameOfInputfield);
    });
  }

}
