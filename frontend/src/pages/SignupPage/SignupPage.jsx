import {Flex, Form, Input, Button, Typography} from 'antd';
import {MailOutlined, UserOutlined, KeyOutlined} from '@ant-design/icons';
import {Link} from 'react-router';

const {Title, Text} = Typography;

const SignupPage = () => {
  const handleSubmitForm = (values) => {
    console.log(values);
  };

  return (
    <Flex vertical align='center' justify='center' style={{flex: 1}}>
      <Title>Signup</Title>
      <Form
        name='signup-form'
        initialValues={{remember: true}}
        autoComplete='off'
        layout='vertical'
        style={{width: '100%', maxWidth: 350, padding: '0 20px'}}
        onFinish={handleSubmitForm}
      >
        <Form.Item label='Name' name='name' rules={[{required: true, message: 'Please input your Name!'}]}>
          <Input placeholder='Name' prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item label='Email' name='email' rules={[{required: true, message: 'Please input your email!'}]}>
          <Input placeholder='Email' prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item label='Password' name='password' rules={[{required: true, message: 'Please input your password!'}]}>
          <Input.Password prefix={<KeyOutlined />} />
        </Form.Item>

        <Form.Item label={null}>
          <Flex vertical gap='small'>
            <Button type='primary' htmlType='submit' size='large' style={{width: '100%'}}>
              Signup
            </Button>
            <Text>
              Already have an account?{' '}
              <Link to='/login' style={{textDecoration: 'underline'}}>
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
