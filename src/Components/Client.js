

// Updated Client.js
import React from 'react';
import Avatar from 'react-avatar';
import { useUser } from './UserContext';

const Client = () => {
  const { username } = useUser();

  return (
    <div className='client'>
      <Avatar name={username} size={50} round='14px' />
      <span className='username'>{username}</span>
    </div>
  );
};
export default Client