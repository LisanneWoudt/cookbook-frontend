import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../../dto/dialog-data";

@Component({
  selector: 'app-dialog-with-cancel-button',
  templateUrl: './dialog-with-cancel-button.component.html',
  styleUrls: ['./dialog-with-cancel-button.component.css']
})
export class DialogWithCancelButtonComponent implements OnInit {

  isOk = true;

  constructor(public dialogRef: MatDialogRef<DialogWithCancelButtonComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  cancel(): void {
    this.isOk = false;
    this.dialogRef.close(this.isOk);
  }

}
