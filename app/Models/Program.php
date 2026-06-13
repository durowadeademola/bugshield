<?php

namespace App\Models;

use App\Http\Traits\GuidId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Program extends Model
{
    use GuidId, SoftDeletes;

    public $table = 'programs';

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'organization_id', 'title', 'description', 'platform', 'status', 'type',
        'is_public', 'is_private', 'is_active', 'is_vdp', 'is_managed',
        'critical_bounty_range', 'high_bounty_range', 'medium_bounty_range',
        'low_bounty_range', 'informational_bounty_range',
        'asset', 'in_scope', 'out_of_scope', 'policy', 'response_sla',
        'logo_name', 'logo_path', 'currency',
        'total_reports', 'researchers_count', 'total_bounties_paid',
    ];

    protected function casts(): array
    {
        return [
            'is_public' => 'boolean',
            'is_private' => 'boolean',
            'is_active' => 'boolean',
            'is_vdp' => 'boolean',
            'is_managed' => 'boolean',
            'total_bounties_paid' => 'decimal:2',
        ];
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class, 'organization_id');
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'program_id');
    }

    public function bounties()
    {
        return $this->hasMany(Bounty::class, 'program_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'program_id');
    }

    public function getTypeLabel(): string
    {
        return match($this->type) {
            'vdp' => 'Vulnerability Disclosure',
            'pentest' => 'Penetration Testing',
            default => 'Bug Bounty',
        };
    }
}
