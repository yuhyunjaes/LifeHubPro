<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Carbon\Carbon;

class EventController extends Controller
{
    public function StoreEvents(Request $request)
    {
        if ($request->eventSwitch === "normal") {
            $eventSwitch = false;
        } else if ($request->eventSwitch === "chat") {
            $eventSwitch = true;
        }

        $startAt = Carbon::parse($request->start_at)
            ->setTimezone('Asia/Seoul')
            ->format('Y-m-d H:i:s');

        $endAt = Carbon::parse($request->end_at)
            ->setTimezone('Asia/Seoul')
            ->format('Y-m-d H:i:s');

        $event = Event::create([
            'uuid' => Str::uuid()->toString(),
            'chat_id' => $eventSwitch ? $request->chat_id : null,
            'user_id' => Auth::id(),
            'title' => $request->title,
            'start_at' => $startAt,
            'end_at' => $endAt,
            'description' => $request->description,
            'color' => $request->color,
        ]);

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => '이벤트 생성중 문제가 발생했다',
                'type' => 'danger'
            ]);
        }

        return response()->json([
            'success' => true,
            'event' => $event
        ]);
    }

}
