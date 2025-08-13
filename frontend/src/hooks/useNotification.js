import React, {useCallback} from 'react';
import {notification} from 'antd';
const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = useCallback(
    (type, message, description) => {
      api[type]({
        message,
        description,
      });
    },
    [api]
  );

  return {contextHolder, openNotification};
};

export default useNotification;
