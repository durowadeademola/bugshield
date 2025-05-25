<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Traits\GuidId;

class Subscription extends Model
{
    use SoftDeletes, GuidId;

    public $table = 'subscriptions';

    protected $dates = ['deleted_at'];
    
    protected $fillable = ['organization_id', 'plan_id', 'status', 'is_active'];

    protected function casts(): array
    {
        return [
            'status' => 'string',
            'is_active' => 'boolean'
        ];
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class, 'organization_id');
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class, 'plan_id');
    }
}
