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

    protected $fillable = [
        'user_id', 'name', 'email', 'website', 'address', 'phone_number',
        'description', 'country', 'state', 'logo_name', 'logo_path', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function programs()
    {
        return $this->hasMany(Program::class, 'organization_id');
    }

    public function reports()
    {
        return $this->hasManyThrough(Report::class, Program::class, 'organization_id', 'program_id');
    }

    public function bounties()
    {
        return $this->hasMany(Bounty::class, 'organization_id');
    }

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class, 'organization_id');
    }

    public function teams()
    {
        return $this->hasMany(Team::class, 'organization_id');
    }
}
