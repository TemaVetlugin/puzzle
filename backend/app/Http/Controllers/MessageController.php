<?php

namespace App\Http\Controllers;


use App\Models\Message;
use App\Services\Chat\ChatService;

class MessageController extends Controller
{
    public function send(): \Illuminate\Http\JsonResponse
    {
        $entry = $this->request->validate([
            'messages' => 'nullable',
        ]);

        $lastMessage = end($entry['messages']);

        $ipAddress = $this->request->ip();

        Message::create([
            'ip' => $ipAddress,
            'role' => $lastMessage['role'],
            'content' => $lastMessage['content'],
        ]);

        $response = ChatService::send($entry['messages']);

        if(!$response){
            return $this->response->badRequest();
        }

        Message::create([
            'ip' => $ipAddress,
            'role' => 'assistant',
            'content' => $response['message'],
        ]);

        return $this->response->success($response);
    }

    public function getMessages(): \Illuminate\Http\JsonResponse
    {
        $ipAddress = $this->request->ip();

        $messages = Message::where(['ip' => $ipAddress,])->limit(90)->get();

        return $this->response->success(['messages'=>$messages]);
    }
}
