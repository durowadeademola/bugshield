<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Traits\GuidId;

class Program extends Model
{
    use Notifiable, SoftDeletes, GuidId;

    public $table = 'programs';

    protected $dates = ['deleted_at'];

    protected $fillable = ['organization_id', 'title', 'description', 'platform', 'is_public',  'is_private', 'is_active', 'is_vdp', 'is_managed', 
        'critical_bounty_range', 'high_bounty_range', 'medium_bounty_range', 'low_bounty_range', 'asset', 'in_scope', 'out_of_scope', 'logo_name', 'logo_path'
    ];

    protected function casts(): array
    {
        return [
            'title' => 'string',
            'description' => 'string',
            'platform' => 'string',
            'is_public' => 'boolean',
            'is_private' => 'boolean',
            'is_active' => 'boolean',
            'is_vdp' => 'boolean',
            'is_managed' => 'boolean', 
            'critical_bounty_range' => 'string',
            'high_bounty_range' => 'string',
            'medium_bounty_range' => 'string',
            'low_bounty_range' => 'string',
            'asset' => 'string',
            'in_scope' => 'string',
            'out_of_scope' => 'string',
            'logo_name' => 'string',
            'logo_path' => 'string'
        ];
    }

    public function organization() 
    {
        return $this->belongsTo(Organization::class, 'organization_id');
    }
}
