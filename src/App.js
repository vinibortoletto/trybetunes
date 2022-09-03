import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { createUser, getUser } from './services/userAPI';
import { getFavoriteSongs } from './services/favoriteSongsAPI';
import searchAlbumsAPI from './services/searchAlbumsAPI';

import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';
import Header from './components/Header';

class App extends React.Component {
  state = {
    isLoading: false,

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
      userEmail,
      userDescription,
      userImage,
    } = this.state;

    return (
      <div>
        {isLoading
          ? <Loading />
          : (
            <>
              <Header userName={ userName } />
              <Switch>
                <Route
                  exact
                  path="/search"
                  render={ () => (
                    <Search
                      { ...state }
                      handleChange={ handleChange }
                      searchArtist={ searchArtist }
                    />
                  ) }
                />

                <Route
                  exact
                  path="/album/:id"
                  render={ (props) => (
                    <Album
                      { ...props }
                      { ...state }
                      fetchFavoriteTracks={ fetchFavoriteTracks }
                    />
                  ) }
                />

                <Route
                  exact
                  path="/favorites"
                  render={ () => (
                    <Favorites
                      { ...state }
                      fetchFavoriteTracks={ fetchFavoriteTracks }
                    />
                  ) }
                />

                <Route
                  exact
                  path="/profile"
                  render={ () => (
                    <Profile
                      userName={ userName }
                      userEmail={ userEmail }
                      userDescription={ userDescription }
                      userImage={ userImage }
                    />) }
                />

                <Route exact path="/profile/edit" component={ ProfileEdit } />

                <Route
                  exact
                  path="/"
                  render={ (props) => (
                    <Login
                      { ...props }
                      { ...state }
                      handleLogin={ handleLogin }
                      handleChange={ handleChange }
                    />
                  ) }
                />

                <Route component={ NotFound } />
              </Switch>
            </>
          )}
      </div>

    );
  }
}

export default App;
