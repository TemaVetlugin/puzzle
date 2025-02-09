<?php

namespace App\Services\Chat;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class ChatService
{
    public static function send($messages)
    {
        try {
            $response = Http::withHeader('Accept-Encoding', 'gzip, deflate, br')->withHeader('Content-Type', 'application/json')
                ->post('http://python_app:5005/api/data', [
                    'messages' => $messages,
                ]);

        } catch (\Throwable $exception) {
            return null;
        }

        if($response->status()!=200){
            return null;
        }

        return $response->json();
    }
}
