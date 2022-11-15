import React from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link
              to="/search"
              data-testid="link-to-search"
            >
              Pesquisar
            </Link>
          </li>

          <li>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favoritos
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              data-testid="link-to-profile"
            >
              Perfil
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
