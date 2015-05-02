'use strict';

// Node modules
var React = require('react/addons');
var Spinner = require('./spinner');
var ImageLoader = require('./imageloader');
/**
 * ImageView sub component for React-vignette
 *
 */
var ImageView = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  getInitialState: function() {
    return {
      imageLoaded: false,
      divStyle: {}
    };
  },

  onImageInit: function() {
    console.log('started loading image', this.props.title);
  },

  onImageLoaded: function(imgWidth, imgHeight) {
    console.log('image:', this.props.title, 'loaded.', imgWidth, imgHeight);
    this.setState({
      imageLoaded: true
    });
    var elContainer = React.findDOMNode(this);
    if (elContainer.offsetWidth > imgWidth) {
      // center image using padding
      var pad = (elContainer.offsetWidth - imgWidth) / 2;
      console.log('paddingLeft for', this.props.title, '=', pad);
      this.setState({
        divStyle: {
          'padding-left': pad + 'px'
        }
      });
    }
    else {
      // center image using scroll
      elContainer.scrollLeft =  (imgWidth / 2) - (elContainer.offsetWidth / 2);
      console.log('centering image', this.props.title, 'using scroll',  (imgWidth / 2) - (elContainer.offsetWidth / 2));
    }
  },

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
    console.log('this.state.imageLoaded=', this.state.imageLoaded);
    return React.createElement('div', {className: cn, style: this.state.divStyle},
      [
        React.createElement(Spinner, {
          className: (this.state.imageLoaded ? 'hidden' : ''),
        }),
        React.createElement(ImageLoader, {
          className: (this.state.imageLoaded ? '' : 'invisible'),
          key: this.props.key,
          url: this.props.url,
          title: this.props.title,
          onImageInit: this.onImageInit,
          onImageLoaded: this.onImageLoaded
        })
      ]
    );
  }
});

module.exports = ImageView;
