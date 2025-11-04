<?php

namespace App\Http\Traits;

use Illuminate\Support\Str;

trait GuidId
{
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (! $model->getKey()) {
                $guidStr = (string) Str::uuid();
                $model->{$model->getKeyName()} = $guidStr;
            }
        });
    }

    public function getIncrementing()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }
}
