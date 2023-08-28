import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LibraryConfig } from './models/model.config'
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { TokenInterceptor } from './interceptor/token.interceptor';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
 
  ],
  declarations: [
 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  exports: [
  ]
})
export class AuthenticationModule {
  static forRoot(config: LibraryConfig): ModuleWithProviders<AuthenticationModule> {
    return {
      ngModule: AuthenticationModule,
      providers: [{ provide: 'config', useValue: config }]
    };
  }
}
