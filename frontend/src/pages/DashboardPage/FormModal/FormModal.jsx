import {Button, Dropdown, Flex, Form, Input, Modal, Typography} from 'antd';
import {XFilled, PlusOutlined, DownOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {Tag} from 'antd';
import {useState} from 'react';
import {upperFirstLetter} from '../../../utils/string';
const {Text} = Typography;
const colorMap = {
  magenta: '#eb2f96',
  red: '#f5222d',
  volcano: '#fa541c',
  orange: '#fa8c16',
  gold: '#faad14',
  lime: '#a0d911',
  green: '#52c41a',
  cyan: '#13c2c2',
  blue: '#1677ff',
  geekblue: '#2f54eb',
  purple: '#722ed1',
};
const colorItems = Object.entries(colorMap).map(([key, hex]) => ({
  key,
  label: <Text style={{color: hex}}>{upperFirstLetter(key)}</Text>,
  icon: <XFilled style={{color: hex}} />,
}));

const FormModal = ({isModalOpen, handleOk, handleCancel, title}) => {
  const [color, setColor] = useState(colorItems[0].key);
  const [tagLabel, setTagLabel] = useState('');
  const [tags, setTags] = useState([]);

  const handleClickColorItem = ({key}) => {
    setColor(key);
  };

  const handleDeleteTag = (label) => {
    setTags((prev) => prev.filter((tag) => tag.label !== label));
  };

  const handleAddTagToList = () => {
    setTags((prev) => [...prev, {color, label: tagLabel}]);
    setTagLabel('');
  };
  console.log('tags', tags);
  return (
    <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form name='form-modal' initialValues={{remember: true}} autoComplete='off' layout='vertical'>
        <Form.Item label='Title' name='title' rules={[{required: true, message: 'Please input your title!'}]}>
          <Input placeholder='Title' />
        </Form.Item>

        <Form.Item label='Content' name='content' rules={[{required: true, message: 'Please input your content!'}]}>
          <Input.TextArea rows={4} placeholder='Content' />
        </Form.Item>

        <Form.Item label='Tags' name='tags'>
          <Flex vertical gap='middle'>
            <Flex wrap gap='small'>
              {tags.map((tag) => (
                <Tag
                  color={tag.color}
                  closeIcon={<CloseCircleOutlined style={{color: colorMap[tag.color]}} />}
                  onClose={() => handleDeleteTag(tag.label)}
                >
                  {tag.label}
                </Tag>
              ))}
            </Flex>
            <Flex align='center' gap='middle'>
              <Input
                placeholder='Tag'
                style={{width: 200}}
                value={tagLabel}
                onChange={(e) => setTagLabel(e.target.value)}
              />
              <Dropdown menu={{items: colorItems, onClick: handleClickColorItem}} trigger={['hover']}>
                <Button
                  color={color}
                  variant='filled'
                  icon={<DownOutlined />}
                  iconPosition='end'
                  onClick={() => {}}
                  style={{width: '100px'}}
                >
                  {upperFirstLetter(color)}
                </Button>
              </Dropdown>
              <Button onClick={handleAddTagToList}>
                <PlusOutlined />
              </Button>
            </Flex>
          </Flex>
        </Form.Item>

        <Form.Item label={null}>
          <Button type='primary' htmlType='submit' style={{width: '100%'}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormModal;
