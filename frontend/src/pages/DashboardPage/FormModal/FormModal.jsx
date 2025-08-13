import {Button, Dropdown, Flex, Form, Input, Modal, Typography} from 'antd';
import {XFilled, PlusOutlined, DownOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {Tag} from 'antd';
import {useEffect, useState} from 'react';
import {upperFirstLetter} from '../../../utils/string';
import {useDispatch, useSelector} from 'react-redux';
import {
  createNewNote,
  getNotesByUserId,
  resetStateCreateNewNote,
  toggleEditNote,
} from '../../../features/note/noteSlice';
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
const {useForm} = Form;
const FormModal = ({isModalOpen, setIsModalOpen, openNotification, dataNote}) => {
  const dispatch = useDispatch();
  const {status, message} = useSelector((state) => state.note);
  const [color, setColor] = useState(colorItems[0].key);
  const [tagLabel, setTagLabel] = useState('');
  const [tags, setTags] = useState([]);
  const [formModal] = useForm();
  useEffect(() => {
    if (status.createNewNote === 'succeeded' || status.toggleEditNote === 'succeeded') {
      dispatch(getNotesByUserId())
        .unwrap()
        .finally(() => {
          dispatch(resetStateCreateNewNote());
          formModal.resetFields();
          setTags([]);
          setIsModalOpen(false);
        });
    }
  }, [status.createNewNote, status.toggleEditNote]);

  // Handle create/edit error
  useEffect(() => {
    if (status.createNewNote === 'failed' || status.toggleEditNote === 'failed') {
      openNotification('error', 'Invalid Note', message.createNewNote);
      dispatch(resetStateCreateNewNote());
    }
  }, [status.createNewNote, status.toggleEditNote]);

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

  const onFinish = async (value) => {
    const note = {
      ...value,
      tags,
    };
    dispatch(
      dataNote
        ? toggleEditNote({
            noteId: dataNote.noteId,
            noteData: note,
          })
        : createNewNote(note)
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    formModal.resetFields();
    setTags([]);
  };

  useEffect(() => {
    formModal.setFieldValue('title', dataNote ? dataNote.title : '');
    formModal.setFieldValue('content', dataNote ? dataNote.content : '');
    setTags(dataNote ? dataNote.tags : []);
  }, [formModal, dataNote]);

  return (
    <Modal
      title={dataNote ? 'Edit note' : 'Add note'}
      open={isModalOpen}
      onCancel={handleCancel}
      okText='Submit'
      okButtonProps={{
        form: 'formModal',
        htmlType: 'submit',
      }}
    >
      <Form
        id='formModal'
        name='form-modal'
        initialValues={{remember: true}}
        autoComplete='off'
        layout='vertical'
        onFinish={onFinish}
        form={formModal}
      >
        <Form.Item label='Title' name='title' rules={[{required: true, message: 'Please input your title!'}]}>
          <Input placeholder='Title' />
        </Form.Item>

        <Form.Item label='Content' name='content' rules={[{required: true, message: 'Please input your content!'}]}>
          <Input.TextArea rows={4} placeholder='Content' />
        </Form.Item>

        <Flex vertical gap='middle' style={{marginBottom: 15}}>
          <Flex wrap gap='small'>
            {tags.map((tag) => (
              <Tag
                color={tag.color}
                key={tag.label}
                closeIcon={<CloseCircleOutlined style={{color: colorMap[tag.color]}} />}
                onClose={() => handleDeleteTag(tag.label)}
              >
                #{tag.label}
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
      </Form>
    </Modal>
  );
};

export default FormModal;
