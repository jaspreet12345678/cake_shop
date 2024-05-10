<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_id',
        'user_id',
        'products',
        'date',
        'status',
    ];

    protected $casts = [
        'date' => 'date', // Cast the 'date' attribute to a date
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
