import React, { Component } from 'react'
import View from 'react-flexbox'

import Carousel from '../src/Carousel'
import { PreviousButton, NextButton, Tracker } from './UIs'

export default class Demo extends Component {
  render() {
    let styleContrainer = {
      height: '100%',
      width: '100%',
    }

    let style = {
      height: '100%',
      display: 'flex',
      flex: '1',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(51, 0, 255, 0.35)'
    }

    return (
      <div style={styleContrainer}>
        <Carousel infinite={true} keyboard={true} Tracker={Tracker}>
          <div style={style}>1</div>
          <div style={style}>2</div>
          <div style={style}>3</div>
          <div style={style}>4</div>
          <div style={style}>5</div>
        </Carousel>
      </div>
    )
  }
}
