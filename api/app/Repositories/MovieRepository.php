<?php

namespace App\Repositories;

use App\Repositories\GenreRepository;
use App\Repositories\TmdbAbstractRepository;

class MovieRepository extends TmdbAbstractRepository
{
    /**
     * Get upcoming movies from TMDB
     *
     * @param integer $page
     *
     * @return array
     */
    public function getUpcoming($page = 1)
    {
        $result = $this->call("/movie/upcoming", ['page' => $page]);
        return $this->normalizeMovies($result);
    }

    /**
     * Get movie from TMDB
     *
     * @param integer $movie_id
     *
     * @return array
     */
    public function load($movie_id)
    {
        $result = $this->call("/movie/{$movie_id}");
        return $this->normalizeMovie($result);
    }

    /**
     * Search movie at TMDB
     *
     * @param string $query
     * @param integer $page
     *
     * @return array
     */
    public function search($query, $page)
    {
        $result = $this->call("/search/movie", ['query' => $query, 'page' => $page]);
        return $this->normalizeMovies($result);
    }

    /**
     * Normalize movies
     *
     * @param array $response
     *
     * @return array
     */
    private function normalizeMovies($response)
    {
        $genreRepo = new GenreRepository();
        $genres = $genreRepo->movieList();

        foreach ($response['results'] as &$movie) {
            $movie = $this->normalizeMovie($movie, $genres);
        }
        return $response;
    }

    /**
     * Normalize movie object
     * Add full image path, normalize genres
     *
     * @param array $movie
     *
     * @return array
     */
    private function normalizeMovie($movie, $genres = null)
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
        $movie['poster_path'] = !isset($movie['poster_path']) ? url('images/no-img-poster.jpg')
        : "https://image.tmdb.org/t/p/w500/{$movie['poster_path']}";

        $movie['backdrop_path'] = !isset($movie['backdrop_path']) ? url('images/no-img-backdrop.jpg')
        : "https://image.tmdb.org/t/p/w500/{$movie['backdrop_path']}";

        // convert genres to string and separete first one
        if (isset($movie['genres']) && count($movie['genres'])) {
            $movie['genres_string'] = implode(', ', array_column($movie['genres'], 'name'));
            $movie['first_genre'] = $movie['genres'][0]['name'];
        }

        return $movie;
    }
}
