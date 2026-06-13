<?php

namespace App\Notifications;

use App\Models\Report;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewReportSubmitted extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Report $report) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $severity = ucfirst($this->report->severity ?? 'unknown');
        $url      = url("/org/reports/{$this->report->id}");

        $severityEmoji = match($this->report->severity) {
            'critical' => '🔴',
            'high'     => '🟠',
            'medium'   => '🟡',
            'low'      => '🔵',
            default    => '⚪',
        };

        return (new MailMessage)
            ->subject("{$severityEmoji} New {$severity} Report on {$this->report->program->title}")
            ->greeting("Hello,")
            ->line("A new vulnerability report has been submitted to your program **\"{$this->report->program->title}\"**.")
            ->line("**Title:** {$this->report->title}")
            ->line("**Severity:** {$severityEmoji} {$severity}")
            ->line("**Weakness:** " . ($this->report->weakness ?? 'Not specified'))
            ->line("Please review this report and triage it within your SLA window.")
            ->action('Review Report', $url)
            ->salutation('The Bluestrike Team');
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'type'       => 'new_report_submitted',
            'report_id'  => $this->report->id,
            'title'      => $this->report->title,
            'severity'   => $this->report->severity,
            'program_id' => $this->report->program_id,
            'message'    => "New {$this->report->severity} report: \"{$this->report->title}\" on {$this->report->program->title}.",
        ];
    }

    public function toArray(object $notifiable): array
    {
        return $this->toDatabase($notifiable);
    }
}
