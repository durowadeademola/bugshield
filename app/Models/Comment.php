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

    protected $fillable = ['report_id', 'user_id', 'message'];

    protected function casts(): array
    {
        return [
            'message' => 'string'
        ];
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function report() {
        return $this->belongsTo(Report::class, 'report_id');
    }
}
