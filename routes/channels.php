<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\EventUser;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('event.{uuid}', function ($user, $uuid) {
    return EventUser::whereHas('event', fn ($q) =>
    $q->where('uuid', $uuid)
    )
        ->where('user_id', $user->id)
        ->exists();
});
