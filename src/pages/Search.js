import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  render() {
    const { username, artist, handleChange } = this.props;
    const artistMinLength = 2;

    return (
      <div data-testid="page-search">
        <Header username={ username } />

        <label htmlFor="artist">
          Pesquise seu artiste ou cantore favorite:
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ handleChange }
            name="artist"
            value={ artist }
          />
        </label>

        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ artist.length < artistMinLength }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

Search.defaultProps = {
  username: '',
  artist: '',
};

Search.propTypes = {
  username: PropTypes.string,
  artist: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};
