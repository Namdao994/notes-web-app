import React from 'react';
import {Skeleton} from 'antd';

const Loading = ({count = 1}) => {
  return (
    <>
      {Array.from({length: count}).map((_, index) => (
        <Skeleton
          key={index}
          active
          style={{
            marginTop: `${index !== 0 ? '30px' : '0'}`,
          }}
        />
      ))}
    </>
  );
};

export default Loading;
