<?php

namespace App\Events;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;

class EventUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public string $eventUuid,
        public array $payload
    ) {}

    public function broadcastOn()
    {
        return new PrivateChannel('event.' . $this->eventUuid);
    }

    public function broadcastAs(): string
    {
        return 'event.updated';
    }

    // 👇 브로드캐스트 데이터 명시적으로 정의
    public function broadcastWith(): array
    {
        return [
            'payload' => $this->payload
        ];
    }
}
