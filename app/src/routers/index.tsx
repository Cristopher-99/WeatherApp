import { BrowserRouter, Route, Routes, Navigate }  from 'react-router-dom';
import { ProtectedRoute } from '../modules/protected';
import Login from '../pages/login';
import Home from '../pages/home';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${BASE_URL}/dashboard`} element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path={`${BASE_URL}/login`} element={<Login />} />
        <Route path='*' element={<Navigate to={`${BASE_URL}/login`} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;