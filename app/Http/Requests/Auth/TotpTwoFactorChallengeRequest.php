<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\Exceptions\HttpResponseException;
use Laravel\Fortify\Http\Requests\TwoFactorLoginRequest;
use Laravel\Fortify\Contracts\FailedTwoFactorLoginRequest;

class TotpTwoFactorChallengeRequest extends TwoFactorLoginRequest
{
    protected $challengedUser;

    public function challengedUser()
    {
        if ($this->challengedUser) {
            return $this->challengedUser;
        }
 
        $model = app(StatefulGuard::class)->getProvider()->getModel();

        if(!$this->session()->has('totp-2fa:user:id') ||
            !$user = $model::find($this->session()->get('totp-2fa:user:id'))) {
                throw new HttpResponseException(
                    app(FailedTwoFactorLoginResponse::class)->toResponse($this)
                );
            }
        return $this->challengedUser = $user;
    }
}