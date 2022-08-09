import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { saveToStorage } from '../lib/storage';

export const LoginPage = observer(() => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login(email: string, password: string) {
    try {
      const loginResponse = await api.req('login', {
        body: { email, password }
      });
      await saveToStorage('token', {
        token: loginResponse?.data.token
      });

      navigate('/');
    } catch (e) {
      console.log('error', e);
    }
  }

  return (
    <form action="">
      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        type="submit"
        name="Login"
        onClick={(e) => {
          e.preventDefault();
          login(email, password);
        }}
      />
    </form>
  );
});

export default LoginPage;
