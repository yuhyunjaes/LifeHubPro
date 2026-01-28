<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class EventParticipantController extends Controller
{
    public function GetActiveParticipants($uuid)
    {
        try {
            $event = Event::with([
                'eventUsers.user:id,name,email',
                'invitations'
            ])->where('uuid', $uuid)->firstOrFail();

            $users = $event->eventUsers->map(function ($eu) use ($uuid) {
                return [
                    'user_name' => $eu->user->name,
                    'user_id' => $eu->user->id,
                    'event_id' => $uuid,
                    'email' => $eu->user->email,
                    'role' => $eu->role,
                    'status' => null,
                ];
            });

            $invitations = $event->invitations
                ->whereIn('status', ['pending', 'declined', 'expired'])
                ->map(function ($inv) use ($uuid) {
                    return [
                        'user_name' => null,
                        'user_id' => null,
                        'event_id' => $uuid,
                        'email' => $inv->email,
                        'role' => $inv->role,
                        'status' => $inv->status,
                    ];
                });

            $participants = $users->merge($invitations)->values();

            return response()->json([
                'success' => true,
                'participants' => $participants
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => '참가자를 불러오는중 오류가 발생했습니다.',
                'type' => 'danger'
            ]);
        }
    }
}
