import { string } from 'prop-types';
import React from 'react';
import { FaUserAlt } from 'react-icons/fa';

export default class UserInfo extends React.Component {
  render() {
    const { userName } = this.props;

    return (
      <div
        className="w-48 flex justify-between items-center bg-neutral-50 p-2 rounded-full"
      >
        <div
          className="rounded-full w-8 h-8 bg-teal-600 flex justify-center items-center"
        >
          <FaUserAlt />
        </div>

        <p
          className="pr-6 text-neutral-900 "
          data-testid="header-user-name"
        >
          {userName}
        </p>
      </div>
    );
  }
}

UserInfo.propTypes = {
  userName: string.isRequired,
};
