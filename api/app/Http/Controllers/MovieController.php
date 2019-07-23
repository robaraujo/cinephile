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

    /**
     * Return details from a specific movie
     * @param int $id
     *
     * @return array
     */
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
        $genres = Tmdb::getGenresApi()->getGenres()['genres'];
        foreach ($response['results'] as &$movie) {
            $movie = $this->prepareMovie($movie, $genres);
        }
        return $response;
    }

    /**
     * Prepare a single movie to return to client
     * @param array $movie
     *
     * @return array
     */
    private function prepareMovie($movie, $genres = null)
    {
        // normalize genres, in some endpoints only return genre_ids
        if ($genres && isset($movie['genre_ids'])) {
            $movie['genres'] = [];
            $ids = array_column($genres, "id");

            foreach ($movie['genre_ids'] as $id) {
                if ($index = array_search($id, $ids)) {
                    $movie['genres'][] = $genres[$index];
                }
            }
        }

        // add full path image or if has no img, set a default one
        $movie['poster_path'] = !$movie['poster_path'] ? url('images/no-img-poster.jpg')
        : "https://image.tmdb.org/t/p/w500/{$movie['poster_path']}";

        $movie['backdrop_path'] = !$movie['backdrop_path'] ? url('images/no-img-backdrop.jpg')
        : "https://image.tmdb.org/t/p/w500/{$movie['backdrop_path']}";

        // convert genres to string and separete first one
        if (isset($movie['genres']) && count($movie['genres'])) {
            $movie['genres_string'] = implode(', ', array_column($movie['genres'], 'name'));
            $movie['first_genre'] = $movie['genres'][0]['name'];
        }

        return $movie;
    }
}
