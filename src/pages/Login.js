import React from 'react';
import { string, func, shape } from 'prop-types';

export default class Login extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const { handleLogin, history } = this.props;
    handleLogin();
    history.push('/search');
  };

  render() {
    const { handleSubmit } = this;
    const { userName, handleChange } = this.props;
    const userNameMinLength = 3;

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form onSubmit={ handleSubmit }>
          <label htmlFor="userName">
            Nome de usuário:
            <input
              type="text"
              data-testid="login-name-input"
              name="userName"
              value={ userName }
              onChange={ handleChange }
            />
          </label>

          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ userName.length < userNameMinLength }
          >
            Entrar
          </button>
        </form>
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
  handleLogin: func.isRequired,
  history: shape({ push: func }).isRequired,
};
