<?php 

namespace App\Http\Traits;

use App\Http\Supports\CachedQueryBuilder;

trait CachedQuery
{
    protected function newBaseQueryBUilder()
    {
        $conn = $this->getConnection();

        $grammar = $conn->getQueryGrammar();

        return new CachedQueryBuilder($conn, $grammar, $conn->getPostProcessor());
    }
}