import React from 'react';
import { shape, string, func, arrayOf } from 'prop-types';

import getMusics from '../../services/musicsAPI';

import Loading from '../../components/Loading/Loading';
import AlbumTitle from './AlbumTitle';
import TrackList from './TrackList';

export default class Album extends React.Component {
  state = {
    isLoading: false,
    albumTracks: [],
    artistName: '',
    collectionName: '',
  };

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { history, fetchFavoriteTracks } = this.props;
    const { pathname } = history.location;
    const albumId = pathname.split('/')[2];

    this.setState({ isLoading: true });
    const musicsResponse = await getMusics(albumId);
    fetchFavoriteTracks();
    this.setState({ isLoading: false });

    const tracks = musicsResponse.filter((album) => album.trackName);

    this.setState({
      albumTracks: [...tracks],
      artistName: musicsResponse[0].artistName,
      collectionName: musicsResponse[0].collectionName,
    });
  };

  render() {
    const {
      albumTracks,
      artistName,
      collectionName,
      isLoading,
    } = this.state;

    const { favoriteTracks, fetchFavoriteTracks } = this.props;

    return (
      <div
        data-testid="page-album"
        className="px-6 max-w-xl mx-auto"
      >
        {isLoading
          ? <Loading />
          : (
            <div>
              <AlbumTitle
                collectionName={ collectionName }
                artistName={ artistName }
              />

              <TrackList
                albumTracks={ albumTracks }
                fetchFavoriteTracks={ fetchFavoriteTracks }
                favoriteTracks={ favoriteTracks }
              />
            </div>
          )}
      </div>
    );
  }
}

Album.defaultProps = {
  favoriteTracks: [],
};

Album.propTypes = {
  history: shape({
    location: shape({ pathname: string }),
  }).isRequired,

  favoriteTracks: arrayOf(shape({})),

  fetchFavoriteTracks: func.isRequired,
};
