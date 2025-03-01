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

    protected $fillable = ['user_id', 'name', 'website'];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function bugReports() {
        return $this->hasMany(BugReport::class);
    }

}
