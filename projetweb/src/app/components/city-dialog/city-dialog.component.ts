import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-city-dialog',
  templateUrl: './city-dialog.component.html',
})
export class CityDialogComponent {
  cityForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.cityForm = this.fb.group({
      cityName: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
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
