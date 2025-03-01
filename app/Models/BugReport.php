<?php

namespace App\Models;

use App\Http\Traits\GuidId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BugReport extends Model
{
    use SoftDeletes, GuidId;

    public $table = 'bug_reports';

    protected $dates = ['deleted_at'];

    protected $fillable = ['user_id', 'title', 'description', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
