import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-add-new-player',
  templateUrl: './dialog-add-new-player.component.html',
  styleUrls: ['./dialog-add-new-player.component.scss']
})
export class DialogAddNewPlayerComponent implements OnInit {

  name: string;

  constructor(){}

  onNoClick(): void {
  }

  ngOnInit(): void {
  }

}
