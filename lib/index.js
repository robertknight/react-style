'use strict';

require('./ReactElementExtended');

var ExecutionEnvironment   = require('react/lib/ExecutionEnvironment');
var Style                  = require('./Style');
var stylesToCSS            = require('./stylesToCSS');
var styleComponent         = require('./styleComponent');
var styleComponentChildren = require('./styleComponentChildren');

var assign                 = require("react/lib/Object.assign");

var isArray = Array.isArray;


var styles = [];
var captureStyles = true;
var counter = 0;

function genClassName() {
  counter += 1;
  return 'c' + counter + '_';
}

function createStyle(props, className) {
  className = className || genClassName();

  var children = {};
  var style = {};

  for (var key in props) {
    if (!props.hasOwnProperty(key)) {
      continue;
    }

    var value = props[key];
    if (
      typeof value === 'object' &&
      !isArray(value) &&
      (!value || typeof value.toCSS !== 'function')
    ) {
      if (value instanceof Style) {
        children[key] = value;
      } else {
        children[key] = ReactStyle.create(
          value,
          className ? className + '__' + key : null);
      }
    } else {
      style[key] = props[key];
    }
  }

  var styleDecl = new Style(style, className, children);
  if (captureStyles) {
    styles.push(styleDecl);
  }
  return styleDecl;
}


var ReactStyle = {

  create: createStyle,
  style: styleComponent,
  styleChildren: styleComponentChildren,

  compile: function() {
    return stylesToCSS(styles);
  },

  inject: function(targetDocument) {
    targetDocument = targetDocument || document;
    captureStyles = false;
    if (!ExecutionEnvironment.canUseDOM ||
      window.__ReactStyle__ !== undefined) {
      // We are in Node or Styles are already injected
      return;
    }
    var tag = targetDocument.createElement('style');
    var compiled = this.compile();
    tag.innerHTML = compiled.css;
    window.__ReactStyle__ = compiled.classNames;
    targetDocument.getElementsByTagName('head')[0].appendChild(tag);
  }
};

assign(createStyle, ReactStyle);

module.exports = createStyle;
