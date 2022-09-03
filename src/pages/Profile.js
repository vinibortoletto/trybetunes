import { string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default class Profile extends React.Component {
  render() {
    const {
      userName,
      userEmail,
      userDescription,
      userImage,
    } = this.props;

    return (
      <div data-testid="page-profile">
        <div>
          <img src={ userImage } alt={ userName } data-testid="profile-image" />
          <p>{userName}</p>
          <p>{userEmail}</p>
          <p>{userDescription}</p>
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  userName: string.isRequired,
  userEmail: string.isRequired,
  userDescription: string.isRequired,
  userImage: string.isRequired,
};
