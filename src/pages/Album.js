import { shape, string } from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

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

  // toggleLoading = () => {
  //   this.setState((prevState) => ({ isLoading: !prevState.isLoading }));
  // };

  fetchMusics = async () => {
    const { history } = this.props;
    const { pathname } = history.location;
    const albumId = pathname.split('/')[2];

    this.setState({ isLoading: true });
    const response = await getMusics(albumId);
    this.setState({ isLoading: false });

    const tracks = response.filter((album) => album.trackName);

    this.setState({
      albumTracks: [...tracks],
      artistName: response[0].artistName,
      collectionName: response[0].collectionName,
    });
  };

  render() {
    const {
      albumTracks,
      artistName,
      collectionName,
      isLoading,
    } = this.state;

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
                    track={ track }
                    // toggleLoading={ this.toggleLoading }
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
