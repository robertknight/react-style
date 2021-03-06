/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var baseStyle = ReactStyle({
  display: 'inline-block',
  zoom: 1,
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
  verticalAlign: 'baseline',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none'
});

var activeStyle = ReactStyle({
  boxShadow: '0 0 0 1px rgba(0,0,0, 0.15) inset, 0 0 6px rgba(0,0,0, 0.20) inset'
});

var ButtonStyle = ReactStyle({
  fontFamily: 'inherit',
  fontSize: '100%',
  padding: '0.5em 1em',
  color: 'rgba(0, 0, 0, 0.70)',
  border: 'none rgba(0, 0, 0, 0)',
  backgroundColor: '#E6E6E6',
  textDecoration: 'none',
  borderRadius: '3px',
  ':active': activeStyle,

  ':hover': ReactStyle({
    color: '#000',
    backgroundImage: 'linear-gradient(transparent, rgba(0,0,0, 0.05) 40%, rgba(0,0,0, 0.10))'
  }),

  ':focus': ReactStyle({
    backgroundImage: 'linear-gradient(transparent, rgba(0,0,0, 0.05) 40%, rgba(0,0,0, 0.10))',
    outline: 'none'
  })
});

class Button {

  render() {
    var props = this.props;
    var styles = [
      baseStyle,
      ButtonStyle,
        this.props.active && activeStyle
    ].concat(props.styles);
    props.styles = styles;
    return (
      <button {...props}>{props.children}</button>
    );
  }
}

module.exports = React.createClass(Button.prototype);
