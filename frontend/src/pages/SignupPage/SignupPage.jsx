import {Flex, Form, Input, Button, Typography} from 'antd';
import {MailOutlined, UserOutlined, KeyOutlined} from '@ant-design/icons';
import {Link} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import useNotification from '../../hooks/useNotification';
import {resetSignupState, signup} from '../../features/user/userSlice';
import {useEffect} from 'react';

const {Title, Text} = Typography;
const {useForm} = Form;
const SignupPage = () => {
  const dispatch = useDispatch();
  const {status, message} = useSelector((state) => state.user);
  const {contextHolder, openNotification} = useNotification();
  const [signupForm] = useForm();

  const handleSubmitForm = async (userInfo) => {
    dispatch(signup(userInfo));
  };

  useEffect(() => {
    if (status.signup === 'failed') {
      openNotification('error', 'Invalid Email', message.signup);
      dispatch(resetSignupState());
    }
    if (status.signup === 'succeeded') {
      openNotification('success', 'Success register', message.signup);
      signupForm.resetFields();
      dispatch(resetSignupState());
    }
  }, [status, message, openNotification, signupForm, dispatch]);

  return (
    <Flex vertical align='center' justify='center' style={{flex: 1}}>
      {contextHolder}
      <Title>Signup</Title>
      <Form
        name='signup-form'
        initialValues={{remember: true}}
        autoComplete='off'
        layout='vertical'
        style={{width: '100%', maxWidth: 350, padding: '0 20px'}}
        onFinish={handleSubmitForm}
        disabled={status.signup === 'loading'}
        form={signupForm}
      >
        <Form.Item label='Name' name='name' rules={[{required: true, message: 'Please input your Name!'}]}>
          <Input placeholder='Name' prefix={<UserOutlined />} />
        </Form.Item>

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
              loading={status.signup === 'loading'}
            >
              Signup
            </Button>
            <Text>
              Already have an account?{' '}
              <Link
                to='/login'
                style={{
                  textDecoration: 'underline',
                  pointerEvents: status.signup === ' loading' ? 'none' : 'auto',
                  opacity: status.signup === ' loading' ? 0.5 : 1,
                  cursor: status.signup === ' loading' ? 'not-allowed' : 'pointer',
                }}
              >
                Login
              </Link>
            </Text>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default SignupPage;
