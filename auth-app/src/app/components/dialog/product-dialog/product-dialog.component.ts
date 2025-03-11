import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../models/auth.models';
import { MatDialogModule } from '@angular/material/dialog'; // For dialog structure
import { MatFormFieldModule } from '@angular/material/form-field'; // For mat-form-field
import { MatInputModule } from '@angular/material/input'; // For matInput
import { MatButtonModule } from '@angular/material/button'; // For mat-button and mat-raised-button
import { ReactiveFormsModule } from '@angular/forms'; // For reactive forms

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css'],
  standalone: true,
  imports: [
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class ProductDialogComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product | null }
  ) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]],
      supplierName: ['', Validators.required],
    });

    if (this.data.product) {
      this.productForm.patchValue(this.data.product);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productNameControl = this.productForm.get('productName');
      const supplierNameControl = this.productForm.get('supplierName');

      if (productNameControl?.value) {
        productNameControl.setValue(productNameControl.value.trim());
      }
      if (supplierNameControl?.value) {
        supplierNameControl.setValue(supplierNameControl.value.trim());
      }

      this.dialogRef.close(this.productForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}