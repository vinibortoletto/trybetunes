import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createUser, getUser } from './services/userAPI';

import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';
import searchAlbumsAPI from './services/searchAlbumsAPI';

class App extends React.Component {
  state = {
    username: '',
    isLoading: false,
    artist: '',
    searchedArtist: '',
    artistAlbums: [],
    artistNotFound: false,
  };

  componentDidMount() {
    this.retrieveUser();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleLogin = async () => {
    const { username } = this.state;
    const userInfo = {
      name: username,
    };

    this.setState({ isLoading: true });
    await createUser(userInfo);
    this.setState({ isLoading: false });
  };

  retrieveUser = async () => {
    this.setState({ isLoading: true });
    const { name } = await getUser();
    this.setState({ isLoading: false });

    this.setState({
      username: name,
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

  render() {
    const {
      state,
      handleLogin,
      handleChange,
      searchArtist,
    } = this;
    const { isLoading } = this.state;

    return (
      <div>
        {isLoading
          ? <Loading />
          : (
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
                render={ (props) => (<Album
                  { ...props }
                  { ...state }
                />) }
              />

              <Route exact path="/favorites" component={ Favorites } />

              <Route exact path="/profile" component={ Profile } />

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
          )}
      </div>

    );
  }
}

export default App;
