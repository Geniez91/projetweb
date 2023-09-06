import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-city-dialog',
  templateUrl: './city-dialog.component.html',
})
export class CityDialogComponent {
  public cityForm: FormGroup;
  public isUpdate: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.cityForm = this.fb.group({
      cityName: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });

    if (data) {
      this.isUpdate = true;
      this.cityForm.setValue({
        cityName: this.data.id,
        imageUrl: this.data.img,
      });
    }
  }

  onSubmit(): void {
    if (this.cityForm.valid) {
      const cityName = this.cityForm.get('cityName')?.value;
      const imageUrl = this.cityForm.get('imageUrl')?.value;

      const cityData = { id: cityName, img: imageUrl };

      this.dialogRef?.close(cityData);
    }
  }
}
