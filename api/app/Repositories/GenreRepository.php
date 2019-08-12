<?php

namespace App\Repositories;

use App\Repositories\TmdbAbstractRepository;

class GenreRepository extends TmdbAbstractRepository
{
    public function movieList()
    {
        $genres = $this->call("/genre/movie/list");
        return $genres['genres'];
    }
}
