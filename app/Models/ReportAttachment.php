<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Traits\GuidId;

class ReportAttachment extends Model
{
    use SoftDeletes, GuidId;

    public $table = 'report_attachments';

    protected $dates = ['deleted_at'];

    protected $fillable = ['bug_report_id', 'file_path'];

    public function bugReport() {
        return $this->belongsTo(BugReport::class, 'bug_report_id');
    }
}
