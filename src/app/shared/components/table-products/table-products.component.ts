
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddUpdateProductComponent } from 'src/app/features/admin-feature/components/add-update-product/add-update-product.component';
import { Product } from 'src/app/features/admin-feature/models/product';
import { ProductsService } from 'src/app/features/admin-feature/services/products/products.service';
import { ToasterService } from '../../services/toaster/toaster.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-table-products',
  styleUrls: ['./table-products.component.sass'],
  templateUrl: './table-products.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, DeleteModalComponent, TranslateModule],
})
export class TableProductsComponent implements AfterViewInit {
  displayedColumns: string[] = ['image', 'title', 'price', 'description', 'actions'];
  isEditMode:boolean = false
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  @Input() items: any[] = [];

  // for trackBy to improve performance
  identify(index: number, item: any) {
    return item.id;
  }
  totalPages!: number;
  currentPage!: number;
  dataSubscription!: Subscription;
  productList: any[] = [];
  public dataSource = new MatTableDataSource<Product>(this.productList);

  constructor(private productService: ProductsService, public translate: TranslateService,
    public dialog: MatDialog, private toaster: ToasterService) {
    this.getAllProducts()
  }

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }
  getAllProducts() {
    this.dataSubscription = this.productService.getDataObservable().subscribe(data => {
      this.productList = data;
      this.dataSource = new MatTableDataSource<Product>(this.productList)
    });
  }

  updateItem(index: number, updatedItem: any) {
    this.productService.updateItem(index, updatedItem);
  }

  deleteProduct(index: number) {
    this.productService.deleteItem(index);
  }

  changePage(page: number) {
    this.productService.setCurrentPage(page);
  }

  // load all products when page initiated
  loadPage(page: any) {
    this.productList = this.productService.getPageData(page);
  }

  // open modal dialog for add or edit product
  openAddProductModal(productAdded?: Product | any) {
    this.isEditMode = false
    const dialogRef = this.dialog.open(AddUpdateProductComponent, {
      data: { productAdded } //i will send product incase i want to update
    });
    dialogRef.afterClosed().subscribe(newProduct => {
      if (newProduct) {
        const { AddedProduct, isEditMode } = newProduct;
        this.productService.addItem(AddedProduct);
      }
    });
  }

  // open modal dialog for add or edit product
  openEditProductModal(productUpdated?: Product | any) {
    this.isEditMode = true
    const dialogRef = this.dialog.open(AddUpdateProductComponent, {
      data: { productUpdated }
      //i will send product incase i want to update
    });

    dialogRef.afterClosed().subscribe(newUpdateProduct => {
      if (newUpdateProduct) {
        // i will send product id that i have sent before
        this.productService.updateItem(productUpdated?.id, newUpdateProduct.newUpdateProduct);
      }
    });
  }
  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.dataSubscription.unsubscribe();
  }
}




