<?php

use Illuminate\Database\Seeder;

class BooksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*\Illuminate\Support\Facades\DB::table('books')->insert([
            'title' => 'Herr der Ringe',
            'isbn' => '1234567890',
            'subtitle' => 'Gollum',
            'rating' => 10,
            'description' => 'Letzter Teil der Trilogie',
            'published' => new DateTime()
        ]);*/

        $book = new \App\Book;
        $book->title = "Herr der Ringe";
        $book->isbn = '1234567890';
        $book->subtitle = 'Gollum';
        $book->rating = 10;
        $book->description = 'Letzter Teil der Trilogie';
        $book->net_price = 24.99;
        $book->published = new DateTime();


        //get the first User
        $user = \App\User::all()->first();
        $book->user()->associate($user);
        //speicher in der DB
        $book->save();

        $authors = \App\Author::all()->pluck('id');
        $book->authors()->sync($authors);

        //add images to Book
        $image1 = new \App\Image;
        $image1->title = 'Cover 1';
        $image1->url = 'https://images-na.ssl-images-amazon.com/images/I/A1B-V5xz+3L._SL260_.jpg';
        $image1->book()->associate($book);

        $image1->save();

        $image2 = new \App\Image;
        $image2->title = 'Cover 2';
        $image2->url = 'https://images-eu.ssl-images-amazon.com/images/I/61q7OaxMbQL._AC_SY200_.jpg';
        $image2->book()->associate($book);

        $image2->save();

        //update
        //$book = App\Book::find(1);
        //$book->title = "Neuer Title";
        //$book->save();
        //delete
        //$book->delete();

        //findOrCreate updateOrCreate
        //$book = App\Book::findOrCreate(['title'=>'Buchtitel'],['description'=>'Neue Beschreibung']);


        /*
        //Element in Beziehung einfügen
        $book->images()->save($image);
        $book->images()->saveMany([$image1, $image2]);

        $book->user()->associate($user1);
        $book->save();

        $book->user()->disociate($user1);
        $book->save();


        //m:n Beziehung
        $book->authors()->attach($authorId);
        $book->authors()->detach($authorId);
        //delete all authors from relationship
        $book->authors()->detach();

        $book->authors()->sync([1,2,3]);
        */
    }
}
