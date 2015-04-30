'use strict';

// Node modules
var React = require('react/addons');

/**
 * Img sub component for React-vignette
 *
 */
var Img = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  getInitialState: function() {
    return {}
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
    return React.createElement('div', {className: cn},
      React.createElement('img', {
        className: 'img',
        src: this.props.url,
        alt: this.props.title
      })
    );
  }
});

module.exports = Img;
