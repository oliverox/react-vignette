'use strict';

// Node modules
var React = require('react/addons');

/**
 * ImageView sub component for React-vignette
 *
 */
var ImageLoader = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  onImageLoaded: function() {
    var el = React.findDOMNode(this);
    this.props.onImageLoaded(el.width, el.height);
  },

  componentDidMount: function() {
    // this.props.onImageInit(React.findDOMNode(this).width, React.findDOMNode(this).height);
  },

  render: function() {
    return React.createElement('img', {
      className: 'img ' + this.props.className,
      src: this.props.url,
      alt: this.props.title,
      onLoad: this.onImageLoaded
    });
  }
});

module.exports = ImageLoader;
