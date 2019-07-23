<?php

namespace App\Http\Controllers;

use App\Repositories\GenreRepository;
use App\Repositories\MovieRepository;

class MovieController extends Controller
{
    private $movieRepository;
    private $genreRepository;

    public function __construct(MovieRepository $movieRepository, GenreRepository $genreRepository)
    {
        $this->movieRepository = $movieRepository;
        $this->genreRepository = $genreRepository;
    }

    /**
     * Return list of movies of specific page
     * @param int $page
     */
    public function paginate($page = 1)
    {
        return $this->movieRepository->getUpcoming($page);
    }

    /**
     * Return movies based on query text
     * @param string $query
     */
    public function search($query, $page = 1)
    {
        return $this->movieRepository->search($query, $page);
    }

    /**
     * Return details from a specific movie
     * @param int $id
     *
     * @return array
     */
    public function load($id)
    {
        return $this->movieRepository->load($id);
    }
}
