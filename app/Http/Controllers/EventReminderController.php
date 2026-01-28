<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventReminder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventReminderController extends Controller
{
    private function canViewEvent(string $uuid)
    {
        return Event::where('uuid', $uuid)
            ->whereHas('users', fn ($q) =>
            $q->where('users.id', Auth::id())
            )
            ->first();
    }

    public function StoreEventReminder($uuid, Request $request)
    {
        $event = $this->canViewEvent($uuid);

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => '이벤트 접근 권한이 없습니다.',
                'type' => 'danger'
            ]);
        }

        $newSeconds = $request->seconds ?? [];

        $existingReminders = $event->reminders()
            ->where('user_id', Auth::id())
            ->get();

        $existingSeconds = $existingReminders->pluck('seconds')->toArray();

        $toDelete = array_diff($existingSeconds, $newSeconds);
        if ($toDelete) {
            $event->reminders()
                ->where('user_id', Auth::id())
                ->whereIn('seconds', $toDelete)
                ->delete();
        }

        $toAdd = array_diff($newSeconds, $existingSeconds);
        if ($toAdd) {
            $event->reminders()->createMany(
                collect($toAdd)->map(fn ($sec) => [
                    'seconds' => $sec,
                    'user_id' => Auth::id(),
                ])->toArray()
            );
        }

        return response()->json([
            'success' => true,
            'reminders' => $event->reminders()
                ->where('user_id', Auth::id())
                ->get()
                ->map(fn ($r) => [
                    ...$r->toArray(),
                    'event_uuid' => $event->uuid
                ])
        ]);
    }

    public function getActiveEventReminder($uuid)
    {
        $event = $this->canViewEvent($uuid);

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => '이벤트 접근 권한이 없습니다.',
                'type' => 'danger'
            ]);
        }

        $reminders = $event->reminders()
            ->where('user_id', Auth::id())
            ->pluck('seconds');

        return response()->json([
            'success' => true,
            'reminders' => $reminders
        ]);
    }

    public function getEventReminders()
    {
        $reminders = EventReminder::where('user_id', Auth::id())
            ->with('event:id,uuid')
            ->get();

        return response()->json([
            'success' => true,
            'reminders' => $reminders->map(fn ($r) => [
                ...$r->toArray(),
                'event_uuid' => $r->event?->uuid
            ])
        ]);
    }

    public function updateEventReminderRead($id)
    {
        $reminder = EventReminder::where('id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$reminder) {
            return response()->json(['success' => false]);
        }

        $reminder->update(['read' => true]);

        return response()->json(['success' => true]);
    }

    public function updateEventRemindersRead($uuid)
    {
        $event = $this->canViewEvent($uuid);

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => '이벤트 접근 권한이 없습니다.',
                'type' => 'danger'
            ]);
        }

        $event->reminders()
            ->where('user_id', Auth::id())
            ->update(['read' => false]);

        return response()->json(['success' => true]);
    }
}
