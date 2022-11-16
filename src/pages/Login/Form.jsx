import { func, shape, string } from 'prop-types';
import React from 'react';

export default class Form extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const { handleLogin, history } = this.props;
    handleLogin();
    history.push('/search');
  };

  render() {
    const userNameMinLength = 3;
    const { userName, handleChange } = this.props;

    return (
      <form
        onSubmit={ this.handleSubmit }
        className="flex flex-col gap-2"
      >
        <label
          htmlFor="userName"
          className="w-full"
        >
          <span className="absolute -left-full bg-neutral-900">
            Nome de usuário:
          </span>

          <input
            type="text"
            data-testid="login-name-input"
            name="userName"
            value={ userName }
            onChange={ handleChange }
            className="w-full p-2 rounded bg-neutral-600"
            placeholder="Nome de usuário"
          />
        </label>

        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ userName.length < userNameMinLength }
          className="bg-teal-600 p-2 rounded font-bold"
        >
          Entrar
        </button>
      </form>
    );
  }
}

Form.defaultProps = {
  handleLogin: () => {},
  history: {},
};

Form.propTypes = {
  handleLogin: func,
  history: shape({ push: func }),
  userName: string.isRequired,
  handleChange: func.isRequired,
};
