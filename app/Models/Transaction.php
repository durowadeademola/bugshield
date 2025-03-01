<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Traits\GuidId;

class Transaction extends Model
{
    use SoftDeletes, GuidId;

    public $table = 'transactions';

    protected $dates = ['deleted_at'];
}
