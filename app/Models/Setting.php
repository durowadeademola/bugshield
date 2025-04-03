<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Traits\GuidId;

class Setting extends Model
{
    use Notifiable, SoftDeletes, GuidId;

    public $table = 'settings';

    protected $dates = ['deleted_at'];
    
    protected $fillable = ['key', 'value', 'type', 'group'];

    protected function casts(): array
    {
        return [
            'key' => 'string',
            'value' => 'string',
            'type' => 'string',
            'group' => 'string'
        ];
    }

    public static function get($key, $default = null)
    {
        return self::where('key', $key)->value('value') ?? $default;
    }

    public static function set($key, $value)
    {
        return self::updateOrCreate(['key' => $key], ['value' => $value]);
    }
}
