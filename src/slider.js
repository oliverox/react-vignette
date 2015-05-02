'use strict';

// Node modules
var React = require('react/addons');

/**
 * Slider sub component for React-vignette
 *
 */
var Slider = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  render: function() {
    return React.createElement('div', {className: 'slider-container'}, this.props.imageViews);
  }
});

module.exports = Slider;
