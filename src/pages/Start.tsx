/* eslint-disable jsx-a11y/control-has-associated-label */
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removefromStorage } from '../lib/storage';
import userStore from '../stores/userStore';

export const StartPage = observer(() => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Start {count}</h1>

      <button
        type="button"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
      <br />

      <button
        type="button"
        onClick={async () => {
          userStore.setToken = '';
          await removefromStorage('token');
          navigate('/login');
        }}
      >
        Logout
      </button>
    </>
  );
});

export default StartPage;
