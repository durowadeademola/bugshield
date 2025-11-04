<?php

namespace App\Models;

use App\Http\Traits\GuidId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Researcher extends Model
{
    use GuidId, Notifiable, SoftDeletes;

    public $table = 'researchers';

    protected $dates = ['deleted_at'];

    protected $fillable = ['user_id', 'first_name', 'middle_name', 'last_name', 'email',
        'designation', 'address', 'phone_number', 'is_active', 'rank',
    ];

    protected function casts(): array
    {
        return [
            'first_name' => 'string',
            'middle_name' => 'string',
            'last_name' => 'string',
            'email' => 'string',
            'designation' => 'string',
            'address' => 'string',
            'phone_number' => 'integer',
            'rank' => 'integer',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getFullNameAttribute(): ?string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
