<?php

namespace App\Models;

use App\Http\Traits\GuidId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attachment extends Model
{
    use GuidId, SoftDeletes;

    public $table = 'attachments';

    protected $dates = ['deleted_at'];

    protected $fillable = ['report_id', 'file_path'];

    protected function casts(): array
    {
        return ['file_path' => 'string'];
    }

    public function report()
    {
        return $this->belongsTo(Report::class, 'report_id');
    }
}
