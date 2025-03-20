<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Traits\GuidId;

class Plan extends Model
{
    use SoftDeletes, GuidId;

    public $table = 'plans';

    protected $dates = ['deleted_at'];

    protected $fillables = ['title', 'description', 'max_reports', 'is_free', 'is_basic', 'is_pro', 'is_enterprise',
        'is_life_time', 'is_daily', 'is_weekly', 'is_monthly', 'is_yearly', 'custom_period', 'logo_name', 'logo_path'
    ];

    protected function casts(): array
    {
        return [
            'title' => 'string',
            'description' => 'string',
            'max_reports' => 'integer',
            'is_free' => 'boolean',
            'is_basic' => 'boolean',
            'is_pro' => 'boolean', 
            'is_enterprise' => 'boolean',
            'is_life_time' => 'boolean',
            'is_daily' => 'boolean',
            'is_weekly' => 'boolean',
            'is_monthly' => 'boolean',
            'is_yearly' => 'boolean',
            'logo_name' => 'string',
            'logo_path' => 'string'
        ];
    }
}
