<?php

namespace App\Models;

use App\Http\Traits\GuidId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Organization extends Model
{
    use GuidId, Notifiable, SoftDeletes;

    public $table = 'organizations';

    protected $dates = ['deleted_at'];

    protected $fillable = ['user_id', 'name', 'email', 'website', 'address', 'phone_number',
        'description', 'country', 'state', 'logo_name', 'logo_path', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'name' => 'string',
            'email' => 'string',
            'address' => 'string',
            'phone_number' => 'integer',
            'website' => 'string',
            'description' => 'string',
            'country' => 'string',
            'state' => 'string',
            'is_active' => 'boolean',
            'logo_name' => 'string',
            'logo_path' => 'string',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    public function teams()
    {
        return $this->hasMany(Team::class);
    }
}
