import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../shared/order";
import {OrderService} from "../shared/order.service";
import {AuthService} from "../shared/authentication.service";

@Component({
  selector: 'bs-order-user',
  templateUrl: './order-user.component.html',
  styles: []
})
export class OrderUserComponent implements OnInit {

    public orders: Order[] = new Array();

    constructor(private os: OrderService, private route: ActivatedRoute){}

    ngOnInit() {
        const params = this.route.snapshot.params;
        this.os.getUserOrders(params['user_id']).subscribe((res) => {this.orders = res; console.log(this.orders);});
    }

    getOrderStatus(order){
        let statusName;
        switch (order){
            case 0:
                statusName = 'Offen';
                break;
            case 1:
                statusName = 'Bezahlt';
                break;
            case 2:
                statusName = 'Gesendet';
                break;
            case 3:
                statusName = 'Storniert';
                break;
            default:
                statusName = 'invalid status id';
                break;
        }
        return statusName;
    }
    totalPrice(net, vat){
        return net * (1 + (vat/100));
    }

}
