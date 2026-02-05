<?php

namespace App\Events;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;

class ParticipantUpdated implements ShouldBroadcastNow {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public string $eventUuid,
        public array $payload
    ) {}

    // 특정 이벤트의 참가자 채널로 브로드캐스트
    public function broadcastOn()
    {
        return new PrivateChannel('event.' . $this->eventUuid . '.participants');
    }

    public function broadcastAs(): string
    {
        return 'participant.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'payload' => $this->payload
        ];
    }
}
