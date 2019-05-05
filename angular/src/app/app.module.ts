import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import {BookStoreService} from "./shared/book-store.service";
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BookFormComponent } from './book-form/book-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SearchComponent } from './search/search.component';
import {DateValueAccessorModule} from "angular-date-value-accessor";
import { LoginComponent } from './login/login.component';
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";
import { OrderAdminComponent } from './order-admin/order-admin.component';
import { OrderUserComponent } from './order-user/order-user.component';
import {AuthService}  from "./shared/authentication.service";
import {OrderService} from "./shared/order.service";
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookListItemComponent,
    BookDetailComponent,
    HomeComponent,
    BookFormComponent,
    SearchComponent,
    LoginComponent,
    OrderAdminComponent,
    OrderUserComponent,
    CartComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, DateValueAccessorModule
  ],
  providers: [BookStoreService, AuthService, OrderService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptorService,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
