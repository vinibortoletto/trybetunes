import { func, arrayOf, shape } from 'prop-types';
import React from 'react';
import MusicCard from '../../components/MusicCard';

export default class TrackList extends React.Component {
  render() {
    const {
      albumTracks,
      fetchFavoriteTracks,
      favoriteTracks,
    } = this.props;

    return (
      <ul>
        {albumTracks.map((track) => (
          <MusicCard
            key={ track.trackName }
            track={ track }
            fetchFavoriteTracks={ fetchFavoriteTracks }
            checked={ favoriteTracks
              .some(({ trackId }) => trackId === track.trackId) }

          />
        ))}
      </ul>
    );
  }
}

TrackList.propTypes = {
  albumTracks: arrayOf(shape({})).isRequired,
  fetchFavoriteTracks: func.isRequired,
  favoriteTracks: arrayOf(shape({})).isRequired,
};
