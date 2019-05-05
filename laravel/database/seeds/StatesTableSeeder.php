<?php

use Illuminate\Database\Seeder;

class StatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //test Status
        $status = new \App\State;
        $status->comment = "Status wurde geändert";
        $status->status = 0;
        $status->order_id = 1;

        $status->save();
    }
}
