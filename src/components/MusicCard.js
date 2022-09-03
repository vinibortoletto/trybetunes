import { string, number, bool, shape, func } from 'prop-types';
import React from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  state = {
    isLoading: false,
  };

  handleChange = async ({ target }) => {
    this.setState({ isLoading: true });
    const { fetchFavoriteTracks, track } = this.props;

    if (target.checked) await addSong(track);
    else await removeSong(track);

    await fetchFavoriteTracks();
    this.setState({ isLoading: false });
  };

  render() {
    const {
      track: {
        trackName,
        previewUrl,
        trackId,
      },
      checked,
    } = this.props;

    const {
      isLoading,
    } = this.state;

    const {
      handleChange,
    } = this;

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
                checked={ checked }
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
  track: shape({}).isRequired,
  previewUrl: string,
  trackName: string,
  trackId: number,
  checked: bool.isRequired,
  fetchFavoriteTracks: func.isRequired,
};
