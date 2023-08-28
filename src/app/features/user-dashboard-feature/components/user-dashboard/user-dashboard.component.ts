import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Product } from 'src/app/features/admin-feature/models/product';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.sass']
})
export class UserDashboardComponent implements OnInit {
  categoryList!: string[]
  catProductList!: Product[]
  eventData: any;
  activeCard = 0;
  constructor(private categoryService: CategoryService) {

  }
  ngOnInit(): void {
    this.getAllCategories()
  }
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categoryList = res
      this.getProductByCategory(this.categoryList[0])
    })
  }
  getCategoryClicked(catName: string, i: number) {
    this.activeCard = i
    this.getProductByCategory(catName)
  }
  getProductByCategory(catName: string) {
    this.categoryService.getProductsByCategoryName(catName).subscribe(res => {
      this.catProductList = res
    })
  }
}
