import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 private fakeApi='https://fakestoreapi.com/products/categories'
 
  constructor(private htpClient:HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.htpClient
      .get<any>(`${this.fakeApi}`)
      .pipe(take(1));
  }
  getProductsByCategoryName(categoryName:string): Observable<any> {
    return this.htpClient
      .get<any>(`https://fakestoreapi.com/products/category/${categoryName}`)
      .pipe(take(1));
  }
}
