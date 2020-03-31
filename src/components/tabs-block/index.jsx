import React, { useState } from 'react';
import TabsBlockHeader from './tabs-block-header';
import TabsBlockContent from './tabs-block-content';
import './tabs-block.scss';

const TabsBlock = ({ data }) => {
  const [activeIndex, updateActiveIndex] = useState(0);

  return (
    <div className="tabs-block-wrapper">
      <TabsBlockHeader
        activeIndex={activeIndex}
        selectTabIndex={updateActiveIndex}
        data={data}
      />
      <TabsBlockContent content={data[activeIndex].content} />
    </div>
  );
}

export default TabsBlock;