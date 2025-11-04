<?php

namespace App\Models;

use App\Http\Traits\GuidId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bounty extends Model
{
    use GuidId, SoftDeletes;

    public $table = 'bounties';

    protected $dates = ['deleted_at'];

    protected $fillable = ['program_id', 'report_id', 'researcher_id', 'organization_id',
        'amount', 'status', 'is_low', 'is_medium', 'is_high', 'is_critical', 'is_informational',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'status' => 'string',
            'is_low' => 'boolean',
            'is_medium' => 'boolean',
            'is_high' => 'boolean',
            'is_critical' => 'boolean',
            'is_informational' => 'boolean',
        ];
    }

    public function report()
    {
        return $this->belongsTo(Report::class, 'report_id');
    }

    public function researcher()
    {
        return $this->belongsTo(Researcher::class, 'researcher_id');
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class, 'organization_id');
    }

    public function program()
    {
        return $this->belongsTo(Program::class, 'program_id');
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
