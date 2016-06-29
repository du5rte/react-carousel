import React, { Component, PropTypes } from 'react'
import View from 'react-flexbox'

import CarouselLogic from '../src/CarouselLogic'

export class Tracker extends CarouselLogic {
  handleClick(index) {
    this.props.select(index)
  }

  render() {
      return (
        <View row>
          {
            this.props.children.map((child, index) =>
              <span
                key={index}
                onClick={this.handleClick.bind(this, index)}
                style={{
                  height: `${10 / 16}em`,
                  width: `${10 / 16}em`,
                  margin: `${8 / 16}em`,
                  color: 'currentColor',
                  backgroundColor: this.props.state.currentIndex === index ? 'currentColor' : 'transparent',
                  border: `${2 / 16}em solid`,
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
              >
              </span>
            )
          }
        </View>
      )
  }
}

// export function Tracker({props, state, select}) {
//
//   function handleClick(index) {
//     //
//     console.log('a')
//   }
//

// }



export function NextButton() {
  return <div>next</div>
}

export function PreviousButton() {
  return <div>previous</div>
}
