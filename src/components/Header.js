import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  state = {
    username: '',
    isLoading: true,
  };

  async componentDidMount() {
    const { name } = await getUser();

    this.setState({
      username: name,
      isLoading: false,
    });
  }

  render() {
    const { username, isLoading } = this.state;

    return (
      <div>
        {isLoading
          ? <Loading />
          : (
            <header data-testid="header-component">
              <p data-testid="header-user-name">{username}</p>
            </header>
          )}
      </div>
    );
  }
}
