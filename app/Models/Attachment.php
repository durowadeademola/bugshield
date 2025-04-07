<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Traits\GuidId;

class Attachment extends Model
{
    use Notifiable, SoftDeletes, GuidId;

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
