import { Route, Routes } from 'react-router-dom';
import { StartPage } from './pages/Start';
// import userStore from './stores/userStore';

function Main() {
  return (
    <>
      {/* {userStore} */}
      <Routes>
        <Route path="/" element={<StartPage />} />
      </Routes>
    </>
  );
}

export default Main;
