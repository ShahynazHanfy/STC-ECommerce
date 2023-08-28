import { Component, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { AuthenticationService } from 'src/app/core/services/service-authentication/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateProductComponent } from '../add-update-product/add-update-product.component';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { Product } from '../../models/product';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.sass']
})
export class AllProductsComponent implements OnDestroy{
  totalPages!: number;
  currentPage!: number;
  productList: any[] = [];
  dataSubscription!: Subscription;

  constructor(private productService: ProductsService, public dialog: MatDialog, private toaster: ToasterService) {
    this.getAllProducts()
  }

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }
  getAllProducts() {
   this.dataSubscription = this.productService.getDataObservable().subscribe(data => {
      this.productList = data;
    });
  }

  updateItem(index: number, updatedItem: any) {
    this.productService.updateItem(index, updatedItem);
  }

  deleteProduct(index: number) {
    this.productService.deleteItem(index);
  }

  // load all products when page initiated
  loadPage(page: any) {
    this.productList = this.productService.getPageData(page);
  }
  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.dataSubscription.unsubscribe();
  }

}