var Vignette =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A React gallery component.
	 *
	 * @param  {String} html
	 */
	module.exports = {
	  Gallery: __webpack_require__(1)
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Node modules
	var React = __webpack_require__(2);

	// Custom components
	var ImageView = __webpack_require__(3);
	var Slider = __webpack_require__(4);

	/**
	 * The Gallery
	 *
	 * Displays a gallery of images
	 */
	var Gallery = React.createClass({

	  mixins: [React.addons.PureRenderMixin],

	  componentDidMount: function() {
	    console.log('component mounted!', React.findDOMNode(this));
	  },

	  getDefaultProps: function() {
	    return {
	      showNavigationArrows: true
	    };
	  },

	  getInitialState: function() {
	    return {
	      current: 0
	    };
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Node modules
	var React = __webpack_require__(2);
	var Spinner = __webpack_require__(5);
	var ImageLoader = __webpack_require__(6);
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Node modules
	var React = __webpack_require__(2);

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Node modules
	var React = __webpack_require__(2);

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Node modules
	var React = __webpack_require__(2);

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


/***/ }
/******/ ]);