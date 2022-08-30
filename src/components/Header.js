import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Header extends React.Component {
  render() {
    const { username } = this.props;

    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{username}</p>
        <ul>
          <li>
            <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          </li>
          <li>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          </li>
          <li>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </li>
        </ul>

      </header>
    );
  }
}

Header.defaultProps = {
  username: '',
};

Header.propTypes = {
  username: PropTypes.string,
};
