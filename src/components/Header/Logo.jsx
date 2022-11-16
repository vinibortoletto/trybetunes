import React from 'react';
import trybeTunesLogo from '../../assets/logo.png';

export default class Logo extends React.Component {
  render() {
    return (
      <div className="w-24">
        <img src={ trybeTunesLogo } alt="logo da trybe tunes" />
      </div>
    );
  }
}
