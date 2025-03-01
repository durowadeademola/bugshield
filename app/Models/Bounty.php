<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Traits\GuidId;

class Bounty extends Model
{
    use SoftDeletes, GuidId;

    public $table = 'bounties';

    protected $dates = ['deleted_at'];

    protected $fillable = ['bug_report_id', 'researcher_id', 'organization_id', 'amount', 'status'];

    public function bugReport() {
        return $this->belongsTo(BugReport::class);
    }

    public function hacker() {
        return $this->belongsTo(User::class, 'researcher_id'); 
    }

    public function organization() {
        return $this->belongsTo(User::class, 'organization_id');
    }

    public function transactions() {
        return $this->hasMany(Transaction::class);
    }
}
