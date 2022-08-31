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

class App extends React.Component {
  state = {
    username: '',
    isLoading: false,
    artist: '',
  };

  componentDidMount() {
    this.retrieveUser();
  }

  toggleLoading = () => {
    this.setState((prevState) => ({ isLoading: !prevState.isLoading }));
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleLogin = async () => {
    const { username } = this.state;
    const userInfo = {
      name: username,
    };

    this.toggleLoading();
    await createUser(userInfo);
    this.toggleLoading();
  };

  retrieveUser = async () => {
    this.toggleLoading();
    const { name } = await getUser();
    this.setState({
      username: name,
    });
    this.toggleLoading();
  };

  render() {
    const { state, handleLogin, handleChange } = this;
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
                  <Search { ...state } handleChange={ handleChange } />
                ) }
              />

              <Route
                exact
                path="/album/:id"
                render={ (props) => <Album { ...props } /> }
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
