import {Component, Input} from "@angular/core";
import {MdDialogRef} from "@angular/material";
@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './dialog-result-example-dialog.html',
})
export class DialogResultExampleDialog {
  @Input() test: string;

  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {
  }
}


/**  Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license */
