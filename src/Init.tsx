/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import getToken from './services/authService';
import userStore from './stores/userStore';

function Init(props: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      console.log('called');
      const token = await getToken();

      if (token) {
        userStore.setToken = token;
        navigate('/');
      } else {
        navigate('/login');
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }

  const { children } = props;
  return <>{children}</>;
}

export default Init;
