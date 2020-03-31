import React from 'react';
import PropTypes from 'prop-types';
import TextElement from '../text-element';
import ImageElement from '../image-element';

const TabsBlockItem = ({ type, value }) => {
  switch (true) {
    case type === 'text':
      return <TextElement value={value} />;
    case type === 'image':
      return <ImageElement imageUrl={value} />;
    default:
      return null;
  }
};

const TabItemPropTypes = {
  id: PropTypes.number,
  type: PropTypes.oneOf(['text', 'image']),
  value: PropTypes.string,
};

TabsBlockItem.propTypes = TabItemPropTypes;


const TabsBlockContent = ({ content }) => {
  return (
    <div className="tabs-block__content">
      <div className="tabs-block__content-item default-body">
        {
          content.map(({ id, type, value}) => <TabsBlockItem key={id} type={type} value={value} />)
        }
      </div>
    </div>
  );
}

TabsBlockContent.defaultProps = {
  content: [],
};

TabsBlockContent.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape(TabItemPropTypes))
};

export default TabsBlockContent;