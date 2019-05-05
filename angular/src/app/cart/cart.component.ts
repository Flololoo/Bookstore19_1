import { Component, OnInit } from '@angular/core';
import {Book} from "../shared/book";
import {AuthService} from "../shared/authentication.service";
import {Router} from "@angular/router";
import {OrderService} from "../shared/order.service";
import {CartService} from "../shared/cart.service";
import {BookStoreService} from "../shared/book-store.service";
import {Order} from "../shared/order";
import {State} from "../shared/state";
import {OrderFactory} from "../shared/order-factory";

@Component({
    selector: 'bs-cart',
    templateUrl: './cart.component.html',
    styles: []
})
export class CartComponent implements OnInit {

    public cartItems: Array<any>;
    public books: Book[];

    constructor(private bss: BookStoreService, private cs: CartService, private  authService: AuthService, private router: Router, private os: OrderService) {
        //this.cartBooks = cs.cartBooks;
    }

    ngOnInit() {
        this.cartItems = JSON.parse(localStorage.getItem("Cart"));
        let tmp = [];
        for(let i = 0; i < this.cartItems.length ; i++){
            this.bss.getSingle(this.cartItems[i][0]).subscribe(res => tmp[i] = res);
        }
        this.books = tmp;
    }

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }

    getCart(){
        let array = JSON.parse(localStorage.getItem("Cart"));
        console.log(array);
        return array;
    }

    removeItem(isbn){
        console.log(this);
        document.querySelector('.' + isbn)[0].style.display = 'none';
        //console.log(elem);
        let array = JSON.parse(localStorage.getItem("Cart"));
        for(let i = 0; i < array.length; i++){
            if(array[i][0] == isbn){
                console.log("fount item");
                array.splice(i, 1);
            }
        }
        console.log(array);
        localStorage.setItem('Cart', JSON.stringify(array));
    }

    itemTotalNet(price, amount){
        let totalPrice = price * amount
        return Math.round(totalPrice * 100)/100;
    }

    /*orderTotalNet(){
        let total = 0;
        for(let i = 0; i < this.books.length; i++){
            total += this.books[i].net_price * this.cartItems[i][1];
        }

        return total;
    }*/

    checkOut(){
        let userId = this.authService.getCurrentUserId();
        //console.log("buy stuff", this.books, this.cartItems, userId);
        let state: State[] = new Array(new State(100, 'Bestellung eingegangen', 0, 0));

        let total = 0;
        for(let i = 0; i < this.books.length; i++){
            total += this.books[i].net_price * this.cartItems[i][1];
        }

        let order = new Order(null, 1, '2019-05-05', total, 20, userId, this.books, state);
        let orderFactory = OrderFactory.fromObject(order);

        this.os.cartCheckout(orderFactory).subscribe(res => {
            //this.router.navigate(['./order/'+ userId]);
        });
    }
}
