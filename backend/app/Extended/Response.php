<?php

namespace App\Extended;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;

class Response
{
    public function send($data = null, $statusCode = 200, $description = null): JsonResponse
    {
        $response = [
            'status'      => $statusCode === 200 ? 'success' : 'error',
            'status_code' => $statusCode,
        ];

        if ($data) {
            $response['data'] = $data;
        }

        if ($description) {
            $response['description'] = $description;
        }

        return new JsonResponse($response, $statusCode, [
            'Access-Control-Allow-Origin'  => '*',
            'Access-Control-Allow-Methods' => 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers' => 'Origin, Content-Type, Authorization',
        ]);
    }

    public function success($data = null, $description = ''): JsonResponse
    {
        return $this->send($data, 200, $description);
    }

    public function internalServerError($description = 'Internal Server Error'): JsonResponse
    {
        return $this->send(null, 500, $description);
    }

    public function unauthorized($description = 'Unauthorized'): JsonResponse
    {
        return $this->send(null, 401, $description);
    }

    public function forbidden($description = 'Forbidden'): JsonResponse
    {
        return $this->send(null, 403, $description);
    }

    public function notFound($description = 'Not found'): JsonResponse
    {
        return $this->send(null, 404, $description);
    }

    public function badRequest($description = 'Bad request'): JsonResponse
    {
        return $this->send(null, 400, $description);
    }
}
