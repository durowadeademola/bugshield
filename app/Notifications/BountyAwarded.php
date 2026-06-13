<?php

namespace App\Notifications;

use App\Models\Bounty;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BountyAwarded extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Bounty $bounty) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $amount   = number_format($this->bounty->amount, 2);
        $currency = $this->bounty->currency ?? 'NGN';
        $url      = url("/researcher/submissions/{$this->bounty->report_id}");

        return (new MailMessage)
            ->subject("Bounty Awarded: {$currency} {$amount} for \"{$this->bounty->report->title}\"")
            ->greeting("Congratulations, {$notifiable->name}!")
            ->line("You have been awarded a bounty of **{$currency} {$amount}** for your report:")
            ->line("**\"{$this->bounty->report->title}\"** on **{$this->bounty->program->title}**")
            ->line("Severity: **" . ucfirst($this->bounty->report->severity ?? 'unknown') . "**")
            ->line("Your payment will be processed via Paystack to your registered bank account within 1-3 business days.")
            ->action('View Report & Bounty', $url)
            ->line("Thank you for making the African internet safer!")
            ->salutation('The Bluestrike Team');
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'type'       => 'bounty_awarded',
            'bounty_id'  => $this->bounty->id,
            'report_id'  => $this->bounty->report_id,
            'amount'     => $this->bounty->amount,
            'currency'   => $this->bounty->currency ?? 'NGN',
            'message'    => "You earned {$this->bounty->currency} {$this->bounty->amount} for \"{$this->bounty->report->title}\".",
        ];
    }

    public function toArray(object $notifiable): array
    {
        return $this->toDatabase($notifiable);
    }
}
