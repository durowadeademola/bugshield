<?php

namespace App\Models;

use App\Http\Traits\GuidId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{
    use GuidId, SoftDeletes;

    public $table = 'reports';

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'researcher_id', 'program_id', 'title', 'description',
        'steps_to_reproduce', 'proof_of_concept', 'url',
        'status', 'asset', 'weakness', 'severity', 'impact',
        'attch_name', 'cvss_score', 'cvss_vector',
        'triage_notes', 'triaged_by', 'triaged_at', 'resolved_at',
        'is_low', 'is_medium', 'is_high', 'is_critical', 'is_informational',
    ];

    protected function casts(): array
    {
        return [
            'is_low' => 'boolean',
            'is_medium' => 'boolean',
            'is_high' => 'boolean',
            'is_critical' => 'boolean',
            'is_informational' => 'boolean',
            'cvss_score' => 'decimal:1',
            'triaged_at' => 'datetime',
            'resolved_at' => 'datetime',
        ];
    }

    public function researcher()
    {
        return $this->belongsTo(Researcher::class, 'researcher_id');
    }

    public function program()
    {
        return $this->belongsTo(Program::class, 'program_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'report_id')->orderBy('created_at');
    }

    public function bounty()
    {
        return $this->hasOne(Bounty::class, 'report_id');
    }

    public function attachments()
    {
        return $this->hasMany(Attachment::class, 'report_id');
    }

    public function triagedBy()
    {
        return $this->belongsTo(User::class, 'triaged_by');
    }

    public function getSeverityColor(): string
    {
        return match($this->severity) {
            'critical' => 'red',
            'high' => 'orange',
            'medium' => 'yellow',
            'low' => 'blue',
            default => 'gray',
        };
    }

    public function getStatusColor(): string
    {
        return match($this->status) {
            'triaged' => 'blue',
            'resolved' => 'green',
            'cancelled' => 'red',
            default => 'yellow',
        };
    }
}
