import { func, string } from 'prop-types';
import React from 'react';

export default class Form extends React.Component {
  render() {
    const {
      handleChange,
      artist,
      searchArtist,
    } = this.props;

    const artistMinLength = 2;

    return (
      <form
        onSubmit={ searchArtist }
        className="max-w-xs mx-auto mb-10"
      >
        <label htmlFor="artist">
          <span className="absolute -left-full">Pesquise um artista:</span>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ handleChange }
            name="artist"
            value={ artist }
            className="w-full p-2 rounded bg-neutral-600 mb-2 placeholder:italic"
            placeholder="Pesquise um artista"
          />
        </label>

        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ artist.length < artistMinLength }
          className="bg-teal-600 p-2 rounded font-bold w-full"
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  handleChange: func.isRequired,
  artist: string.isRequired,
  searchArtist: func.isRequired,
};
