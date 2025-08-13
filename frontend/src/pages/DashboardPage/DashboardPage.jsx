import {Layout, theme, Empty, Flex, Tag, Button} from 'antd';
import {HEADER_HEIGHT} from '../../components/Navbar/Navbar';
import {FOOTER_HEIGHT} from '../../layouts/MainLayout/MainLayout';
import Loading from '../../components/Loading/Loading';
import {PlusOutlined} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import FormModal from './FormModal/FormModal';
import NoteCard from '../../components/NoteCard/NoteCard';
import {useDispatch, useSelector} from 'react-redux';
import {getNotesByUserId, resetStateGetNotesByUserId} from '../../features/note/noteSlice';
import useNotification from '../../hooks/useNotification';
const {Content} = Layout;

const MARGIN_TOP_CONTENT = 24;
const DashboardPage = () => {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();
  const dispatch = useDispatch();
  const {notes, status} = useSelector((state) => state.note);
  const {contextHolder, openNotification} = useNotification();
  const [dataNote, setDataNote] = useState(null);
  useEffect(() => {
    dispatch(getNotesByUserId())
      .unwrap()
      .finally(() => {
        dispatch(resetStateGetNotesByUserId());
      });
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    setDataNote(null);
  };

  return (
    <Content style={{margin: `${MARGIN_TOP_CONTENT}px 16px 0`, position: 'relative'}}>
      {contextHolder}
      <div
        style={{
          padding: 24,
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px - ${MARGIN_TOP_CONTENT}px )`,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {status.getNotesByUserId === 'loading' ? (
          <Loading count={3} />
        ) : notes?.length > 0 ? (
          <Flex wrap gap='middle'>
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                title={note.title}
                content={note.content}
                isPinned={note.isPinned}
                tags={note.tags}
                noteId={note.id}
                setDataNote={setDataNote}
                setIsModalOpen={setIsModalOpen}
              />
            ))}
          </Flex>
        ) : (
          <Empty
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          />
        )}
      </div>
      <FormModal
        isModalOpen={isModalOpen}
        openNotification={openNotification}
        setIsModalOpen={setIsModalOpen}
        dataNote={dataNote}
      />
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
