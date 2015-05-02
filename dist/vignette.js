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

var ImageView = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  onImageInit: function(width, height) {
    console.log('started loading image', this.props.title, 'size:', width, 'by', height);
  },

  onImageLoaded: function() {
    console.log('image:', this.props.title, 'loaded.');
  },

  // componentDidMount: function() {
  //   console.log('imageview for', this.props.title, 'mounted!', this.getDOMNode());
  // },

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
      React.createElement(ImageLoader, {
        key: this.props.key,
        url: this.props.url,
        title: this.props.title,
        onImageInit: this.onImageInit,
        onLoad: this.onImageLoaded
      })
    );
  }
});

var Slider = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  render: function() {
    return React.createElement('div', {className: 'slider-container'}, this.props.imageViews);
  }
});

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

    // // create ImageView components
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
