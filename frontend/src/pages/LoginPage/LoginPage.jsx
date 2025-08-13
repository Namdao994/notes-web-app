import {Flex, Form, Input, Button, Typography} from 'antd';
import {MailOutlined, KeyOutlined} from '@ant-design/icons';
import {Link, useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {login, resetLoginState} from '../../features/user/userSlice';
import {useEffect} from 'react';
import useNotification from '../../hooks/useNotification';
const {Title, Text} = Typography;
const LoginPage = () => {
  const dispatch = useDispatch();
  const {status, user} = useSelector((state) => state.user);
  const {contextHolder, openNotification} = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    if (status.login === 'failed') {
      openNotification('error', 'Login failed', 'Invalid email or password. Please try again.');
      dispatch(resetLoginState());
    }
    if (status.login === 'succeeded') {
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(resetLoginState());
      navigate('/');
    }
  }, [status, openNotification, user, navigate, dispatch]);

  const handleSubmitForm = (userInfo) => {
    console.log(userInfo);
    dispatch(login(userInfo));
  };

  return (
    <Flex vertical align='center' justify='center' style={{flex: 1}}>
      {contextHolder}
      <Title>Login</Title>
      <Form
        name='login-form'
        initialValues={{remember: true}}
        autoComplete='off'
        layout='vertical'
        style={{width: '100%', maxWidth: 350, padding: '0 20px'}}
        onFinish={handleSubmitForm}
        disabled={status.login === 'loading'}
      >
        <Form.Item label='Email' name='email' rules={[{required: true, message: 'Please input your email!'}]}>
          <Input placeholder='Email' prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item label='Password' name='password' rules={[{required: true, message: 'Please input your password!'}]}>
          <Input.Password placeholder='Password' prefix={<KeyOutlined />} />
        </Form.Item>

        <Form.Item label={null}>
          <Flex vertical gap='small'>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              style={{width: '100%'}}
              loading={status.login === 'loading'}
            >
              Login
            </Button>
            <Text>
              Not register yes?{' '}
              <Link
                to='/signup'
                style={{
                  textDecoration: 'underline',
                  pointerEvents: status.login === 'loading' ? 'none' : 'auto',
                  opacity: status.login === 'loading' ? 0.5 : 1,
                  cursor: status.login === 'loading' ? 'not-allowed' : 'pointer',
                }}
              >
                Create an account
              </Link>
            </Text>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default LoginPage;
