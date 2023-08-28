import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthEndPointInterceptor } from './core/interceptor/auth-end-point.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthenticationModule } from './core/authentication.module';
import { TableProductsComponent } from './shared/components/table-products/table-products.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export const AUTHENTICATION_CONFIG = {
  authEndpoint: '/users/authenticate',
  AdminPage: 'AdminPanel',
  userPage: 'UserDashboard',
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableProductsComponent,
    TranslateModule,
    AuthenticationModule.forRoot(AUTHENTICATION_CONFIG),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
    }),
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthEndPointInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}