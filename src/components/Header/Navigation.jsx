import { string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {
  render() {
    const { pathname } = this.props;
    const activeButtonStyle = 'bg-teal-700';
    const normalButtonStyle = 'bg-teal-800';

    return (
      <div>
        <ul className="grid grid-cols-3 text-center -mx-4 font-bold">
          <Link
            to="/search"
            data-testid="link-to-search"
          >
            <li
              className={ `hover:bg-teal-700 transition-all p-4 border-r border-teal-600
              ${pathname === '/search' ? activeButtonStyle : normalButtonStyle}` }
            >
              Pesquisar
            </li>
          </Link>

          <Link
            to="/favorites"
            data-testid="link-to-favorites"
          >
            <li
              className={ `hover:bg-teal-700 transition-all p-4 border-r border-teal-600
              ${pathname === '/favorites' ? activeButtonStyle : normalButtonStyle}` }
            >
              Favoritos
            </li>
          </Link>

          <Link
            to="/profile"
            data-testid="link-to-profile"
          >
            <li
              className={ `hover:bg-teal-700 transition-all p-4
              ${pathname === '/profile' ? activeButtonStyle : normalButtonStyle}` }
            >
              Perfil
            </li>
          </Link>
        </ul>
      </div>
    );
  }
}

Navigation.propTypes = {
  pathname: string.isRequired,
};
