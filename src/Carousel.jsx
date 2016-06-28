import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Motion, spring } from 'react-motion'
import View from 'react-flexbox'

import CarouselLogic from './CarouselLogic'


/*
TODO: moveTo function for Counter
TODO: transform prefixer
const TRANSFORM = require('get-prefix')('transform')

TODO: auto height
// componentDidMount() {
//   console.log(ReactDOM.findDOMNode(this))
// }

TODO: on rest
onRest={this.handleRest.bind(this)}

handleRest() {
  this.setState({moving: false})
}
*/

export default class Carousel extends CarouselLogic {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: props.currentIndex,
      maxIndex: props.children.length - 1,
      moving: false,
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  previous() {
    this.setState({moving: 'backwards'})
    this.setState({currentIndex: this.previousIndex})
  }

  next() {
    this.setState({moving: 'forwards'})
    this.setState({currentIndex: this.nextIndex})
  }

  handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      this.previous()
    }
    if (e.key === 'ArrowRight') {
      this.next()
    }
  }

  render() {
    return (
      <View column style={this.styles.wrapper} >
        <View style={this.styles.slider}>
        {
          this.props.children.map((child, index, map) =>
            <Motion
              key={index}
              style={{ x: this.relativeSpring(index) }}
            >
            {({ x }) =>
              <View
                key={index}
                style={{
                  ...this.styles.slide,
                  width: `${100 / this.props.slidesToShow}%`,
                  transform:`translate3d(${x * 100}%, 0, 0)`
                }}
              >
                {child}
              </View>
            }
            </Motion>
          )
        }
        </View>
        <View row style={this.styles.ui}>
          <div style={this.styles.buttons}>
            <div style={this.styles.previousButton} onClick={this.previous.bind(this)}>{<this.props.PreviousButton />}</div>
            <div style={this.styles.nextButton} onClick={this.next.bind(this)}>{<this.props.NextButton />}</div>
          </div>
          <div style={this.styles.counter} >{<this.props.Counter state={this.state} />}</div>
        </View>
      </View>
    )
  }
}
