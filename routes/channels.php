<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\EventUser;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('events.all', function ($user) {
    return EventUser::where('user_id', $user->id)->exists();
});

Broadcast::channel('event.{eventId}.participants', function ($user, $eventId) {
    return EventUser::whereHas('event', fn ($q) =>
    $q->where('uuid', $eventId)
    )
        ->where('user_id', $user->id)
        ->exists();
});

Broadcast::channel('user.{userId}.events.participants', function ($user, $userId) {
    return (int) $user->id === (int) $userId;
});
