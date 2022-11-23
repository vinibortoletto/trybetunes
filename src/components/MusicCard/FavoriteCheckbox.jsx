import { bool, number, func } from 'prop-types';
import React from 'react';

export default class FavoriteCheckbox extends React.Component {
  render() {
    const { handleChange, trackId, checked } = this.props;

    return (
      <div>
        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            checked={ checked }
            onChange={ handleChange }
            className="mr-2"
          />
          Favorita
        </label>
      </div>
    );
  }
}

FavoriteCheckbox.propTypes = {
  handleChange: func.isRequired,
  trackId: number.isRequired,
  checked: bool.isRequired,
};
