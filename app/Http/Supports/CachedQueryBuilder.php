<?php

namespace App\Http\Supports;

use Cache;
use Illuminate\Database\Query\BUilder as QueryBuilder;

class CachedQueryBuilder extends QueryBuilder
{
    protected function runSelect()
    {
        return Cache::store('request')->remember($this->getCacheKey(), 1, function () {
            return parent::runSelect();
        });
    }

    protected function getCacheKey()
    {
        return json_encode([
            $this->toSql() => $this->getBindings(),
        ]);
    }
}
