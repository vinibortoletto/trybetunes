import React from 'react';
import PropTypes from 'prop-types';

export default class Login extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const { handleLogin, history } = this.props;
    handleLogin();
    history.push('/search');
  };

  render() {
    const { handleSubmit } = this;
    const { username, handleChange } = this.props;
    const usernameMinLength = 3;

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form onSubmit={ handleSubmit }>
          <label htmlFor="username">
            Nome de usuário:
            <input
              type="text"
              data-testid="login-name-input"
              name="username"
              value={ username }
              onChange={ handleChange }
            />
          </label>

          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ username.length < usernameMinLength }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.defaultProps = {
  username: '',
};

Login.propTypes = {
  username: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
