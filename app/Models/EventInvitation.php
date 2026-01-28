<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EventInvitation extends Model
{
    use HasFactory;

    public function event() {
        return $this->belongsTo(Event::class, 'event_id', 'id');
    }

    public function inviter() {
        return $this->belongsTo(User::class, 'inviter_id', 'id');
    }

    protected $fillable = [
        'event_id',
        'inviter_id',
        'email',
        'role',
        'token',
        'status',
        'expires_at'
    ];
}
