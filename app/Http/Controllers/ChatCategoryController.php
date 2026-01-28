<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ChatCategory;
use App\Models\ChatRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatCategoryController extends Controller
{
    public function DeleteRoomsCategories($roomId) {
        try {
            $room = ChatRoom::where('uuid', $roomId)->where('user_id', Auth::id())->firstOrFail();

            ChatCategory::where('room_id', $room->id)->delete();
            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false]);
        }
    }

    public function StoreRoomsCategories($roomId, Request $request) {
        try {
            $ChatCategories = $request->arr;

            if(!$ChatCategories) {
                return response()->json(['success' => false]);
            }

            $room = ChatRoom::where('uuid', $roomId)->where('user_id', Auth::id())->firstOrFail();

            ChatCategory::where('room_id', $room->id)->delete();

            foreach ($ChatCategories as $ChatCategory) {
                ChatCategory::create([
                    'room_id' => $room->id,
                    'category' => $ChatCategory
                ]);
            }

            return response()->json(['success' => true, "categories" => $room->chatcategories]);
        } catch (\Exception $e) {
            return response()->json(['success' => false]);
        }
    }

    public function GetRoomsCategories($roomId) {
        try {
            $room = ChatRoom::where('uuid', $roomId)->where('user_id', Auth::id())->firstOrFail();

            return response()->json(['success' => true, "categories" => $room->chatcategories]);
        } catch (\Exception $e) {
            return response()->json(['success' => false]);
        }
    }
}
