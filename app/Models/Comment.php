<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Traits\GuidId;

class Comment extends Model
{
    use SoftDeletes, GuidId;

    public $table = 'comments';

    protected $dates = ['deleted_at'];

    protected $fillable = ['bug_report_id', 'user_id', 'message'];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function bugReport() {
        return $this->belongsTo(BugReport::class, 'bug_report_id');
    }
}
