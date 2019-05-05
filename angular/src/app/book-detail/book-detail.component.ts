
import {Component, OnInit} from '@angular/core';
import {Book} from '../shared/book';
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BookFactory} from "../shared/book-factory";
import {AuthService} from "../shared/authentication.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'bs-book-detail',
    templateUrl: './book-detail.component.html',
    styles: []
})
export class BookDetailComponent implements OnInit {
    book: Book = BookFactory.empty();

    constructor(   private bs : BookStoreService,
                   private route: ActivatedRoute,
                   private router: Router,
                   private authService: AuthService) {

    }

    ngOnInit() {
        const params = this.route.snapshot.params;
        this.bs.getSingle(params['isbn']).subscribe(b => this.book=b);
    }

    getRating(num: number){
        return new Array(num);
    }

    removeBook(){
        if(confirm('Buch wirklich löschen?')){
            this.bs.remove(this.book.isbn).subscribe(
                res => this.router.navigate(['../'], {relativeTo: this.route})
            );
        }
    }

    addToCart(){
        let e = document.querySelector( '#bookAmount') as HTMLSelectElement;
        let selected = e.options[e.selectedIndex].value;
        let isExisting = false;
        let array;
        if(localStorage.getItem('Cart') !== null){
            array = JSON.parse(localStorage.getItem("Cart"));
            for(let i = 0; i < array.length; i++){
                if(array[i][0] == this.book.isbn){
                    array[i][1] = parseInt(selected);
                    isExisting = true;
                }
            }
            if(!isExisting){
                array[array.length] = [parseInt(this.book.isbn), parseInt(selected)];
            }
        }else{
            array = [[parseInt(this.book.isbn), parseInt(selected)]];
        }
        localStorage.setItem('Cart', JSON.stringify(array));
    }
}