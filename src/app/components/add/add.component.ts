
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { FsDialogModule } from '@firestitch/dialog';
import { FsFormModule } from '@firestitch/form';

import { of } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatDialogModule,
    FsFormModule,
    FsDialogModule
],
})
export class AddComponent {
  private _data = inject(MAT_DIALOG_DATA);
  private _dialogRef = inject<MatDialogRef<AddComponent>>(MatDialogRef);


  public close(value?): void {
    this._dialogRef.close(value);
  }

  public save = () => {
    return of(true)
      .pipe(
        tap((response) => {
          this._dialogRef.close(response);
        }),
      );
  };

}
