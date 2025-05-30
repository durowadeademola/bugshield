<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Traits\GuidId;

class Setting extends Model
{
    use SoftDeletes, GuidId;

    public $table = 'settings';

    protected $dates = ['deleted_at'];
    
    protected $fillable = ['user_id', 'key', 'value', 'type', 'group'];

    protected function casts(): array
    {
        return [
            'key' => 'string',
            'value' => 'string',
            'type' => 'string',
            'group' => 'string'
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public static function get(string $user_id, string $key, mixed $default = null): mixed
    {
        return self::where([
            'user_id' => $user_id, 
            'key' => $value
        ])->value('value') ?? $default;
    }
    
    public static function set(string $user_id, string $key, mixed $value): self
    {
        return self::updateOrCreate(
            ['user_id' => $user_id], ['key' => $key],
            ['value' => $value]
        );
    }

    public static function verify(string $user_id, string $key, string $value): bool
    {
        return self::where([
            'user_id' => $user_id, 'key' => $key,
            'value' => $value
        ])->exists();
    }
}
