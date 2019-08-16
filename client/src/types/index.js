import PropTypes, { shape, number, string } from 'prop-types';

export const movieType = shape({
  id: number,
  poster: string,
  vote_average: number,
  release_date: string,
  first_genre: string,
  poster_path: string,
  backdrop_path: string,
  title: string,
});

export const matchType = PropTypes.shape({
  params: PropTypes.shape({
    id: PropTypes.node,
  }).isRequired,
});

export default PropTypes;
