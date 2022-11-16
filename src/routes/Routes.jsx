import { func, shape } from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search/Search';

export default class Routes extends React.Component {
  render() {
    const {
      state,
      handleChange,
      handleLogin,
      searchArtist,
      fetchFavoriteTracks,
    } = this.props;

    return (
      <Switch>
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

        <Route
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
          path="/favorites"
          render={ () => (
            <Favorites
              { ...state }
              fetchFavoriteTracks={ fetchFavoriteTracks }
            />
          ) }
        />

        <Route
          path="/profile"
          render={ () => (
            <Profile
              { ...state }
            />) }
        />

        <Route
          path="/profile/edit"
          render={ (props) => (
            <ProfileEdit
              { ...props }
              { ...state }
              handleChange={ handleChange }
            />) }
        />

        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

Routes.propTypes = {
  state: shape({}).isRequired,
  handleChange: func.isRequired,
  handleLogin: func.isRequired,
  searchArtist: func.isRequired,
  fetchFavoriteTracks: func.isRequired,
};
