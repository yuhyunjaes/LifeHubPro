<?php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ParticipantDelete implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public int $userId,
        public string $eventUuid,
    ) {}

    public function broadcastOn()
    {
        return new PrivateChannel('user.' . $this->userId . '.events.participants');
    }

    public function broadcastAs(): string
    {
        return 'participant.deleted';
    }

    public function broadcastWith(): array
    {
        return [
            'event_uuid' => $this->eventUuid,
            'user_id' => $this->userId,
        ];
    }
}
