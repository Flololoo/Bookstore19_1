<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('user/{id}', 'OrderController@findByUserId');


Route::get('books', 'BookController@index');
Route::get('book/{isbn}', 'BookController@findByISBN');
Route::get('book/checkisbn/{isbn}', 'BookController@checkISBN');
Route::get('book/checkisbn/{isbn}', 'BookController@checkISBN');
Route::get('book/search/{searchTerm}', 'BookController@findBySearchTerm');
Route::get('order-admin', 'OrderController@getAll');
Route::get('order-user/{user_id}', 'OrderController@getUser');

Route::post('order','OrderController@newOrder');
Route::post('newUser','UserController@save');
Route::post('newState','OrderController@newState');

Route::group(['middleware' => ['api','cors', 'jwt.auth']], function (){
    Route::post('book', 'BookController@save');
    Route::put('book/{isbn}', 'BookController@update');
    Route::delete('book/{isbn}', 'BookController@delete');
    Route::post('auth/logout','Auth\ApiAuthController@logout');
});

Route::group(['middleware' => ['api','cors']], function (){
    Route::post('auth/login','Auth\ApiAuthController@login');
});