import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends React.Component {
  state = {
    albumTracks: [],
    artistName: '',
    collectionName: '',
    isLoading: false,
  };

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { isLoading } = this.state;
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
    const { albumTracks, artistName, collectionName, isLoading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />

        {
          isLoading
            ? <Loading />
            : (
              <div>
                <h1 data-testid="artist-name">
                  {artistName}
                </h1>
                <p data-testid="album-name">{`${collectionName} - ${artistName}`}</p>

                <ul>
                  {albumTracks.map((track) => (
                    <MusicCard key={ track.trackName } { ...track } />
                  ))}
                </ul>
              </div>
            )
        }

      </div>
    );
  }
}

Album.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

/*
    Liste todas as músicas do álbum na tela. Para isso, crie um componente chamado MusicCard que deverá exibir o nome da música (propriedade trackName no objeto recebido pela API) e um player para tocar o preview da música (propriedade previewUrl no objeto recebido pela API).

*/
