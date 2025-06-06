<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\Exceptions\HttpResponseException;
use Laravel\Fortify\Http\Requests\TwoFactorLoginRequest;
use Laravel\Fortify\Contracts\FailedTwoFactorLoginRequest;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\TwoFactorAuthenticationProvider;

class TwoFactorChallengeRequest extends TwoFactorLoginRequest
{
    protected $challengedUser;

    public function getChallengedUser()
    {
        if ($this->challengedUser) {
            return $this->challengedUser;
        }

        $model = app(StatefulGuard::class)->getProvider()->getModel();

        if ($this->session()->has('totp-2fa:user:id')) {
            $user = $model::find($this->session()->get('totp-2fa:user:id'));
            if ($user) {
                return $this->challengedUser = $user;
            }
        }

        if ($this->session()->has('email-2fa:user:id')) {
            $user = $model::find($this->session()->get('email-2fa:user:id'));
            if ($user) {
                return $this->challengedUser = $user;
            }
        }

        throw ValidationException::withMessages(['code' => ['Two-factor authentication failed.']]);
    }

    public function hasValidCode()
    {
        return app(TwoFactorAuthenticationProvider::class)
            ->verify(decrypt($this->getChallengedUser()
            ->two_factor_secret), $this->input('code'));
    }


}