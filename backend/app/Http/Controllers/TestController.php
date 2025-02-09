<?php

namespace App\Http\Controllers;


class TestController extends Controller
{
    public function test(): \Illuminate\Http\JsonResponse
    {
        return $this->response->success('Hello world');
    }
}
