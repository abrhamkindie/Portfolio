<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(Request $request): Response
    {
        $messages = Message::query()
            ->when($request->has('is_read'), function ($query) use ($request) {
                $query->where('is_read', $request->boolean('is_read'));
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Messages/Index', [
            'messages' => $messages,
            'unreadCount' => Message::where('is_read', false)->count(),
            'filters' => [
                'is_read' => $request->has('is_read') ? $request->boolean('is_read') : null,
            ],
        ]);
    }

    public function show(Message $message): Response
    {
        if (! $message->is_read) {
            $message->update(['is_read' => true]);
        }

        return Inertia::render('Admin/Messages/Show', [
            'message' => $message,
        ]);
    }

    public function destroy(Message $message): RedirectResponse
    {
        $message->delete();

        return redirect()->route('admin.messages.index')->with('success', 'Message deleted.');
    }

    public function markAsRead(Message $message): RedirectResponse
    {
        $message->update(['is_read' => true]);

        return back()->with('success', 'Message marked as read.');
    }

    public function markAsUnread(Message $message): RedirectResponse
    {
        $message->update(['is_read' => false]);

        return back()->with('success', 'Message marked as unread.');
    }
}