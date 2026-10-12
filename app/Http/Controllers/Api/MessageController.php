<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $query = Message::query();

        if ($request->has('is_read')) {
            $query->where('is_read', $request->boolean('is_read'));
        }

        $messages = $query->latest()->paginate($request->integer('per_page', 15));

        return MessageResource::collection($messages);
    }

    public function show(Message $message)
    {
        return new MessageResource($message);
    }

    public function store(StoreMessageRequest $request)
    {
        $message = Message::create($request->validated());
        return new MessageResource($message);
    }

    public function update(UpdateMessageRequest $request, Message $message)
    {
        $message->update($request->validated());
        return new MessageResource($message);
    }

    public function destroy(Message $message)
    {
        $message->delete();
        return response()->noContent();
    }

    public function markAsRead(Message $message)
    {
        $message->update(['is_read' => true]);
        return new MessageResource($message);
    }

    public function markAsUnread(Message $message)
    {
        $message->update(['is_read' => false]);
        return new MessageResource($message);
    }
}