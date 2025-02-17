import { Routes, Route } from 'react-router';
import HomePage from '../pages/HomePage';
import UserProfilePage from '../pages/UserProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import ArtilclePage from '../pages/ArtilclePage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/articles/:article_id' element={<ArtilclePage />} />
      <Route path='/profile' element={<UserProfilePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
