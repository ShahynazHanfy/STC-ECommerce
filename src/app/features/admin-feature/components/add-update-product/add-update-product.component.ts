import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/features/user-dashboard-feature/services/category.service';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.sass']
})
export class AddUpdateProductComponent {

  // initializations
  public productForm!: FormGroup;
  isEditMode: boolean = false;
  categoryList!: string[]
  dataSubscription!: Subscription;

  constructor(private fb: FormBuilder, private categoryService: CategoryService,
    public dialogRef: MatDialogRef<AddUpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public productToUpdate: any) { 
    this.initializeForm()
    this.getAllCategories()
    
  }
  initializeForm() {
    this.productForm = this.fb.group({
      title:      ['',[ Validators.required]],
      price:      [ 0, [ Validators.required]],
      image:      [null] ,// Image will be a string copied 
      category:   ['', [ Validators.required]],
      desciption: [''],
    });

    this.productForm.patchValue(this.productToUpdate?.productUpdated)
  }

  onSubmit() {
    const newUpdateProduct = this.productForm.value;
    if (this.productToUpdate) {
      this.isEditMode = !this.isEditMode
    }
    this.dialogRef.close({newUpdateProduct , isEditMode: this.isEditMode});
  }

  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.productForm.patchValue({ image: file });
    }
  }
  getAllCategories() {
 this.dataSubscription =   this.categoryService.getAllCategories().subscribe(res => {
      this.categoryList = res
      this.category?.setValue(res[0])
    })
  }
  // Make form controls setter
  setCategory(e: any) {
    this.category?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  // Access form controls getter
  get category() {
    return this.productForm.get('category');
  }
  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.dataSubscription.unsubscribe();
  }
}
