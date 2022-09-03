import React from 'react';
import { shape, string, func, arrayOf } from 'prop-types';

import getMusics from '../services/musicsAPI';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

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
      <div data-testid="page-album">
        <Header />
        {isLoading
          ? <Loading />
          : (
            <div>
              <h1 data-testid="artist-name">
                {artistName}
              </h1>
              <p data-testid="album-name">{`${collectionName} - ${artistName}`}</p>

              <ul>
                {albumTracks.map((track) => (
                  <MusicCard
                    key={ track.trackName }
                    track={ track }
                    fetchFavoriteTracks={ fetchFavoriteTracks }
                    checked={ favoriteTracks
                      .some(({ trackId }) => trackId === track.trackId) }

                  />
                ))}
              </ul>
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
