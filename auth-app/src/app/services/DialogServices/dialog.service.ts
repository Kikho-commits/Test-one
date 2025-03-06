import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../components/dialog/ConfirmationDialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService { 
  constructor(private dialog: MatDialog) {}

  confirmAction(message: string, action: () => void): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        action();
      }
    });
  }
}