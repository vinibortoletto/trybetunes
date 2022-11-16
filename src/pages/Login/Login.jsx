import React from 'react';
import { string, func, shape } from 'prop-types';
import Logo from './Logo';
import Form from './Form';

export default class Login extends React.Component {
  render() {
    const {
      userName,
      handleChange,
      history,
    } = this.props;

    return (
      <div
        data-testid="page-login"
        className="px-6 h-screen flex flex-col items-center justify-center gap-10"
      >
        <Logo />
        <Form
          userName={ userName }
          handleChange={ handleChange }
          history={ history }
        />
      </div>
    );
  }
}

Login.defaultProps = {
  userName: '',
};

Login.propTypes = {
  userName: string,
  handleChange: func.isRequired,
  history: shape().isRequired,
};
