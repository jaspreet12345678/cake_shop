<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PaymentController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function(){
    Route::post('login','login');
    Route::post('register','register');
    Route::get('products','products');
    // Route::get('products/{id}','productsDeatails');
    Route::get('products/{any}', 'productsDeatails')->where('any', '.*');
    Route::post('checkout', 'checkout');
    Route::get('orders', 'getAllorders');
    Route::get('orders/{any}', 'getOrderDetails')->where('any', '.*');
});
Route::get('/checkout/success', [PaymentController::class, 'checkoutSuccess'])->name('checkout.success');
Route::get('/checkout/cancel', [PaymentController::class, 'checkoutCancel'])->name('checkout.cancel');
