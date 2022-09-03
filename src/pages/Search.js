import { string, number, shape, arrayOf, func, bool } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default class Search extends React.Component {
  render() {
    const {
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
  artist: '',
};

Search.propTypes = {
  artist: string,
  searchedArtist: string.isRequired,

  artistAlbums: arrayOf(
    shape({
      artistId: number,
      artistName: string,
      collectionId: number,
      collectionName: string,
      collectionPrice: number,
      artworkUrl100: string,
      releaseDate: string,
      trackCount: number,
    }),
  ).isRequired,

  artistNotFound: bool.isRequired,
  handleChange: func.isRequired,
  searchArtist: func.isRequired,
};
