import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends React.Component {
  state = {
    username: '',
    isLoading: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username } = this.state;
    const userObject = { name: username };

    this.setState({ isLoading: true });
    await createUser(userObject);
    this.setState({ isLoading: false });

    const { history } = this.props;
    history.push('/search');
  };

  render() {
    const { username, isLoading } = this.state;
    const { handleChange, handleSubmit } = this;
    const usernameMinLength = 3;

    return (
      <div data-testid="page-login">
        <h1>Login</h1>

        {isLoading
          ? <Loading />
          : (
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
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
