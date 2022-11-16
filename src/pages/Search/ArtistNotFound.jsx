import React from 'react';
import { TbMusicOff } from 'react-icons/tb';

export default class ArtistNotFound extends React.Component {
  render() {
    return (
      <div>
        <TbMusicOff className="text-7xl mx-auto mb-4 text-neutral-600" />
        <p className="text-xl">Nenhum álbum foi encontrado</p>
      </div>
    );
  }
}
