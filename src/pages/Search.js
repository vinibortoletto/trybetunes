import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  render() {
    const { username } = this.props;

    return (
      <div data-testid="page-search">
        <Header username={ username } />
        Search
      </div>
    );
  }
}

Search.defaultProps = {
  username: '',
};

Search.propTypes = {
  username: PropTypes.string,
};
