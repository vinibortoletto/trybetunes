import PropTypes from 'prop-types';
import React from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  state = {
    favoriteMusic: false,
    isLoading: false,
  };

  handleChange = async ({ target: { checked } }) => {
    const { albumTracks } = this.props;
    this.setState({ favoriteMusic: checked });

    this.setState({ isLoading: true });
    await addSong(albumTracks);
    this.setState({ isLoading: false });
  };

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;

    const { favoriteMusic, isLoading } = this.state;
    const { handleChange } = this;

    return (
      <li>
        {isLoading
          ? <Loading />
          : (
            <>
              <p>{trackName}</p>
              <audio controls data-testid="audio-component">
                <track kind="captions" />
                <source src={ previewUrl } type="audio/ogg" />
              </audio>

              <div>
                <label htmlFor="favoriteMusic">
                  <input
                    type="checkbox"
                    data-testid={ `checkbox-music-${trackId}` }
                    name="favoriteMusic"
                    id="favoriteMusic"
                    checked={ favoriteMusic }
                    onChange={ handleChange }
                  />
                  Favorita
                </label>
              </div>
            </>
          )}
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
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.number,
  albumTracks: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};
