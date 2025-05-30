<?php

namespace App\Models;

use App\Http\Traits\GuidId;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
//use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Filament\Models\Contracts\FilamentUser;
use Laravel\Fortify\TwoFactorAuthenticatable;
use App\Mail\TwoFactorCodeMail; 
use Illuminate\Support\Facades\Mail;

class User extends Authenticatable implements FilamentUser, MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use Notifiable, TwoFactorAuthenticatable, SoftDeletes, GuidId, HasRoles;

    public $incrementing = false;
    protected $keyType = 'string'; 

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    public $table = 'users';

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'name',
        'email',
        'password',
        'email_two_factor_enabled',
        'totp_two_factor_enabled'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'two_factor_expires_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isTotpTwoFactorEnabled()
    {
        return $this->two_factor_recovery_codes != null && $this->totp_two_factor_enabled == true;
    }

    public function isEmailTwoFactorEnabled()
    {
        return $this->email_two_factor_enabled == true;
    }

    public function generateEmailTwoFactorCode()
    {
        $this->two_factor_code = rand(100000, 999999);
        $this->two_factor_expires_at = now()->addMinutes(10);
        $this->save();

        // $this->notify(new \App\Notifications\TwoFactorCode());
        Mail::to($this->email)->send(new TwoFactorCodeMail($this));
    }

    public function resetEmailTwoFactorCode()
    {
        $this->two_factor_code = null;
        $this->two_factor_expires_at = null;
        $this->save();
    }

    public function isKYCSubmitted(): bool
    {
        return $this->getKYCStatus($this->id, 'is_kyc_submitted', '1') ?? false;
    }

    public function isKYCApproved(): bool
    {
        return $this->getKYCStatus($this->id, 'is_kyc_approved', '1') ?? false;
    }

    public function getKYCStatus(string $user_id, string $key, string $value): bool
    {
        return Setting::verify($user_id, $key, $value);
    }

    public function canAccessPanel(\Filament\Panel $panel): bool
    {
        return str_ends_with($this->email, '@bugshield.com') && $this->hasVerifiedEmail() && $this->hasRole('admin');
    }
}
