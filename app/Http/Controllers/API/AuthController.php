<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Auth;
use Validator;
use App\Models\User;
use Stripe\Checkout\Session;
use Stripe\Exception\ApiErrorException;
use Stripe\Stripe;

class AuthController extends Controller
{
    public function register(Request $request){
        // validation
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password'
        ]);

        if($validator->fails()){
            $response = [
                'success' => false,
                'message' => $validator->errors()
            ];
            return response()->json($response, 400);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);

        $success['token'] = $user->createToken('MyApp')->plainTextToken;
        $success['name'] = $user->name;

        $response = [
            'success' => true,
            'data' => $success,
            'message' => 'User register successfully'
        ];

        return response()->json($response,200);

    }

    public function login(Request $request){
        if(Auth::attempt(['email'=>$request->email,'password'=>$request->password])){
            $user = Auth::user();
            $success['token'] = $user->createToken('MyApp')->plainTextToken;
            $success['name'] = $user->name;

            $response = [
                'success' => true,
                'data' => $success,
                'message' => 'User login successfully'
            ];
            return response()->json($response,200);
        }else{
            $response = [
                'success' => false,
                'message' => 'Unauthorised'
            ];
            return response()->json($response);
        }
    }

    public function products(Request $request){
        $products = Product::all();
        return response()->json($products);
    }
    public function productsDeatails($id){
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    public function getNextOrderNumber()
    {
        $lastOrder = Order::orderBy('id','desc')->first();

        if(!empty($lastOrder)){
            return 'ORD'.str_pad($lastOrder->id + 1, 12, "0", STR_PAD_LEFT);
        }else{
            return 'ORD'.str_pad(1, 12, "0", STR_PAD_LEFT);
        }
    }

    public function checkout(Request $request){
        $cartItems = $request->input('cartItems'); // Assuming 'cartItems' is the key containing the array of cart items in your request
    
        Stripe::setApiKey('sk_test_51OernzJ7YilluosL0ywVK3wCinCaN76pMK2CXMQZNtlVIECHUPTMlUdX55aRZFhS9bSJ5bsUvuECx81u793HUAQg00UmTsa3JH'); // Set your Stripe secret key
        
        try {
            $lineItems = [];
            foreach ($cartItems as $item) {
                $lineItems[] = [
                    'price_data' => [
                        'currency' => 'usd',
                        'unit_amount' => $item['price'] * 100, // Assuming the price is in dollars and converting to cents
                        'product_data' => [
                            'name' => $item['name'],
                        ],
                    ],
                    'quantity' => 1, // Assuming you have a 'quantity' property in each cart item
                ];
            }
    
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => 'http://127.0.0.1:8000/success',
                'cancel_url' => 'http://127.0.0.1:8000/cancel',
            ]);

            $serializedCartItems = json_encode($cartItems);
    
            $order = new Order();
            $order->order_id = $this->getNextOrderNumber(); // Generate a unique order ID (you can use any unique identifier logic)
            $order->user_id = auth()->id(); // Assuming you have authentication and want to associate the order with the current user
            $order->date = now()->toDateString(); // Set the order date to the current date
            $order->status = 1; // Assuming the initial status of the order is 1 (paid)
            $order->products = $serializedCartItems; // Store the cart items in the 'products' field
            $order->save();
    
            return response()->json(['sessionId' => $session->id]);
        } catch (ApiErrorException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getAllorders() {
        return Order::all();
    }
    
    public function getOrderDetails($id) {
        return Order::whereId($id)->first();
    }
}
