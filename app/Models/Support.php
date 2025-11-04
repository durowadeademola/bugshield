<?php

namespace App\Models;

use App\Http\Traits\GuidId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Support extends Model
{
    use GuidId, SoftDeletes;

    public $table = 'supports';

    protected $dates = ['deleted_at'];

    protected $fillable = ['user_id', 'ticket_id', 'title', 'description', 'status', 'message',
        'is_pending', 'is_resolved', 'is_cancelled',
    ];

    protected function casts(): array
    {
        return [
            'title' => 'string',
            'description' => 'string',
            'status' => 'string',
            'message' => 'string',
            'is_pending' => 'boolean',
            'is_resolved' => 'boolean',
            'is_cancelled' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
