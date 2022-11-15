import { func, shape } from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search';

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
      <>
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
              { ...state }
            />) }
        />

        <Route
          exact
          path="/profile/edit"
          render={ (props) => (
            <ProfileEdit
              { ...props }
              { ...state }
              handleChange={ handleChange }
            />) }
        />

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
      </>
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
