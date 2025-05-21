<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Traits\GuidId;

class Analyst extends Model
{
    use Notifiable, SoftDeletes, GuidId;

    public $table = 'analysts';

    protected $dates = ['deleted_at'];

    protected $fillable = ['user_id','first_name', 'middle_name', 'last_name', 'email',
        'designation', 'address', 'phone_number', 'image_name', 'image_path', 'is_active',
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
            'image_name' => 'string',
            'image_path' => 'string'
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
