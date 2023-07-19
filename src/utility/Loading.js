import React from 'react';

import './Loading.css';

const Loading = props => {
  return (
    <div className='loading-spinner-overlay'>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
