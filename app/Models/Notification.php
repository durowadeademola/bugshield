<?php
namespace App\Models;

use Illuminate\Notifications\DatabaseNotification as BaseNotification;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Notification extends BaseNotification
{
    protected $table = 'notifications';

    protected $casts = [
        'data' => 'array',
        'read_at' => 'datetime',
    ];

    // Optional: Custom accessor for short message, etc.
    public function shortMessage(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->data['message'] ?? null
        );
    }

    // Example: scope to get only unread
    public function scopeUnread($query)
    {
        return $query->whereNull('read_at');
    }

    // Example: Mark as read
    public function markAsRead()
    {
        $this->update(['read_at' => now()]);
    }
}
