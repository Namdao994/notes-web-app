import axiosInstance from '../../utils/axiosInstance';
import {API_ROOT} from '../../utils/constants';

export const getNotesByUserIdAPI = async () => {
  const res = await axiosInstance.get(`${API_ROOT}/v1/note`);
  return res.data;
};

export const createNewNoteAPI = async (noteData) => {
  const res = await axiosInstance.post(`${API_ROOT}/v1/note`, noteData);
  return res.data;
};

export const toggleEditNoteAPI = async (noteId, noteData) => {
  const res = await axiosInstance.patch(`${API_ROOT}/v1/note/${noteId}`, noteData);
  return res.data;
};

export const deleteNoteAPI = async (noteId) => {
  const res = await axiosInstance.delete(`${API_ROOT}/v1/note/${noteId}`);
  return res.data;
};
