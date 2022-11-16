import { arrayOf, shape, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default class ArtistAlbumList extends React.Component {
  render() {
    const {
      searchedArtist,
      artistAlbums,
    } = this.props;

    return (
      <div>
        <p className="text-xl text-center mb-10">
          Resultado de álbuns de:
          <span className="text-teal-600 font-bold uppercase ml-2">{searchedArtist}</span>
        </p>

        <ul className="grid justify-items-center lg:grid-cols-2 gap-4">
          {
            artistAlbums.map(({
              artistName,
              collectionId,
              collectionName,
              artworkUrl100,
            }) => (
              <li
                key={ collectionId }
                className="w-full"
              >
                <Link
                  to={ `/album/${collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                  className="w-full max-w-lg bg-neutral-800 shadow opacity-90
                  hover:opacity-100 rounded flex transition-all"
                >
                  <img
                    className="rounded-tl rounded-bl object-cover"
                    src={ artworkUrl100 }
                    alt={ artistName }
                  />

                  <div className="text-sm w-full m-auto p-6">
                    <p className="font-bold">{artistName}</p>
                    <p className="text-neutral-500 ">
                      {collectionName}
                    </p>
                  </div>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

ArtistAlbumList.propTypes = {
  searchedArtist: string.isRequired,
  artistAlbums: arrayOf(shape({})).isRequired,
};
