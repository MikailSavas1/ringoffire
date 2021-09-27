import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';

import { MatDialog } from '@angular/material/dialog';
import { DialogAddNewPlayerComponent } from '../dialog-add-new-player/dialog-add-new-player.component';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game;
  gameId: string;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();

    this.route.params.subscribe((params) => {
      this.gameId = params.id;

      // link to firestore database, that loads the data of the ID.
      this.firestore
        .collection('games')
        .doc(params.id)
        .valueChanges()
        .subscribe((game: any) => {
          console.log(`Game update`, game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.currentCard = game.currentCard;
          this.game.drawingCard = game.drawingCard;
        })
    })
  }

  newGame() {
    this.game = new Game();
  }

  /**
   * updates the object in the firebase database - collection "games"
   * really important to understand is once its updated the function of onInit -> subscribe is still effected
   * That inits the game variables, so that runs the game
   */
  saveGame() {
    this.firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }

  takeCard() {

    if (!this.game.drawingCard) { // if you arent drawing a card, only then you can draw

      this.startDrawAnimation();

      this.game.currentCard = this.game.stack.pop(); // drawing card from stack
      this.saveGame();

      this.nextPlayer();

      setTimeout(() => {
        this.game.drawingCard = false;
        this.addCardToPlayedStack();
        this.saveGame();
      }, 1000);

    }

  }

  nextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();
  }

  /**
   * START animation & drawing phase
   * By setting 'game.drawingCard' true, the html element appears, because *ngIf="game.drawingCard". Then the Animation/Keyframe is played.
   */
  startDrawAnimation() {
    this.game.drawingCard = true;
  }

  /**
   * Adds the drawn game.currentCard to the playedCards stack
   * array to annother array
   */
  addCardToPlayedStack() {
    this.pushIntoArray(this.game.playedCards, this.game.currentCard);
  }

  pushIntoArray(array: any[], elementValue: any) {
    array.push(elementValue);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddNewPlayerComponent);

    dialogRef.afterClosed().subscribe((nameOfInputfield: string) => {
      console.log('The dialog was closed');
      if (nameOfInputfield && nameOfInputfield.length > 0)
        this.pushIntoArray(this.game.players, nameOfInputfield);
        this.saveGame();
    });
  }
}
