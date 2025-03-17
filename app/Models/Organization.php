<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Traits\GuidId;

class Organization extends Model
{
    use SoftDeletes, GuidId;

    public $table = 'organizations';

    protected $dates = ['deleted_at'];

    protected $fillable = ['user_id', 'name', 'email', 'website', 'address', 'phone_number', 
                    'description', 'country', 'state', 'is_active'];

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
            'is_active' => 'boolean'
        ];
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function reports() {
        return $this->hasMany(Report::class);
    }

}
