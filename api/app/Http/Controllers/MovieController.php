<?php

namespace App\Http\Controllers;

use Tmdb\Laravel\Facades\Tmdb;

class MovieController extends Controller
{
    /**
     * Return list of movies of specific page
     * @param int $page
     */
    public function paginate($page)
    {
        $response = Tmdb::getMoviesApi()->getUpcoming(['page' => $page]);
        return $this->prepareMovies($response);
    }

    /**
     * Return movies based on query text
     * @param string $query
     */
    public function search($query)
    {
        $response = Tmdb::getSearchApi()->searchMovies($query);
        return $this->prepareMovies($response)['results'];
    }

    public function load($id)
    {
        $movie = Tmdb::getMoviesApi()->getMovie($id);
        return $this->prepareMovie($movie);
    }

    /**
     * Prepare movies response to cliente
     * @param array $response
     *
     * @return array
     */
    private function prepareMovies($response)
    {
        foreach ($response['results'] as &$movie) {
            $movie = $this->prepareMovie($movie);
        }
        return $response;
    }

    /**
     * Prepare a single movie to return to client
     * @param array $movie
     *
     * @return array
     */
    private function prepareMovie($movie)
    {
        // add full path image or if has no img, set a default one
        $movie['poster_path'] = !$movie['poster_path'] ? url('images/no-img-poster.jpg')
        : "https://image.tmdb.org/t/p/w500/{$movie['poster_path']}";

        $movie['backdrop_path'] = !$movie['backdrop_path'] ? url('images/no-img-backdrop.jpg')
        : "https://image.tmdb.org/t/p/w500/{$movie['backdrop_path']}";

        if (isset($movie['genres'])) {
            $movie['genres_string'] = implode(', ', array_column($movie['genres'], 'name'));
        }

        return $movie;
    }
}
