import { string, number, shape, arrayOf, func, bool } from 'prop-types';
import React from 'react';
import Form from './Form';
import ArtistNotFound from './ArtistNotFound';
import ArtistAlbumList from './ArtistAlbumList';

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

    return (
      <div
        className="flex flex-col items-center px-6"
        data-testid="page-search"
      >
        <Form
          handleChange={ handleChange }
          artist={ artist }
          searchArtist={ searchArtist }
        />

        {artistNotFound && <ArtistNotFound />}

        {artistAlbums.length > 0 && (
          <ArtistAlbumList
            searchedArtist={ searchedArtist }
            artistAlbums={ artistAlbums }
          />
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
