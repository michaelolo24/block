import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import throttle from 'lodash.throttle';

// Used free font awesome icons for the carets
const TabsBlockHeader = ({ activeIndex, selectTabIndex, data }) => {
  const tabsHeader = useRef({});
  const [scrollPosition, updateScrollPosition] = useState(0);

  useEffect(() => {
    const handleLoopingCarousel = (e) => {
      const prevItemIndex = activeIndex - 1;
      const nextItemIndex = activeIndex + 1;
  
      if (document.activeElement.id.includes('item-header-')) {
        if (e.keyCode === 37 || e.key === 'ArrowLeft') {
           prevItemIndex < 0 ? selectTabIndex(data.length - 1) : selectTabIndex(prevItemIndex);
        }
        if (e.keyCode === 39 || e.key === 'ArrowRight') {
          nextItemIndex >= data.length ? selectTabIndex(0) : selectTabIndex(nextItemIndex);
        }
      }
    }

    document.addEventListener('keydown', handleLoopingCarousel);
    return () => document.removeEventListener('keydown', handleLoopingCarousel);
  }, [activeIndex, data.length, selectTabIndex]);


  useEffect(() => {
    const tabsHeaderReference = tabsHeader.current;

    const setScrollPosition = throttle(e => updateScrollPosition(e.target.scrollLeft), 100);
    tabsHeaderReference.addEventListener('scroll', setScrollPosition);

    return () => tabsHeaderReference.removeEventListener('scroll', setScrollPosition);
  }, []);


  const handleCaretPress = direction => {
    const currentPosition = tabsHeader.current.scrollLeft;
    const scrollDistance = tabsHeader.current.clientWidth;
  
    const directionalScrollDistance = direction === 'right'
      ? currentPosition + scrollDistance
      : currentPosition - scrollDistance; 
  
    tabsHeader.current.scroll({ left: directionalScrollDistance, behavior: 'smooth' });
  }

  const tabClassName = index => classNames('default-header', 'tabs-block__header-tab', {
    'tabs-block__header-tab--active': index === activeIndex
  });

  const prevCaretClassName = classNames('tabs-block__header-arrow', 'tabs-block__header-arrow--prev', {
    'tabs-block__header-arrow--hidden': scrollPosition === 0
  });

  const nextCaretClassName = classNames('tabs-block__header-arrow', 'tabs-block__header-arrow--next', {
    'tabs-block__header-arrow--hidden': scrollPosition + tabsHeader.current.clientWidth >= tabsHeader.current.scrollWidth - 10
  });

  return (
    <div className="tabs-block__header-wrap">
      <div className="tabs-block__header" ref={tabsHeader}>
        {
          data.map((tab, index) => (
            <button
              className={tabClassName(index)}
              id={`item-header-${index}`}
              key={tab.id}
              onClick={() => selectTabIndex(index)}
              tabIndex={activeIndex === index ? '0' : '-1'}
              type="button"
            >
              {tab.title}
            </button>
          ))
        }
      </div>
      <div className="tabs-block__header-controls">
        <button
          className={prevCaretClassName}
          onClick={() => handleCaretPress('left')}
          type="button"
        >
          <i className="fas fa-angle-left" />
        </button>
        <button
          className={nextCaretClassName}
          onClick={() => handleCaretPress('right')}
          type="button"
        >
          <i className="fas fa-angle-right" />
        </button>
      </div>
    </div>
  );
}

TabsBlockHeader.defaultProps = {
  data: [],
}

TabsBlockHeader.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  selectTabIndex: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string
  }))
}

export default TabsBlockHeader;