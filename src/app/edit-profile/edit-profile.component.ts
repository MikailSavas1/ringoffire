import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { SaveService } from '../save.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  currentGame: Game;
  indexNo: any;
  currentGameId: any;


  constructor(public saveserv: SaveService) { }

  ngOnInit(): void {
    console.log('variable game was given trhough dialogRef. Thanks Mihai. Now this Diolog component has the same data of the game. ',this.currentGame);
  }

  // deletePlayer(){
  //   this.currentGame.players.splice(this.indexNo, 1);
  //   this.saveserv.saveGame(this.currentGameId, this.currentGame);
  // }
}
