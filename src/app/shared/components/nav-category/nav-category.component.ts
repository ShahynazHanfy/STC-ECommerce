import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/service-authentication/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-category',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './nav-category.component.html',
  styleUrls: ['./nav-category.component.sass']
})
export class NavCategoryComponent{

  @Input('title') title: string = 'title category';
  @Input('image') image: number = 0;
  @Input() active: boolean = false
  @Output() getClickedCategory = new EventEmitter<string>();

  constructor(private authService: AuthenticationService) { }

  categoryEmit() {
    this.getClickedCategory.emit(this.title);
  }
}
