import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../models/game';

import { MatDialog } from '@angular/material/dialog';
import { DialogAddNewPlayerComponent } from '../dialog-add-new-player/dialog-add-new-player.component';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { SaveService } from '../save.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public game: Game;
  gameId: string;
  gameOver: boolean = false;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog, private router: Router, public saveserv: SaveService) { }

  ngOnInit(): void {
    
    this.newGame();

    // activated-route parameter
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
          this.game.nonePlayerRegistered = game.nonePlayerRegistered;
        },
          (error) => {
            console.log(error);
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

    if (this.game.nonePlayerRegistered) {
      this.openDialog();
      console.log('Please add a player');
    } else {
      if (!this.gameisOver()) {
        if (!this.game.drawingCard) { // if you arent drawing a card, only then you can draw
          this.startDrawAnimation();
          this.game.currentCard = this.game.stack.pop(); // drawing card from stack
          // this.saveGame();
          this.nextPlayer();
          this.saveserv.saveGame(this.gameId, this.game);
          setTimeout(() => {
            this.game.drawingCard = false;
            this.addCardToPlayedStack();
            this.saveGame();
          }, 1000);
        }
      } else {
        this.gameOver = true;
        this.router.navigateByUrl('/end-screen');
      }
    }
  }

  gameisOver(): boolean {
    return this.game.stack.length == 0;
  }

  nextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
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
      if (nameOfInputfield && nameOfInputfield.length > 0) {
        this.pushIntoArray(this.game.players, nameOfInputfield);
        // this.saveGame();
        this.game.nonePlayerRegistered = false;
        this.saveGame();
      }
    });
  }

  editProfile(indexNo: number) {
    console.log(this.game.players[indexNo] + ` wurde ausgewählt`);
    const dialogRef = this.dialog.open(EditProfileComponent);
    dialogRef.componentInstance.currentGame = this.game;
    dialogRef.afterClosed().subscribe((change: any) => {
      if (change == "delete") {
        if (this.game.currentPlayer > 0 && indexNo < this.game.currentPlayer) {
          this.game.currentPlayer--;
        }
        if (this.game.currentPlayer == (this.game.players.length - 1)) {
          this.game.currentPlayer = 0;
        }
        this.game.players.splice(indexNo, 1);
        if (this.game.players.length == 0) {
          this.game.nonePlayerRegistered = true;
          this.game.currentPlayer = 0;
        }
        this.saveGame();
      }
    });
  }
}
