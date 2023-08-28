import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private fakeApi = 'https://fakestoreapi.com';

  // private itemsSubject = new BehaviorSubject<any[]>([]);
  // public items$: Observable<Product[]> = this.itemsSubject.asObservable();
  private dataSubject = new BehaviorSubject<any[]>([]);
  private itemsPerPage = 10; // Adjust as needed
  private currentPage = 1;

  constructor(private http: HttpClient) {
    this.setData()
  }

  getAllProducts(): Observable<any> {
    return this.http
      .get<Product>(`${this.fakeApi}/products`)
      .pipe(take(1));
  }

   setData() {
    this.getAllProducts().subscribe(res=>{
      this.dataSubject.next(res);
    })
  }

  getDataObservable() {
    return this.dataSubject.asObservable();
  }

  getPageData(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.dataSubject.value.slice(startIndex, endIndex);
  }

  
  addItem(item: any) {
    const currentData = this.dataSubject.value;
    currentData.push(item);
    this.dataSubject.next(currentData);
    console.log("all data",currentData)
  }

  updateItem(index: number, updatedItem: Product) {

    const currentData = this.dataSubject.value;
    if (index >= 0 && index < currentData.length) {
      currentData[index-1] = updatedItem;
      this.dataSubject.next(currentData);
    console.log("currentData in service",currentData,index)

    }
  }

  deleteItem(index: number) {
    const currentData = this.dataSubject.value;
    if (index >= 0 && index < currentData.length) {
      currentData.splice(index, 1);
      this.dataSubject.next(currentData);
    }
  }
  getTotalPages() {
    return Math.ceil(this.dataSubject.value.length / this.itemsPerPage);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  getCurrentPage() {
    return this.currentPage;
  }

}