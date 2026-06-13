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

    protected $fillable = [
        'user_id', 'first_name', 'middle_name', 'last_name', 'email',
        'designation', 'address', 'phone_number', 'is_active', 'rank',
        'reputation_points', 'total_earnings', 'reports_submitted', 'reports_resolved',
        'country', 'bio', 'image_name', 'image_path',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'rank' => 'integer',
            'reputation_points' => 'integer',
            'total_earnings' => 'decimal:2',
            'reports_submitted' => 'integer',
            'reports_resolved' => 'integer',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'researcher_id');
    }

    public function bounties()
    {
        return $this->hasMany(Bounty::class, 'researcher_id');
    }

    public function getFullNameAttribute(): string
    {
        return trim("{$this->first_name} {$this->last_name}");
    }
}
