import {Injectable} from '@angular/core';
import {isNullOrUndefined} from "util";
import {HttpClient} from "@angular/common/http";
import * as decode from 'jwt-decode';
import {Observable, throwError} from "rxjs/index";
import {catchError, retry} from "rxjs/operators";

//npm install --save-dev jwt-decode

interface User {
    result: {
        created_at: Date,
        email: string,
        id: number,
        name: string,
        updated_at: Date
    }
}

@Injectable()
export class AuthService {

    private api:string = 'http://bookstore19.s1610456023.student.kwmhgb.at//api/auth';//'http://localhost:8080/api/auth';
    private apiGetUser:string = 'http://bookstore19.s1610456023.student.kwmhgb.at/api';//'http://localhost:8080/api/auth';

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string ) {
        return this.http.post(`${this.api}/login`, {'email': email, 'password': password});
    }

    public setCurrentUserId(){
        this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res =>{
                localStorage.setItem('userId', res.result.id.toString());
            }
        );
    }

    public getCurrentUserId(){
        return Number.parseInt(localStorage.getItem('userId'));
    }

    public getUser(): Observable<any> {
        let userId = Number.parseInt(localStorage.getItem('userId'));
        return this.http.get(`${this.apiGetUser}/user/${userId}`);
    }

    public setLocalStorage(token: string) {
        const decodedToken = decode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', decodedToken.user.id);
        localStorage.setItem('is_admin', decodedToken.user.is_admin);
    }

    logout() {
        this.http.post(`${this.api}/logout`, {});
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("is_admin");
    }

    public isLoggedIn() {
        return !isNullOrUndefined(localStorage.getItem("token"));
    }

    public isAdmin() {
        let state: number = Number.parseInt(localStorage.getItem('is_admin'));
        return state === 1;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    private errorHandler(error: Error | any): Observable<any> {
        return throwError(error);
    }
}