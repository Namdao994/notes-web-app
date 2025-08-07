import {Layout, Flex} from 'antd';
import Navbar from '../../components/Navbar/Navbar';
import {Outlet} from 'react-router';
const {Footer} = Layout;
export const FOOTER_HEIGHT = 64;
const MainLayout = () => {
  return (
    <Layout>
      <Navbar />
      <Outlet />
      <Footer style={{textAlign: 'center', padding: 0, height: FOOTER_HEIGHT}}>
        <Flex align='center' justify='center' style={{height: '100%'}}>
          <p>Notes App ©{new Date().getFullYear()} Created by Nam Dao</p>
        </Flex>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
