'use strict';

// Node modules
var React = require('react/addons');

/**
 * Spinner sub component for React-vignette
 * Adapted from http://tobiasahlin.com/spinkit/
 */
var Spinner = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  render: function() {
    return React.createElement(
      'div',
      {className: 'spinner ' + this.props.className},
      [ React.createElement('div', {className: 'bounce1'}),
        React.createElement('div', {className: 'bounce2'}),
        React.createElement('div', {className: 'bounce3'})  ]
    );
  }
});

module.exports = Spinner;
