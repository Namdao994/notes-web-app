import {Route, Routes} from 'react-router';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import MainLayout from './layouts/MainLayout/MainLayout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<DashboardPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Route>
    </Routes>
  );
};

export default App;
