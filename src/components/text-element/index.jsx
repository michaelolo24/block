import React from 'react';
import PropTypes from 'prop-types';
import './text-element.scss';

const TextElement = ({ value }) => <p className="text-element">{value}</p>;

TextElement.defaultProps = {
  value: ''
}

TextElement.propTypes = {
  value: PropTypes.string,
}

export default TextElement;