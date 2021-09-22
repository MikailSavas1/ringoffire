import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-new-player',
  templateUrl: './dialog-add-new-player.component.html',
  styleUrls: ['./dialog-add-new-player.component.scss']
})
export class DialogAddNewPlayerComponent implements OnInit {

  name: string = '';

  constructor(public dialogRef: MatDialogRef<DialogAddNewPlayerComponent>){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
