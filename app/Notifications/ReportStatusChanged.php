<?php

namespace App\Notifications;

use App\Models\Report;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReportStatusChanged extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Report $report,
        public string $oldStatus,
        public string $newStatus,
        public ?string $triageNotes = null
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $statusLabels = [
            'pending'     => 'Pending Review',
            'triaged'     => 'Triaged',
            'accepted'    => 'Accepted',
            'rejected'    => 'Rejected',
            'informative' => 'Informative',
            'resolved'    => 'Resolved',
            'duplicate'   => 'Duplicate',
        ];

        $newLabel = $statusLabels[$this->newStatus] ?? ucfirst($this->newStatus);
        $url = url("/researcher/submissions/{$this->report->id}");

        $mail = (new MailMessage)
            ->subject("Report Status Updated: {$newLabel} — {$this->report->title}")
            ->greeting("Hello {$notifiable->name},")
            ->line("Your report **\"{$this->report->title}\"** has been updated to **{$newLabel}**.")
            ->line("Program: **{$this->report->program->title}**");

        if ($this->triageNotes) {
            $mail->line("Triage Notes: {$this->triageNotes}");
        }

        if ($this->newStatus === 'accepted') {
            $mail->line('Congratulations! Your report has been accepted. You will receive a bounty award shortly.');
        } elseif ($this->newStatus === 'resolved') {
            $mail->line('This vulnerability has been resolved by the organization. Great work!');
        } elseif ($this->newStatus === 'rejected') {
            $mail->line('Unfortunately, this report did not meet the program criteria. Review the triage notes for details.');
        }

        return $mail->action('View Report', $url)->salutation('The Bluestrike Team');
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'type'       => 'report_status_changed',
            'report_id'  => $this->report->id,
            'title'      => $this->report->title,
            'old_status' => $this->oldStatus,
            'new_status' => $this->newStatus,
            'message'    => "Your report \"{$this->report->title}\" status changed to {$this->newStatus}.",
        ];
    }

    public function toArray(object $notifiable): array
    {
        return $this->toDatabase($notifiable);
    }
}
