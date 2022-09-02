import { string, number, shape } from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  state = {
    isLoading: false,
    favoriteTracks: [],
  };

  componentDidMount() {
    this.fetchFavoriteTracks();
  }

  fetchFavoriteTracks = async () => {
    const response = await getFavoriteSongs();
    this.setState({ favoriteTracks: [...response] });
  };

  handleChange = async ({ target }) => {
    this.setState({ isLoading: true });

    const { track } = this.props;

    if (target.checked) {
      await addSong(track);
      await this.fetchFavoriteTracks();
    } else {
      // removeSong
    }
    this.setState({ isLoading: false });
  };

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;

    const { isLoading, favoriteTracks } = this.state;
    const { handleChange } = this;

    return (
      <li>
        {isLoading && <Loading />}

        <div>
          <p>{trackName}</p>
          <audio controls data-testid="audio-component">
            <track kind="captions" />
            <source src={ previewUrl } type="audio/ogg" />
          </audio>

          <div>
            <label htmlFor={ trackId }>
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                id={ trackId }
                checked={ favoriteTracks
                  .some((favoriteTrack) => favoriteTrack.trackId === trackId) }
                onChange={ handleChange }
              />
              Favorita
            </label>
          </div>
        </div>
      </li>
    );
  }
}

MusicCard.defaultProps = {
  previewUrl: '',
  trackName: '',
  trackId: 0,
};

MusicCard.propTypes = {
  previewUrl: string,
  trackName: string,
  trackId: number,
  track: shape({}).isRequired,
};
