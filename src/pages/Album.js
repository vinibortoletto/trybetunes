import { shape, string } from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class Album extends React.Component {
  state = {
    isLoading: false,
    albumTracks: [],
    artistName: '',
    collectionName: '',
    favoriteTracks: [],
  };

  componentDidMount() {
    this.fetchMusics();
  }

  fetchFavoriteTracks = async () => {
    const response = await getFavoriteSongs();
    this.setState({ favoriteTracks: [...response] });
  };

  fetchMusics = async () => {
    const { history } = this.props;
    const { pathname } = history.location;
    const albumId = pathname.split('/')[2];

    this.setState({ isLoading: true });
    const musicsResponse = await getMusics(albumId);
    const favoriteSongsResponse = await getFavoriteSongs();
    this.setState({ isLoading: false });

    const tracks = musicsResponse.filter((album) => album.trackName);

    this.setState({
      albumTracks: [...tracks],
      artistName: musicsResponse[0].artistName,
      collectionName: musicsResponse[0].collectionName,
      favoriteTracks: [...favoriteSongsResponse],
    });
  };

  render() {
    const {
      albumTracks,
      artistName,
      collectionName,
      isLoading,

      favoriteTracks,
    } = this.state;

    const { fetchFavoriteTracks } = this;

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
                    { ...track }
                    albumTracks={ albumTracks }
                    fetchFavoriteTracks={ fetchFavoriteTracks }
                    checked={ favoriteTracks
                      .some((favoriteTrack) => favoriteTrack.trackId === track.trackId) }
                  />
                ))}
              </ul>
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  history: shape({
    location: shape({ pathname: string }),
  }).isRequired,
};
