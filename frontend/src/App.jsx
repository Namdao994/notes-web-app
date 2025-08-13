import {Navigate, Outlet, Route, Routes} from 'react-router';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import MainLayout from './layouts/MainLayout/MainLayout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';

const ProtectedRoutes = () => {
  const user = localStorage.getItem('user');
  console.log(user);
  if (!user) return <Navigate to='/login' replace />;
  return <Outlet />;
};

const PublicRoutes = () => {
  const user = localStorage.getItem('user');
  console.log(user);
  if (!user) return <Outlet />;
  return <Navigate to='/' replace />;
};

const App = () => {
  return (
    <Routes>
      {/* Protected route */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<MainLayout />}>
          <Route path='/' element={<DashboardPage />} />
        </Route>
      </Route>

      {/* Public route */}
      <Route element={<PublicRoutes />}>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
