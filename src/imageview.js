'use strict';

// Node modules
var React = require('react/addons');

var ImageLoader = require('./imageloader');
/**
 * ImageView sub component for React-vignette
 *
 */
var Img = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  onImageInit: function(width, height) {
    console.log('started loading image', this.props.title, 'size:', width, 'by', height);
  },

  onImageLoaded: function() {
    console.log('image:', this.props.title, 'loaded.');
  },

  // componentDidMount: function() {
  //   console.log('imageview for', this.props.title, 'mounted!', this.getDOMNode());
  // },

  render: function() {
    var cn = 'img-container';
    if (this.props.current) {
      cn = cn + ' current';
    }
    if (this.props.prev) {
      cn = cn + ' prev';
    }
    if (this.props.next) {
      cn = cn + ' next';
    }
    return React.createElement('div', {className: cn},
      React.createElement(ImageLoader, {
        key: this.props.key,
        url: this.props.url,
        title: this.props.title,
        onImageInit: this.onImageInit,
        onLoad: this.onImageLoaded
      })
    );
  }
});

module.exports = Img;
