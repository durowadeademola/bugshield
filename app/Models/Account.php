<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Traits\GuidId;

class Account extends Model
{
    use Notifiable, SoftDeletes, GuidId;

    public $table = 'accounts';

    protected $dates = ['deleted_at'];
    
    protected $fillable = ['user_id','account_number', 'account_name', 'bank_name', 'bank_code',
        'account_type', 'currency', 'balance', 'status'
    ];

    protected function casts(): array
    {
        return [
            'account_number' => 'string',
            'account_name' => 'string',
            'bank_name' => 'string',
            'bank_code' => 'string',
            'account_type' => 'string',
            'currency' => 'string',
            'status' => 'string'
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
