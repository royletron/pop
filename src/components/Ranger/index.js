import React from 'react';
import classNames from 'classnames';
import styles from './index.css';

import ReactSlider from 'react-slider';

export default class Ranger extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      min: props.min,
      max: props.max
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps !== this.props) {
      this.setState({
        min: this.state.min < this.props.min ? this.props.min : this.state.min,
        max: this.state.max > this.props.max ? this.props.max : this.state.max
      })
    }
  }
  onChange = () => {
    if(this.props.onChange) {
      var values = this.refs.slider.getValue();
      this.props.onChange(values[0], values[1])
      this.setState({
        min: values[0],
        max: values[1]
      })
    }
  }
  render () {
    return (
      <div style={this.props.style} className={classNames(styles.this)}>
        <div className={classNames(styles.title)}>{this.props.name}</div>
        <ReactSlider ref='slider' onChange={this.onChange} min={this.props.min} max={this.props.max} step={this.props.step || 1} className={classNames(styles.slider)} value={[this.state.min, this.state.max]}>
          <div className={classNames(styles.sliderhandle)}>{this.state.min}</div>
          <div className={classNames(styles.sliderhandle)}>{this.state.max}</div>
        </ReactSlider>
      </div>
    );
  }
}
