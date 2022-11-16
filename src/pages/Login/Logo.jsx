import React from 'react';
import trybeTunesLogo from '../../assets/logo.png';

export default class Logo extends React.Component {
  render() {
    return (
      <div>
        <img src={ trybeTunesLogo } alt="logo de trybe tunes" />
      </div>
    );
  }
}
