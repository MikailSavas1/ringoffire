import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor(public firestore: AngularFirestore) { }

  saveGame(gameId, game) {
    this.firestore
      .collection('games')
      .doc(gameId)
      .update(game.toJson());
  }

}
