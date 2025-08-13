import {Avatar, Card, Flex, Tag, theme, Popconfirm} from 'antd';
import {EditOutlined, DeleteOutlined, PushpinOutlined} from '@ant-design/icons';
import {truncateText} from '../../utils/string';
import {useDispatch, useSelector} from 'react-redux';
import {deleteNote, getNotesByUserId, toggleEditNote} from '../../features/note/noteSlice';
const {Meta} = Card;
const NoteCard = ({noteId, title, content, tags, isPinned, setDataNote, setIsModalOpen}) => {
  const {
    token: {colorPrimary},
  } = theme.useToken();
  const dispatch = useDispatch();
  const {status} = useSelector((state) => state.note);

  const handleTogglePinned = () => {
    dispatch(toggleEditNote({noteId, noteData: {isPinned: !isPinned}}))
      .unwrap()
      .finally(() => {
        dispatch(getNotesByUserId());
      });
  };

  const handleDeleteNote = () => {
    dispatch(deleteNote(noteId))
      .unwrap()
      .finally(() => {
        dispatch(getNotesByUserId());
      });
  };

  const handleEditNote = () => {
    setIsModalOpen(true);
    setDataNote({
      noteId,
      title,
      content,
      tags,
    });
  };

  return (
    <Card
      style={{width: 300}}
      cover={<img alt='example' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />}
      hoverable
      actions={[
        <PushpinOutlined
          key='pin'
          style={{fontSize: 18, color: isPinned ? colorPrimary : undefined}}
          onClick={status.toggleEditNote === 'loading' ? undefined : handleTogglePinned}
        />,
        <EditOutlined key='edit' style={{fontSize: 18}} onClick={handleEditNote} />,
        <Popconfirm
          title='Delete the note'
          description='Are you sure to delete this note?'
          onConfirm={handleDeleteNote}
          okText='Yes'
          cancelText='No'
        >
          <DeleteOutlined key='delete' style={{fontSize: 18}} />
        </Popconfirm>,
      ]}
    >
      <Meta
        avatar={<Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=8' />}
        title={title}
        description={
          <Flex vertical gap='small'>
            <Flex gap='6px 0' wrap>
              {tags.map((tag) => (
                <Tag color={tag.color} key={tag.label}>
                  #{tag.label}
                </Tag>
              ))}
            </Flex>
            <p>{truncateText(content, 30)}</p>{' '}
          </Flex>
        }
      />
    </Card>
  );
};

export default NoteCard;
