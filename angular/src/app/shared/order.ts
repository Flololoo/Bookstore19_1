

import {Book} from "./book";
import {State} from "./state";

export class Order {
    constructor(
        public id: number,
        public status_id: number,
        public order_date: string,
        public total_price: number,
        public vat: number,
        public user_id: number,
        public books: Book[],
        public states: State[],
    ){}
}
