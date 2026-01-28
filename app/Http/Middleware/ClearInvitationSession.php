<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Session;

class ClearInvitationSession
{
    public function handle($request, Closure $next)
    {
        if (!Session::has('invitation_token')) {
            return $next($request);
        }

        $routeName = $request->route()?->getName();
        $method = $request->method();

        if ($method === 'GET' && in_array($routeName, ['login', 'register'])) {

            if (Session::get('invitation_active') !== true) {
                Session::forget([
                    'invitation_token',
                    'invitation_email',
                    'invitation_active',
                ]);
            }

            Session::put('invitation_active', false);

            return $next($request);
        }

        if ($method === 'POST' || $routeName === 'checkId' || $routeName === 'invitations.show') {
            return $next($request);
        }

        Session::forget([
            'invitation_token',
            'invitation_email',
            'invitation_active',
        ]);

        return $next($request);
    }
}

