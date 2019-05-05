import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError, of} from "rxjs";
import { ajax } from 'rxjs/ajax';
import {catchError, retry, map} from "rxjs/internal/operators";
import {Order} from "./order";
import {Book} from "./book";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

    private api= "http://bookstore19.s1610456023.student.kwmhgb.at/api";


    cartCheckout(order: Order): Observable<Array<any>>{
        console.log(order);
        return this.http.post(`${this.api}/order`, order).pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

  getAll(): Observable<Array<Order>>{
      //return this.http.get(`${this.api}/order-admin`);

      return this.http.get(`${this.api}/order-admin`)
          .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getUserOrders(user_id: number): Observable<Array<Order>>{
      return this.http.get(`${this.api}/order-user/${user_id}`)
          .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

    private errorHandler(error: Error | any): Observable<any> {
        return throwError(error);
    }
}
