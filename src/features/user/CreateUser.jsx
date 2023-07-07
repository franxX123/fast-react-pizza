import { useState } from 'react';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// NOTE: this is the action creator
import { updateUserName } from "../user/userSlice"

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatchUsername = useDispatch();
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    
    // NOTE: dispatch takes an action creator with the specified parameters
    dispatchUsername(updateUserName(username));

    if (!username) {
      return null;
    }

    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='mb-4 md:text-base text-sm text-stone-600'>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        className='w-72 input mb-6'
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          {/* TODO: add a handler */}
          <Button type="primary" disabled={false}>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
