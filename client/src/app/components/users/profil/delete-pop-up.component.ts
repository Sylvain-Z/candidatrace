import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-pop-up',
  standalone: true,
  imports: [],
  template: `
    
    <h3 mat-dialog-title>Supprimer le compte ?</h3>
    <div mat-dialog-content>
      <p>{{ data }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="closePopup(false)">Annuler</button>
      <button mat-button (click)="closePopup(true)">Confirmer</button>
    </div>

  `,
})
export class DeletePopUpComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<DeletePopUpComponent>
  ) { }

  closePopup(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }

}
