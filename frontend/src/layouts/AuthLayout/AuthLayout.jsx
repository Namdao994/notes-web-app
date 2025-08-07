import {Grid, Flex, Layout} from 'antd';
import {Outlet} from 'react-router';
import authLayoutDecor from '../../assets/imgs/auth-layout-decor.jpg';
const {useBreakpoint} = Grid;
const AuthLayout = () => {
  const screen = useBreakpoint();
  return (
    <Layout style={{background: '#fff'}}>
      <Flex style={{height: '100vh'}}>
        {screen.lg && (
          <img className='h-full' src={authLayoutDecor} alt='auth-layout-decor' style={{flex: 1, objectFit: 'cover'}} />
        )}
        <Outlet />
      </Flex>
    </Layout>
  );
};

export default AuthLayout;
