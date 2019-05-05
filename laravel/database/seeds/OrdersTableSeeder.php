<?php

use Illuminate\Database\Seeder;

class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //test Order
        $order = new \App\Order;
        $order->status_id = 0;
        $order->order_date = new DateTime();
        $order->total_price = 100;
        $order->vat = 20;
        $order->user_id = 2;

        $order->save();
    }
}
