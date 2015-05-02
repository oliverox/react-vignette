'use strict';

// Node modules
var React = require('react/addons');

/**
 * ImageView sub component for React-vignette
 *
 */
var ImageLoader = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  componentDidMount: function() {
    // window.setTimeout(function() {
    //   console.log('...', React.findDOMNode(this.refs.img1));
    //   this.props.onImageInit();
    // }.bind(this), 10000);
    console.log('> img for', this.props.title, 'mounted');
  },

  render: function() {
    return React.createElement('img', {
      className: 'img',
      src: this.props.url,
      alt: this.props.title,
      onLoad: this.props.onImageLoaded
    });
  }
});

module.exports = ImageLoader;
