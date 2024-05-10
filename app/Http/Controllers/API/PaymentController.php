<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function checkoutSuccess(Request $request){
        return true;
    }
    public function checkoutCancel(Request $request){
        return true;
    }
}
