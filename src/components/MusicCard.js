import PropTypes from 'prop-types';
import React from 'react';

export default class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl } = this.props;

    return (
      <li>
        <p>{trackName}</p>
        <audio controls data-testid="audio-component">
          <track kind="captions" />
          <source src={ previewUrl } type="audio/ogg" />
        </audio>
      </li>
    );
  }
}

MusicCard.defaultProps = {
  previewUrl: '',
  trackName: '',
};

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
};
