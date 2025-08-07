import {Layout, theme, Empty, Flex, Tag, Button} from 'antd';
import {HEADER_HEIGHT} from '../../components/Navbar/Navbar';
import {FOOTER_HEIGHT} from '../../layouts/MainLayout/MainLayout';
import Loading from '../../components/Loading/Loading';
import {Avatar, Card} from 'antd';
import {EditOutlined, DeleteOutlined, PushpinOutlined, PlusOutlined} from '@ant-design/icons';
import {truncateText} from '../../utils/string';
import {useState} from 'react';
import FormModal from './FormModal/FormModal';
const {Content} = Layout;
const {Meta} = Card;

const MARGIN_TOP_CONTENT = 24;
const DashboardPage = () => {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Content style={{margin: `${MARGIN_TOP_CONTENT}px 16px 0`, position: 'relative'}}>
      <div
        style={{
          padding: 24,
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px - ${MARGIN_TOP_CONTENT}px )`,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Card
          style={{width: 300}}
          cover={<img alt='example' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />}
          hoverable
          actions={[
            <PushpinOutlined key='pin' style={{fontSize: 18}} />,
            <EditOutlined key='edit' style={{fontSize: 18}} />,
            <DeleteOutlined key='delete' style={{fontSize: 18}} />,
          ]}
        >
          <Meta
            avatar={<Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=8' />}
            title='Card title Card'
            description={
              <Flex vertical gap='small'>
                <Flex gap='6px 0' wrap>
                  <Tag color='magenta'>#magenta</Tag>
                  <Tag color='red'>#red</Tag>
                  <Tag color='volcano'>#volcano</Tag>
                  <Tag color='magenta'>#magenta</Tag>
                  <Tag color='red'>#red</Tag>
                  <Tag color='volcano'>#volcano</Tag>
                </Flex>
                <p>{truncateText('fdjklas fjdsalk fdjsalk fdasf asdf sadfads dsa df s', 30)}</p>{' '}
              </Flex>
            }
          />
        </Card>

        {/* <Empty
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        /> */}
        {/* <Loading count={3} /> */}
      </div>
      <FormModal handleCancel={handleCancel} handleOk={handleOk} isModalOpen={isModalOpen} title='Add Note' />
      <Button
        type='primary'
        size='large'
        style={{position: 'absolute', bottom: 20, right: 20, padding: '0 12px'}}
        onClick={showModal}
      >
        <PlusOutlined />
      </Button>
    </Content>
  );
};

export default DashboardPage;
