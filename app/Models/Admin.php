<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Traits\GuidId;

class Admin extends Model
{
    use SoftDeletes, GuidId;

    public $table = 'admins';

    protected $dates = ['deleted_at'];

    protected $fillable = ['user_id'];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

}
