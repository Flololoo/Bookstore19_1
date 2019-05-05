
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../shared/book";
import {AuthService} from "../shared/authentication.service";

@Component({
    selector: 'bs-home',
    templateUrl: './home.component.html',
    styles: []
})
export class HomeComponent implements OnInit {

    constructor(private router:Router, private route: ActivatedRoute, private authService: AuthService){
    }

    ngOnInit() {
       this.getUser();
    }

    bookSelected(book:Book){
        this.router.navigate(['../books', book.isbn],
            {relativeTo:this.route});
    }

    getUser(){
        let result;
        this.authService.getUser().subscribe(res => {result = res;
            let content;
            if(res[0].is_admin){
                content = `
                <div> ${res[0].name} </div>
            `;
            }else{
                content = `
                <div> ${res[0].name} </div>
                <div> ${res[0].firstname} </div>
                <div> ${res[0].lastname} </div>
                <div> ${res[0].address} </div>
            `;
            }
            document.querySelector('#user').innerHTML = content;
        });
    }
}