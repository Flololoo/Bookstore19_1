import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

    private api= "http://bookstore19.s1610456023.student.kwmhgb.at/api";

    constructor(private auth: AuthService, private http: HttpClient) {
    }
}
