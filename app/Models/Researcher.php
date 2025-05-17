<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Traits\GuidId;

class Researcher extends Model
{
    use Notifiable, SoftDeletes, GuidId;

    public $table = 'researchers';

    protected $dates = ['deleted_at'];

    protected $fillables = ['user_id','first_name', 'middle_name', 'last_name', 'email',
        'designation', 'address', 'phone_number', 'is_active',
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
            'phone_number' => 'integer'
        ];
    }

    public function user() 
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getFullNameAttribute(): ?string
    {
        return "{$this->last_name} {$this->first_name}";
    }

}
