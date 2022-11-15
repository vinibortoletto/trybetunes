import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaUserAlt } from 'react-icons/fa';
import trybeTunesLogo from '../assets/logo.png';

export default class Header extends React.Component {
  render() {
    const { userName } = this.props;

    return (
      <header
        data-testid="header-component"
        className="bg-gradient-to-r from-teal-600 to-green-600 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between py-6">
            <div className="w-24">
              <img src={ trybeTunesLogo } alt="logo da trybe tunes" />
            </div>

            <div
              className="w-48 flex justify-between items-center bg-neutral-50 p-2
          rounded-full"
            >
              <div
                className="rounded-full w-8 h-8 bg-teal-600 flex justify-center
          items-center"
              >
                <FaUserAlt />
              </div>
              <p
                className="text-neutral-900 pr-6"
                data-testid="header-user-name"
              >
                {userName}
              </p>
            </div>
          </div>

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
        </div>
      </header>
    );
  }
}

Header.defaultProps = {
  userName: '',
};

Header.propTypes = {
  userName: PropTypes.string,
};
