import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Motion, spring } from 'react-motion'
import View from 'react-flexbox'

import CarouselLogic from './CarouselLogic'

export default class Carousel extends CarouselLogic {
  get previousButton() {
    return (
      <div style={this.styles.previousButton} onClick={this.previous.bind(this)}>
        {
          <this.props.PreviousButton
            state={this.state}
            previous={this.previous.bind(this)}
          />
        }
      </div>
    )
  }

  get nextButton() {
    return (
      <div style={this.styles.nextButton} onClick={this.next.bind(this)}>
        {
          <this.props.NextButton
            state={this.state}
            next={this.next.bind(this)}
          />
        }
      </div>
    )
  }

  get buttons() {
    return (
      <div style={this.styles.buttons}>
        {this.props.showPreviousButton ? this.previousButton : null}
        {this.props.showNextButton ? this.nextButton : null}
      </div>
    )
  }

  get tracker() {
    return (
      <div style={this.styles.tracker} >
        {
          <this.props.Tracker
            children={this.props.children}
            state={this.state}
            select={this.select.bind(this)}
          />
        }
      </div>
    )
  }

  get ui() {
    return (
      <View row style={this.styles.ui}>
        {this.props.showButtons ? this.buttons : null}
        {this.props.showTracker ? this.tracker : null}
      </View>
    )
  }

  render() {
    return (
      <View column style={this.styles.wrapper} >
        <View style={this.styles.slider}>
        {
          this.props.children.map((child, index) =>
            <Motion
              key={index}
              style={{
                x: this.spring(index)
              }}
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
        {this.props.showUI ? this.ui : null}
      </View>
    )
  }
}
