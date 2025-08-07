import {StrictMode} from 'react';
import '@ant-design/v5-patch-for-react-19';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {BrowserRouter} from 'react-router';
import {ConfigProvider, theme} from 'antd';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
);
