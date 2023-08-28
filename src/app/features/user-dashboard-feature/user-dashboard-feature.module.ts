import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardFeatureRoutingModule } from './user-dashboard-feature-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { NavCategoryComponent } from 'src/app/shared/components/nav-category/nav-category.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';


@NgModule({
  declarations: [
    UserDashboardComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    UserDashboardFeatureRoutingModule,
    NavCategoryComponent,
    NavbarComponent
  ]
})
export class UserDashboardFeatureModule { }
