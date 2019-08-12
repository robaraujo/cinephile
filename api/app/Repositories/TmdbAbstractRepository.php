<?php

namespace App\Repositories;

use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use Illuminate\Http\Request;
use Kevinrob\GuzzleCache\CacheMiddleware;
use Kevinrob\GuzzleCache\Storage\Psr6CacheStorage;
use Kevinrob\GuzzleCache\Strategy\GreedyCacheStrategy;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;

abstract class TmdbAbstractRepository
{

    public $api_key;
    public $cache;

    public function __construct()
    {
        $this->api_key = config('tmdb.api_key');
        $this->cache = config('tmdb.cache');
    }

    /**
     * Get data from TMDB API
     *
     * @return Response
     */
    public function call($endpoint, $params = [], $method = 'GET')
    {
        // start cache
        $client = $this->getGuzzleFileCachedClient();

        // transform params to string
        $params_url = count($params) ? '&' . http_build_query($params) : '';

        // get data from api
        $response = $client->request($method, "https://api.themoviedb.org/3{$endpoint}?api_key={$this->api_key}&language=en-US{$params_url}");
        return json_decode($response->getBody(), true);
    }

    /**
     * GuzzleClient with cache in filesystem
     *
     * @return Guzzle Http Client
     */
    private function getGuzzleFileCachedClient()
    {
        // Create a stack and set cache time
        $stack = HandlerStack::create();
        $ttl = $this->cache['ttl'];

        // create folder cache inside storage
        $requestCacheFolderName = $this->cache['folder'];
        $cacheFolderPath = base_path() . "/storage";

        // Instantiate the cache storage:
        $storage = new Psr6CacheStorage(
            new FilesystemAdapter(
                $requestCacheFolderName,
                $ttl,
                $cacheFolderPath
            )
        );

        // Add Cache Method
        $stack->push(
            new CacheMiddleware(
                new GreedyCacheStrategy(
                    $storage,
                    $ttl
                )
            ),
            'greedy-cache'
        );

        // new client with cache
        return new Client(['handler' => $stack]);
    }
}
