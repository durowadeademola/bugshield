<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Traits\GuidId;

class Transaction extends Model
{
    use SoftDeletes, GuidId;

    public $table = 'transactions';

    protected $dates = ['deleted_at'];

    protected $fillables = [
        'bounty_id', 'researcher_id', 'organization_id', 'amount', 'status',
        'payment_method', 'transaction_reference'
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'integer',
            'status' => 'string',
            'payment_method' => 'string',
            'transaction_reference' => 'string'
        ];
    }

    public function bounty()
    {
        return $this->belongsTo(Bounty::class, 'bounty_id');
    }

    public function researcher()
    {
        return $this->belongsTo(User::class, 'researcher_id');
    }

    public function organization()
    {
        return $this->belongsTo(User::class, 'organization_id');
    }
}
