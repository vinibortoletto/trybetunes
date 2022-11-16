import { string, func, shape } from 'prop-types';
import React from 'react';
import Loading from '../components/Loading/Loading';
import { updateUser } from '../services/userAPI';

export default class ProfileEdit extends React.Component {
  state = { isLoading: false };

  validateSaveButton = () => {
    const {
      userName,
      userEmail,
      userDescription,
      userImage,
    } = this.props;

    return (userName === '')
            || (userEmail === '')
            || (userDescription === '')
            || (userImage === '');
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      userName,
      userEmail,
      userDescription,
      userImage,
      history,
    } = this.props;

    this.setState({ isLoading: true });

    await updateUser({
      name: userName,
      email: userEmail,
      description: userDescription,
      image: userImage,
    });

    history.push('/profile');

    this.setState({ isLoading: false });
  };

  render() {
    const {
      userName,
      userEmail,
      userDescription,
      userImage,
      handleChange,
    } = this.props;

    const { validateSaveButton, handleSubmit } = this;

    const { isLoading } = this.state;

    return (
      <div data-testid="page-profile-edit">
        {isLoading
          ? <Loading />
          : (
            <form onSubmit={ handleSubmit }>
              <label htmlFor="userName">
                Nome:
                <input
                  type="text"
                  data-testid="edit-input-name"
                  name="userName"
                  value={ userName }
                  onChange={ handleChange }
                />
              </label>

              <label htmlFor="userEmail">
                Email:
                <input
                  type="email"
                  data-testid="edit-input-email"
                  name="userEmail"
                  value={ userEmail }
                  onChange={ handleChange }
                />
              </label>

              <label htmlFor="userDescription">
                Description:
                <input
                  type="text"
                  data-testid="edit-input-description"
                  name="userDescription"
                  value={ userDescription }
                  onChange={ handleChange }
                />
              </label>

              <label htmlFor="userImage">
                Image:
                <input
                  type="text"
                  data-testid="edit-input-image"
                  name="userImage"
                  value={ userImage }
                  onChange={ handleChange }
                />
              </label>

              <button
                type="submit"
                data-testid="edit-button-save"
                disabled={ validateSaveButton() }
              >
                Salvar
              </button>
            </form>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  handleChange: func.isRequired,
  userDescription: string.isRequired,
  userEmail: string.isRequired,
  userImage: string.isRequired,
  userName: string.isRequired,
  history: shape({}).isRequired,
};
