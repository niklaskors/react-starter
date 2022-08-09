/* eslint-disable react/jsx-props-no-spreading */
import { Provider } from 'mobx-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Init from './Init';
import Main from './Main';
import { LoginPage } from './pages/Login';
import stores from './stores';

export function App() {
  return (
    <BrowserRouter>
      <Provider {...stores}>
        <Init>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Main />} />
          </Routes>
        </Init>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
