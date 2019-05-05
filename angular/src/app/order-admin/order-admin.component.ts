import { Component, OnInit } from '@angular/core';
import {Order} from "../shared/order";
import {AuthService} from "../shared/authentication.service";
import {OrderService} from "../shared/order.service";

@Component({
  selector: 'bs-order-admin',
  templateUrl: './order-admin.component.html',
  styles: []
})
export class OrderAdminComponent implements OnInit {

    public orders: Order[] = new Array();

  constructor(private os: OrderService, private auth: AuthService){}

  ngOnInit() {
      this.os.getAll().subscribe(res => this.orders = res);
  }

  getOrderStatus(order){
      let statusName;
      switch (order.status_id){
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

}