'use strict';

// Node modules
var React = require('react/addons');

/**
 * Navigation sub component for React-vignette
 *
 * Renders navigation arrows
 *
 */
var Nav = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  render: function() {
    var leftChevron = React.createElement('div', {className: 'icon left-chevron'});
    var rightChevron = React.createElement('div', {className: 'icon right-chevron'});
    return React.createElement('div', {className: 'nav-container'}, [
      React.createElement('div', {key: 1, className: 'control-button', onClick: this.props.prevImgAction}, leftChevron),
      React.createElement('div', {key: 2, className: 'control-button', onClick: this.props.nextImgAction}, rightChevron)
    ]);
  }
});

module.exports = Nav;
