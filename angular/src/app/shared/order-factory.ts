import {Order} from "./order";

export class OrderFactory {
    static empty(): Order{
        return new Order(
            null,
            null,
            '1970-01-01',
            0,
            0,
            0,
            null,
            [
                {
                    id: null,
                    comment: '',
                    status: 0,
                    order_id: 0,
                }
            ]
        );
    }

    static fromObject(rawOrder: any): Order {
        return new Order(
            rawOrder.id,
            rawOrder.status_id,
            rawOrder.order_date,
            rawOrder.total_price,
            rawOrder.vat,
            rawOrder.user_id,
            rawOrder.books,
            rawOrder.states,
        );
    }
}
