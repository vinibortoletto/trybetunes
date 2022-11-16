import React from 'react';
import PropTypes, { string } from 'prop-types';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import Logo from './Logo';
import Navigation from './Navigation';

export default class Header extends React.Component {
  render() {
    const { userName, pathname } = this.props;

    return (
      <header
        data-testid="header-component"
        className="bg-teal-900 px-4 mb-10"
      >
        <div className="">
          <div className="max-w-7xl mx-auto flex justify-between py-6">
            <Link to="/">
              <Logo />
            </Link>

            <UserInfo userName={ userName } />
          </div>

          <Navigation pathname={ pathname } />
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
  pathname: string.isRequired,
};
