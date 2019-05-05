<?php

namespace App\Http\Controllers;

use App\Order;
use App\State;
use App\Book;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    //
    public function getAll(){
        $order = Order::with(['states', 'books'])->get();
        return $order;
    }
    public function findByUserId(string $user_id){
        $user = User::where('id', $user_id)->get();
        return $user;
    }

    public function getUser(string $user_id){
        $orders = Order::with(['states', 'books'])->where('user_id', $user_id)->get();
        return $orders;
    }

    public function newState(Request $request){
        DB::beginTransaction();
        try{
            $order = State::create($request->all());
            $order->save();

            DB::commit();
            return response()->json($order, 201);
        }catch (\Exception $e){
            // rollback all queries
            DB::rollBack();
            return response()->json("new state failed: " . $e->getMessage(), 420);
        }
    }

    private function parseRequest(Request $request) : Request {
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
            $receivedOrder = Order::where('user_id', $request['user_id'])->first();
            $orderId = $receivedOrder['id'];

            if(isset($request['states']) && is_array($request['states'])) {
                foreach ($request['states'] as $status) {;
                    $state = State::firstOrNew(['comment' => $status['comment'], 'status' => $status['status'], 'order_id' => $orderId]);
                    $order->states()->save($state);
                }
            }
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
