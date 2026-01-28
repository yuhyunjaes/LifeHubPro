<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EventUser extends Model
{
    use HasFactory;

    public function event() {
        return $this->belongsTo(Event::class, 'event_id', 'id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    protected $fillable = [
        'event_id',
        'user_id',
        'role'
    ];
}
