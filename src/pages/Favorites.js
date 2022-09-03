import React from 'react';
import { func, arrayOf, shape } from 'prop-types';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Favorites extends React.Component {
  state = { isLoading: false };

  render() {
    const { isLoading } = this.state;
    const { favoriteTracks, fetchFavoriteTracks } = this.props;

    return (
      <div data-testid="page-favorites">
        {isLoading
          ? <Loading />
          : (
            <>
              <Header />
              <ul>
                {favoriteTracks.map((track) => (
                  <MusicCard
                    key={ track.trackName }
                    track={ track }
                    fetchFavoriteTracks={ fetchFavoriteTracks }
                    checked={ favoriteTracks
                      .some(({ trackId }) => trackId === track.trackId) }
                  />
                ))}
              </ul>
            </>
          )}
      </div>
    );
  }
}

Favorites.propTypes = {
  favoriteTracks: arrayOf(shape({})).isRequired,
  fetchFavoriteTracks: func.isRequired,
};
