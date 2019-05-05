<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //test user
        $user = new \App\User;
        $user->name="testuser";
        $user->email = "test@gmail.com";
        $user->firstname = "John";
        $user->lastname = "Doe";
        $user->is_admin = false;
        $user->address = "Wohnadresse 42";
        $user->password = bcrypt('secret');
        $user->save();

        //test admin
        $user = new \App\User;
        $user->name="admin";
        $user->email = "admin@gmail.com";
        $user->is_admin = true;
        $user->password = bcrypt('admin');
        $user->save();
    }
}
