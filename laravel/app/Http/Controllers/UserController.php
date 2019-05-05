<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function save(Request $request) : JsonResponse {
        DB::beginTransaction();
        try {
            $user = User::create($request->all());
            DB::commit();
            return response()->json($user, 201);
        }catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving user failed: ". $e->getMessage(), 420);
        }
    }
}
