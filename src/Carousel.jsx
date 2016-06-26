import React, { Component, PropTypes } from 'react'
import { StaggeredMotion, spring } from 'react-motion'
import View from 'react-flexbox'

import CarouselConfigComponent from './CarouselConfig'


/*
TODO:
  - GoTo function for Counter


*/
export default class Carousel extends CarouselConfigComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: props.currentIndex,
      maxIndex: props.children.length - 1
    }
  }

  nextIndex(i=this.state.currentIndex, max=this.state.maxIndex) {
    if (this.props.infinite) {
      return  i === max ? 0 :
              i + 1
    } else {
      return  i === max ? max :
              i + 1
    }

  }

  previousIndex(i=this.state.currentIndex, max=this.state.maxIndex) {
    if (this.props.infinite) {
      return  i === 0 ? max :
              i - 1
    } else {
      return  i === 0 ? 0 :
              i - 1
    }

  }

  next() {
    this.setState({currentIndex: this.nextIndex()})
  }

  previous() {
    this.setState({currentIndex: this.previousIndex()})
  }

  render() {
    // reduce
    // 3d transform
    return (
      <View column style={this.styles.wrapper}>
        <StaggeredMotion
          styles={() =>
            this.props.children.map((child, index, map) => {
              // index = index === 0 ? map.length - 1 : index - 1
              let max = Math.floor(map.length / 2)
              let min = Math.floor(map.length / 2 )* -1
              let current = this.state.currentIndex - index
              let next = this.state.currentIndex - index -  map.length
              let previous = map.length - index + this.state.currentIndex

              return {
                x:  current < min ? spring(previous, this.props.springConfig) :
                    current > max ? spring(next, this.props.springConfig) :
                    spring(current, this.props.springConfig)
              }
            })
          }
        >
          {(interpolatingStyles) =>
            <View style={this.styles.slider}>
              {
                interpolatingStyles.map(({ x }, index) =>
                  <View
                    key={index}
                    style={{
                      ...this.styles.slide,
                      // display: x > -1 && x < 1 ? 'flex' : 'none',
                      // display: index === this.state.currentIndex ? 'flex' : 'none',
                      transform: `translateX(${x * 100}%)`
                    }}
                  >
                    {this.props.children[index]}
                  </View>
                )
              }
            </View>
          }
        </StaggeredMotion>

        <View row style={this.styles.ui}>
          <div style={this.styles.previousButton} onClick={this.previous.bind(this)}>{<this.props.PreviousButton />}</div>
          <div style={this.styles.nextButton} onClick={this.next.bind(this)}>{<this.props.NextButton />}</div>
          <div style={this.styles.counter} >{<this.props.Counter state={this.state} />}</div>
        </View>
      </View>
    )
  }
}
