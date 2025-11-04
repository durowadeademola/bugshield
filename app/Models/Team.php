<?php

namespace App\Models;

use App\Http\Traits\GuidId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Team extends Model
{
    use GuidId, Notifiable, SoftDeletes;

    public $table = 'teams';

    protected $dates = ['deleted_at'];

    protected $fillable = ['user_id', 'organization_id', 'first_name', 'middle_name', 'last_name', 'email',
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
            'phone_number' => 'integer',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class, 'organization_id');
    }

    public function getFullNameAttribute(): ?string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
