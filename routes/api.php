<?php
use App\Http\Controllers\NotepadController;
use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::post('/notepads', [NotepadController::class, 'StoreNotepads'])->name('notepads.store');
    Route::get('/notepads/{id}', [NotepadController::class, 'GetNotepads'])->name('notepads.get');

    Route::get('/notepads/contents/{id}', [NotepadController::class, 'GetContents'])->name('notepads.contents.get');

    Route::put('/notepads/{noteId}', [NotepadController::class, 'UpdateNotepads'])->name('notepads.update');
    Route::delete('/notepads/{noteId}', [NotepadController::class, 'DeleteNotepads'])->name('notepads.delete');

    Route::post('/rooms', [ChatController::class, 'StoreRooms'])->name('rooms.store');
    Route::get('/rooms/{id}', [ChatController::class, 'GetRooms'])->name('rooms.get');
    Route::delete('/rooms/{roomId}', [ChatController::class, 'DeleteRooms'])->name('rooms.delete');
    Route::put('/rooms/{roomId}', [ChatController::class, 'UpdateRooms'])->name('rooms.update');

    Route::post('/messages', [ChatController::class, 'StoreMessages'])->name('messages.store');
    Route::get('/messages/{roomId}', [ChatController::class, 'getMessages'])->name('messages.get');
});
