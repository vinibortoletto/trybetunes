import React from 'react';
import './style.css';

export default class Loading extends React.Component {
  render() {
    return (
      <div className=" w-full h-screen flex justify-center items-center">
        <div className="lds-ripple">
          <div />
          <div />
        </div>
      </div>
    );
  }
}
