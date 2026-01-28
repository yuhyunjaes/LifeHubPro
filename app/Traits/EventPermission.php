<?php

namespace App\Traits;

use App\Models\EventUser;
use Illuminate\Support\Facades\Auth;

trait EventPermission
{
    protected function getEventRole($eventId)
    {
        return EventUser::where('event_id', $eventId)
            ->where('user_id', Auth::id())
            ->value('role');
    }

    protected function canViewEvent($eventId)
    {
        return EventUser::where('event_id', $eventId)
            ->where('user_id', Auth::id())
            ->exists();
    }

    protected function canEditEvent($eventId)
    {
        return EventUser::where('event_id', $eventId)
            ->where('user_id', Auth::id())
            ->whereIn('role', ['owner', 'editor'])
            ->exists();
    }

    protected function isOwner($eventId)
    {
        return EventUser::where('event_id', $eventId)
            ->where('user_id', Auth::id())
            ->where('role', 'owner')
            ->exists();
    }
}
