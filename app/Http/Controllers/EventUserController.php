<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EventUserController extends Controller
{
    public function UpdateEventUserRole(Request $request) {
        try {
            $data = $request->validate([
                'event_id' => ['required', 'uuid'],
                'role' => ['required', 'in:editor,viewer'],
                'id' => ['required', 'integer'],
            ]);

            DB::transaction(function () use ($data) {
                $event = Event::where('uuid', $data['event_id'])->where('user_id', Auth::id())->firstOrFail();
                $eventUser = EventUser::where('user_id', $data['id'])->where('event_id', $event->id)->firstOrFail();
                $eventUser->role = $data['role'];
                $eventUser->saveOrFail();
            });

            return response()->json([
                'success' => true,
                'message' => '해당 참가자의 권한이 변경되었습니다.',
                'type' => 'success',
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => '해당 참가자의 권한을 변경하는중 문제가 발생했습니다.',
                'type' => 'danger',
            ]);
        }
    }
}
