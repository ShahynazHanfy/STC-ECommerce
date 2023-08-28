import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoaderComponent } from "./components/loader/loader.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoaderInterceptorService } from "../core/interceptor/loader.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NotFoundComponent } from './components/not-found/not-found.component';

//Angular Material
import {MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TranslateModule } from "@ngx-translate/core";

export const Shared = [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    TranslateModule
  ];
  
  export const sharedComponents = [
    LoaderComponent,
    
  ];
  
  export const sharedDirectives = [

  ];
  
  @NgModule({
    declarations: [
      sharedComponents,
      sharedDirectives,
      NotFoundComponent,
      
    ],
    imports: [CommonModule, Shared, FormsModule],
    exports: [Shared, sharedComponents, sharedDirectives, 
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: LoaderInterceptorService,
        multi: true,
      },
    ],
  })
  export class SharedModule { }
  
  