import {Flex, Form, Input, Button, Typography} from 'antd';
import {MailOutlined, KeyOutlined} from '@ant-design/icons';
import {Link} from 'react-router';
const {Title, Text} = Typography;
const LoginPage = () => {
  return (
    <Flex vertical align='center' justify='center' style={{flex: 1}}>
      <Title>Login</Title>
      <Form
        name='login-form'
        initialValues={{remember: true}}
        autoComplete='off'
        layout='vertical'
        style={{width: '100%', maxWidth: 350, padding: '0 20px'}}
      >
        <Form.Item label='Email' name='email' rules={[{required: true, message: 'Please input your email!'}]}>
          <Input placeholder='Email' prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item label='Password' name='password' rules={[{required: true, message: 'Please input your password!'}]}>
          <Input.Password prefix={<KeyOutlined />} />
        </Form.Item>

        <Form.Item label={null}>
          <Flex vertical gap='small'>
            <Button type='primary' htmlType='submit' size='large' style={{width: '100%'}}>
              Login
            </Button>
            <Text>
              Not register yes?{' '}
              <Link to='/signup' style={{textDecoration: 'underline'}}>
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
