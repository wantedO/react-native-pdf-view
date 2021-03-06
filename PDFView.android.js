'use strict';
import React,{ Component, PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

class PDFView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curerntPage: null,
    }
    this._onChange = this._onChange.bind(this);
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  _onChange(event:Event) {
    const { curerntPage } = this.state;
    this.setState({ curerntPage: Number(event.nativeEvent.message) });
    if(curerntPage !== null && curerntPage === Number(event.nativeEvent.message)) {
      this.props.onTouch && this.props.onTouch()
    }
    this.props.onLoadComplete && this.props.onLoadComplete(Number(event.nativeEvent.message));
    this.props.onPageChanged && this.props.onPageChanged(Number(event.nativeEvent.message));
  }

  render() {
    return <PDFCustomView ref={component => this._root = component} {...this.props} onChange={this._onChange} />;
  }
}

PDFView.propTypes = {
  ...View.propTypes,
    asset: PropTypes.string,
    src: PropTypes.string,
    pageNumber: PropTypes.number,
    path: PropTypes.string,
    zoom: PropTypes.number,
    onLoadComplete: PropTypes.func,
    onPageChanged: PropTypes.func,
};

var PDFCustomView = requireNativeComponent('RCTPDFViewAndroid', PDFView, {
  nativeOnly: { onChange: true }
});

export default PDFView;
