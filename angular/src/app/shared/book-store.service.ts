import { Injectable } from '@angular/core';
import {Author, Book, Image} from "../shared/book";
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError, retry} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

    books: Book[];
    private api = "http://bookstore19.s1610456023.student.kwmhgb.at/api";

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<Array<Book>>{
      return this.http.get(`${this.api}/books`).
          pipe(retry(3)).pipe(catchError((this.errorHandler)));
  }

  getSingle(isbn):Observable<Book>{
      return this.http.get(`${this.api}/book/${isbn}`).
      pipe(retry(3)).pipe(catchError((this.errorHandler)));
  }

  create(book:Book):Observable<any> {
      return this.http.post(`${this.api}/book`,book).
      pipe(retry(3)).pipe(catchError((this.errorHandler)));
  }
  update(book:Book):Observable<any> {
      return this.http.put(`${this.api}/book/${book.isbn}`,book).
      pipe(retry(3)).pipe(catchError((this.errorHandler)));
  }

  remove(isbn:string):Observable<any> {
      return this.http.delete(`${this.api}/book/${isbn}`).
      pipe(retry(3)).pipe(catchError((this.errorHandler)));
  }

  private errorHandler(error: Error | any): Observable<any>{
      return throwError(error);
  }

  getAllSearch(searchTerm:string):Observable<Array<Book>>{
      return this.http.get(`${this.api}/book/search/${searchTerm}`).
      pipe(retry(3)).pipe(catchError((this.errorHandler)));
  }

}
