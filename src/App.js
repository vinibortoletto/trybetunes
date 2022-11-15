import React from 'react';
import { shape } from 'prop-types';
import { createUser, getUser } from './services/userAPI';
import { getFavoriteSongs } from './services/favoriteSongsAPI';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import Header from './components/Header/Header';
import Routes from './routes/Routes';
import Loading from './components/Loading/Loading';

class App extends React.Component {
  state = {
    isLoading: false,
    isSaveButtonDisabled: true,

    userName: '',
    userEmail: '',
    userDescription: '',
    userImage: '',

    artist: '',
    searchedArtist: '',
    artistAlbums: [],
    artistNotFound: false,
    favoriteTracks: [],
  };

  componentDidMount() {
    this.retrieveUser();
    this.fetchFavoriteTracks();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleLogin = async () => {
    const {
      userName,
      userEmail,
      userDescription,
      userImage,
    } = this.state;

    const userInfo = {
      name: userName,
      email: userEmail,
      description: userDescription,
      image: userImage,
    };

    this.setState({ isLoading: true });
    await createUser(userInfo);
    this.setState({ isLoading: false });
  };

  retrieveUser = async () => {
    this.setState({ isLoading: true });
    const { name, email, description, image } = await getUser();
    this.setState({ isLoading: false });

    this.setState({
      userName: name,
      userEmail: email,
      userDescription: description,
      userImage: image,
    });
  };

  searchArtist = async () => {
    const { artist } = this.state;
    this.setState({ searchedArtist: artist });

    this.setState({ isLoading: true });
    const response = await searchAlbumsAPI(artist);
    this.setState({ isLoading: false });

    this.setState({
      artist: '',
      artistAlbums: [...response],
      artistNotFound: !response.length > 0,
    });
  };

  fetchFavoriteTracks = async () => {
    const response = await getFavoriteSongs();
    this.setState({ favoriteTracks: response });
  };

  render() {
    const {
      state,
      handleLogin,
      handleChange,
      searchArtist,
      fetchFavoriteTracks,
    } = this;

    const {
      isLoading,
      userName,
    } = this.state;

    const { location: { pathname } } = this.props;

    return (
      <div>
        {isLoading
          ? <Loading />
          : (
            <>
              <Header pathname={ pathname } userName={ userName } />
              <Routes
                state={ { ...state } }
                handleChange={ handleChange }
                handleLogin={ handleLogin }
                searchArtist={ searchArtist }
                fetchFavoriteTracks={ fetchFavoriteTracks }
              />
            </>
          )}
      </div>

    );
  }
}

App.defaultProps = {
  location: {},
};

App.propTypes = {
  location: shape({}),
};

export default App;
