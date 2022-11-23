import { string } from 'prop-types';
import React from 'react';

export default class AlbumTitle extends React.Component {
  render() {
    const { collectionName, artistName } = this.props;

    return (
      <div className="text-center mb-5">
        <h2
          data-testid="artist-name"
          className="text-teal-600 font-bold uppercase text-2xl"
        >
          {`${collectionName} - ${artistName}`}
        </h2>
      </div>
    );
  }
}

AlbumTitle.propTypes = {
  collectionName: string.isRequired,
  artistName: string.isRequired,
};
