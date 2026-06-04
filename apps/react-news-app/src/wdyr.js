/// <reference types="@welldone-software/why-did-you-render" />
import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = (
    await import('@welldone-software/why-did-you-render')
  ).default;
  console.log('[WDYR] Initialized successfully');
  whyDidYouRender(React, {
    trackAllPureComponents: true, // 自動追蹤所有 React.memo 或 PureComponent
    logOnDifferentValues: true, // 觀察渲染順序
  });
}
