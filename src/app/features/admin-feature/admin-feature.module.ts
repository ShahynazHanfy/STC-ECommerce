import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFeatureRoutingModule } from './admin-feature-routing.module';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { NavCategoryComponent } from 'src/app/shared/components/nav-category/nav-category.component';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { AddUpdateProductComponent } from './components/add-update-product/add-update-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TableProductsComponent } from 'src/app/shared/components/table-products/table-products.component';

@NgModule({
  declarations: [
    AllProductsComponent,
    AddUpdateProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminFeatureRoutingModule,
    PaginationComponent,
    NavCategoryComponent,   // standalone component
    NavbarComponent,       // standalone component
    MatDialogModule,
    TableProductsComponent, // standalone component
     DeleteModalComponent,

  ]
})
export class AdminFeatureModule { }
