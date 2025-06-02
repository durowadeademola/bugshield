<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReportNotifcation extends Notification
{
    use Queueable;

    protected $report;

    /**
     * Create a new notification instance.
     */
    public function __construct($report)
    {
        $this->report = $report;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
        ->subject('New Report Submitted')
        ->line('A new bug report has been submitted by a researcher.')
        ->action('View Report', url('/reports/' . $this->report->id))
        ->line('Thank you for using BugShield!');
    }

    //$user->notify(new NewReportSubmitted($report));

    public function toDatabase(object $notifiable)
    {
        return [
            'title' => 'New Report Submitted',
            'body' => 'A new report has been submitted by a researcher.',
            'report_id' => $this->report->id,
            'submitted_by' => $this->report->user->name,
            'url' => route('reports.show', $this->report->id),
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
