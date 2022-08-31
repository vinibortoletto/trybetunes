import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default class Search extends React.Component {
  render() {
    const {
      username,
      artist,
      searchedArtist,
      artistAlbums,
      artistNotFound,
      handleChange,
      searchArtist,
    } = this.props;
    const artistMinLength = 2;

    return (
      <div data-testid="page-search">
        <Header username={ username } />

        <label htmlFor="artist">
          Pesquise um artista:
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
          onClick={ searchArtist }
        >
          Pesquisar
        </button>

        {artistNotFound && <p>Nenhum álbum foi encontrado</p>}

        {artistAlbums.length > 0 && (
          <div>
            <p>{`Resultado de álbuns de: ${searchedArtist}`}</p>
            <ul>
              {
                artistAlbums.map(({
                  artistName,
                  collectionId,
                  collectionName,
                  artworkUrl100,
                }) => (
                  <li key={ collectionId }>
                    <Link
                      to={ `/album/${collectionId}` }
                      data-testid={ `link-to-album-${collectionId}` }
                    >
                      <img src={ artworkUrl100 } alt={ artistName } />
                      <p>{artistName}</p>
                      <p>{collectionName}</p>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
        )}
        <div />
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
  searchedArtist: PropTypes.string.isRequired,

  artistAlbums: PropTypes.arrayOf(
    PropTypes.shape({
      artistId: PropTypes.number,
      artistName: PropTypes.string,
      collectionId: PropTypes.number,
      collectionName: PropTypes.string,
      collectionPrice: PropTypes.number,
      artworkUrl100: PropTypes.string,
      releaseDate: PropTypes.string,
      trackCount: PropTypes.number,
    }),
  ).isRequired,

  artistNotFound: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  searchArtist: PropTypes.func.isRequired,
};
