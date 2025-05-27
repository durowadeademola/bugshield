<?php

namespace App\Http\Requests\Auth;

use Illumiate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\Exceptions\HttpResponseException;
use Laravel\Fortify\Http\Requests\TwoFactorLoginRequest;
use Laravel\Fortify\Contracts\FailedTwoFactorLoginRequest;

class TotpTwoFactorChallengeRequest extends TwoFactorLoginRequest
{
    public function challengedUser()
    {
        if ($this->challengedUser) {
            return $this->challengedUser;
        }
 
        $model = app(StatefulGuard::class)->getProvider()->getModel();

        if(!$this->session()->has('login.id') ||
            !$user = $model::find($this->session()->get('login.id'))) {
                throw new HttpResponseException(
                    app(FailedTwoFactorLoginResponse::class)->toResponse($this)
                );
            }
        return $this->challengedUser = $user;
    }
}