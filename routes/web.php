<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\NotepadController;
use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Log;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::post('/lifebot/title', function (Request $request) {
    $apiKey = env('GEMINI_API_KEY');
    $model = $request->input('model_name', 'models/gemini-2.5-flash');
    $prompt = $request->input('prompt', '테스트');

    Log::info('Gemini 요청 시작', compact('model', 'prompt'));

    $url = "https://generativelanguage.googleapis.com/v1beta/{$model}:generateContent?key={$apiKey}";

    try {
        $response = Http::withHeaders(['Content-Type' => 'application/json'])
            ->timeout(30)
            ->post($url, [
                'contents' => [['parts' => [['text' => $prompt]]]],
                'generationConfig' => [
                    'temperature' => 0.7,
                    'maxOutputTokens' => 2048,
                ],
            ]);

        Log::info('Gemini 응답', [
            'status' => $response->status(),
            'body' => $response->body(),
        ]);

        return $response->json();
    } catch (\Throwable $e) {
        Log::error('Gemini 내부 오류', ['msg' => $e->getMessage()]);
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::middleware('guest')->group(function () {
    Route::get('/check-id/{id}', [AuthController::class, 'checkId'])->name('checkId');

    Route::post('/send-email-code', [AuthController::class, 'sendEmail'])->name('sendEmail');
    Route::post('/check-email-code', [AuthController::class, 'checkEmail'])->name('checkEmail');

    Route::post('/register', [AuthController::class, 'register'])->name('register.submit');
    Route::post('/login', [AuthController::class, 'login'])->name('login.submit');

    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');
});

Route::middleware('auth')->group(function () {
    Route::get('/lifebot', function () {
        return Inertia::render('Lifebot');
    })->name('lifebot');

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

});

Route::get('/user', function () {
    if (Auth::check()) {
        return response()->json(['success' => true, 'user' => Auth::user()]);
    }
    return response()->json(['success' => false]);
});

require __DIR__.'/auth.php';
