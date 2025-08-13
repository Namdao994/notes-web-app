import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import noteReducer from '../features/note/noteSlice';
import {persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // lưu ở localStorage

// Cấu hình redux-persist
const persistConfig = {
  key: 'root', // key gốc để lưu
  storage, // loại storage
  whitelist: ['user'], // reducer muốn lưu (ví dụ: user)
};

// Gộp reducer
const rootReducer = combineReducers({
  user: userReducer,
  note: noteReducer,
});

// Tạo persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Bỏ qua các action đặc biệt của redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Tạo persistor
export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });
