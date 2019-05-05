import { Component, OnInit } from '@angular/core';
import {Order} from "../shared/order";
import {AuthService} from "../shared/authentication.service";
import {OrderService} from "../shared/order.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {StateFactory} from "../shared/state-factory";
import {State} from "../shared/state";

@Component({
  selector: 'bs-order-admin',
  templateUrl: './order-admin.component.html',
  styles: []
})
export class OrderAdminComponent implements OnInit {
    stateForm: FormGroup;
    state = StateFactory.empty();

    public orders: Order[] = new Array();

  constructor(private os: OrderService, private fb: FormBuilder){}

  ngOnInit() {
      this.os.getAll().subscribe(res => this.orders = res);
      this.submitForm();
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
    submit(bookId){
        let stateJSON = {
            "comment": this.stateForm.value.comment,
            "status": parseInt(this.stateForm.value.status),
            "order_id":bookId
        };
        const state: State = StateFactory.fromObject(stateJSON);

        this.os.newState(state).subscribe(res => {
        });
    }

    submitForm(){
        this.stateForm = this.fb.group({
            status: this.state.status,
            comment: this.state.comment,
        });
    }
}