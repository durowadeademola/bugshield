<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Traits\GuidId;

class Notification extends Model
{
    use HasFactory, Notifiable, SoftDeletes, GuidId;

    public $table = 'notifications';

    protected $dates = ['deleted_at'];

    protected $fillable = ['user_id', 'message', 'read_status'];

    protected function casts(): array
    {
        return [
            'message' => 'string',
            'read_status' => 'boolean'
        ];
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
