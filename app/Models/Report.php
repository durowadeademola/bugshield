<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Http\Traits\GuidId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{
    use HasFactory, Notifiable, SoftDeletes, GuidId;

    public $table = 'reports';

    protected $dates = ['deleted_at'];

    protected $fillable = ['researcher_id', 'program_id', 'title', 'description', 'status', 'is_low', 'is_medium', 
                            'is_high', 'is_critical', 'is_informational', 'asset', 'weakness', 'severity',
                            'attch_name', 'impact'];

    protected function casts(): array
    {
        return [
            'asset' => 'string',
            'weakness' => 'string',
            'severity' => 'string',
            'attch_name' => 'string',
            'title' => 'string',
            'description' => 'string',
            'status' => 'string',
            'is_low' => 'boolean',
            'is_medium' => 'boolean',
            'is_high' => 'boolean',
            'is_critical' => 'boolean',
            'is_informational' => 'boolean'
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'researcher_id');
    }

    public function program()
    {
        return $this->belongsTo(Program::class, 'program_id');
    }
}
