'use strict';

// Node modules
var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/**
 * Slider sub component for React-vignette
 *
 */
var Slider = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  statics: {
    makeCurrent: function(index) {
      console.log('will now switch current to', index);
    }
  },


  componentWillMount: function() {
    // this.setState({
    //   // imageViews: images
    //   current: 2
    // });
  },

  componentDidMount: function() {
    // var images = [];
    // this.props.images.forEach(function(img, index) {
    //   images.push(React.createElement(ImageView, {
    //     key: index,
    //     url: img.url,
    //     title: img.title
    //   }));
    // });
    // console.log('images:', images);
    // this.setState({
    //   imageViews: images
    // });
    // console.log('1. imageViews', this.state.imageViews);
  },

  render: function() {
    // return React.createElement('div', {className: 'slider-container'}, React.createElement(ReactCSSTransitionGroup, {transitionName: 'carousel'}, testImages));
    return React.createElement('div', {className: 'slider-container'}, this.props.imageViews);
  }
});

module.exports = Slider;
