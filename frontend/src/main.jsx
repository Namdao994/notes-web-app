import {StrictMode} from 'react';
import '@ant-design/v5-patch-for-react-19';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {BrowserRouter} from 'react-router';
import {ConfigProvider, theme} from 'antd';
import {store, persistor} from './app/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
createRoot(document.getElementById('root')).render(
  <ConfigProvider
    theme={{
      algorithm: theme.defaultAlgorithm,
    }}
  >
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ConfigProvider>
);
