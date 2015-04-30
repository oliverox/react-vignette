'use strict';

// Node modules
var React = require('react/addons');

// Custom components
var Nav = require('./nav');
var ImageView = require('./imageview');
var Slider = require('./slider');

/**
 * The Gallery
 *
 * Displays a gallery of images
 */
var Gallery = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  getDefaultProps: function() {
    return {
      showNavigationArrows: true
    };
  },

  getInitialState: function() {
    return {
      current: 0
    }
  },

  prevImgAction: function() {
    if (this.state.current > 0) {
      this.setState({current: this.state.current - 1});
      console.log('-- prevImgAction() --', this.state.current);
    }
  },

  nextImgAction: function() {
    if (this.state.current < this.props.images.length - 1) {
      this.setState({current: this.state.current + 1});
      console.log('-- nextImgAction() --', this.state.current);
    }
  },

  render: function() {
    var subComponents = [];
    var imageViews = [];

    // create ImageView components
    this.props.images.forEach(function(img, index) {
      imageViews.push(React.createElement(ImageView, {
        current: index === this.state.current,
        next: index > this.state.current,
        prev: index < this.state.current,
        key: index,
        url: img.url,
        title: img.title
      }));
    }.bind(this));


    // slider component
    subComponents.push(React.createElement(Slider, {key: 0, imageViews: imageViews, current: this.state.current}));

    // navigation component
    if (this.props.showNavigationArrows) {
      var leftChevron = React.createElement('div', {className: 'icon left-chevron'});
      var rightChevron = React.createElement('div', {className: 'icon right-chevron'});
      subComponents.push(
        React.createElement('div', {key: 1, className: 'control-button left-arrow', onClick: this.prevImgAction}, leftChevron),
        React.createElement('div', {key: 2, className: 'control-button right-arrow', onClick: this.nextImgAction}, rightChevron)
      );
    }
    return React.createElement('div', {className: 'rv-container'}, subComponents);
  }
});

module.exports = Gallery;
