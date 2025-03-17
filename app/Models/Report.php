<?php

namespace App\Models;

use App\Http\Traits\GuidId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{
    use SoftDeletes, GuidId;

    public $table = 'reports';

    protected $dates = ['deleted_at'];

    protected $fillable = ['user_id', 'title', 'description', 'status', 'is_low', 'is_medium', 
                            'is_high', 'is_critical', 'is_informational'];

    protected function casts(): array
    {
        return [
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
        return $this->belongsTo(User::class, 'user_id');
    }
}
