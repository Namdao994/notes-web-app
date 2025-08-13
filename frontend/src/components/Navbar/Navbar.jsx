import {Flex, Layout, Space, Typography, theme, Input, Avatar, Dropdown} from 'antd';
import {Link, useNavigate} from 'react-router';
import {BiSolidMessageEdit} from 'react-icons/bi';
import {UserOutlined, LogoutOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {logout} from '../../features/user/userSlice';
const {Header} = Layout;
const {Search} = Input;
const {Title} = Typography;
export const HEADER_HEIGHT = 64;

const Navbar = () => {
  const {
    token: {colorBgContainer},
  } = theme.useToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickItemDropdownAvatar = ({key}) => {
    if (key === 'Profile') {
      //
    }
    if (key === 'Logout') {
      dispatch(logout());
      navigate('/login');
      localStorage.clear();
    }
  };

  const itemDropdownAvatar = [
    {
      key: 'Profile',
      label: 'Profile',
      icon: <UserOutlined />,
    },
    {
      key: 'Logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <Header style={{background: colorBgContainer, height: HEADER_HEIGHT}}>
      <Flex justify='space-between' align='center' style={{height: '100%'}}>
        <Title style={{fontSize: 24, margin: 0}}>
          <Link
            to='/'
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Space align='center' size='small'>
              <BiSolidMessageEdit />
              Notes App
            </Space>
          </Link>
        </Title>
        <Search placeholder='Search Note' enterButton size='large' loading style={{maxWidth: 300}} />

        <Dropdown menu={{items: itemDropdownAvatar, onClick: onClickItemDropdownAvatar}}>
          <Avatar style={{verticalAlign: 'middle', cursor: 'pointer'}} size='large'>
            NA
          </Avatar>
        </Dropdown>
      </Flex>
    </Header>
  );
};

export default Navbar;
