<?php

namespace App\Http\Controllers;

use App\Order;
use App\State;
use App\Book;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    //
    public function getAll(){
        $order = Order::all();
        return $order;
    }

    //GET: orders/user/{id}
    /*public function findByUserId(string $userId) {
        $ordersOfUser = Order::with(['states', 'books'])->where('user_id', $userId)->get();
        return $ordersOfUser;
    }*/

    public function getUser(string $user_id){
        $orders = Order::with(['states', 'books'])->where('user_id', $user_id)->get();
        return $orders;
    }

    private function parseRequest(Request $request) : Request {
        // get date and convert it - its in ISO 8601, e.g. "2018-01-01T23:00:00.000Z"
        $date = new \DateTime($request->published);
        $request['published'] = $date;
        return $request;
    }

    public function newOrder(Request $request){
        $request = $this->parseRequest($request);

        DB::beginTransaction();
        try{
            $order = Order::create($request->all());

            $order->save();

            //STATES
            $receivedOrder = Order::where('user_id', $request['user_id'])->first();
            $orderId = $receivedOrder['id'];

            if(isset($request['states']) && is_array($request['states'])) {
                foreach ($request['states'] as $status) {;
                    $state = State::firstOrNew(['comment' => $status['comment'], 'status' => $status['status'], 'order_id' => $orderId]);
                    $order->states()->save($state);
                }
            }

            //BOOKS
            if(isset($request['books']) && is_array($request['books'])) {
                foreach ($request['books'] as $singleBook){
                    $book = Book::where('isbn', $singleBook['isbn'])->first();
                    $order->books()->save($book);
                }
            }



            DB::commit();
            return response()->json($order, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving order failed: " . $e->getMessage(), 420);
        }
    }
}
