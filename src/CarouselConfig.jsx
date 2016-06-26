import React, { Component, PropTypes } from 'react'

import { presets } from 'react-motion'

export default class CarouselConfigComponent extends Component {
  static propTypes = {
    // Required
    children: PropTypes.arrayOf(PropTypes.element.isRequired),

    // Optional
    currentIndex: PropTypes.number,
    infinite: PropTypes.bool,

    // Spring Configuration
    springConfig: PropTypes.object,
    // stiffness: PropTypes.number,
    // damping: PropTypes.number,
    // precision: PropTypes.number,

    // Expandable Styles
    wrapperStyle: PropTypes.object,
    sliderStyle: PropTypes.object,
    slideStyle: PropTypes.object,
    uiStyle: PropTypes.object,

    // Expandable Elements
    // TODO: find right prop type
    // PreviousButton: PropTypes.element,
    // NextButton: PropTypes.element,

    // Events Handling
    // beforeSlide: PropTypes.func,
    // afterSlide: PropTypes.func,
  }

  static defaultProps = {
    currentIndex: 0,
    infinite: true,
    springConfig: presets.noWobble,
    // Default Elements
    PreviousButton: () => <div>previous</div>,
    NextButton: () => <div>next</div>,
    Counter: ({ state }) => <div>{state.currentIndex} / {state.maxIndex}</div>
    // Event Handling
    // onChange: () => null,
    // beforeSlide: () => null,
    // afterSlide: () => null,
  }

  get styles() {
    return {
      wrapper: {
        position: 'relative',
        height: '100%',
        flex: '1',
        ...this.props.wrapperStyle
      },
      slider: {
        flex: '1',
        position: 'relative',
        overflow: 'hidden',
        ...this.props.sliderStyle
      },
      slide: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        ...this.props.slideStyle
      },
      ui: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        userSelect: 'none',
        pointerEvents: 'none',
        ...this.props.uiStyle
      },
      previousButton: {
        position: 'absolute',
        top: '50%',
        left: '0%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        userSelect: 'none',
        pointerEvents: 'auto'
      },
      nextButton: {
        position: 'absolute',
        top: '50%',
        right: '0%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        userSelect: 'none',
        pointerEvents: 'auto'
      },
      counter: {
        position: 'absolute',
        left: '50%',
        bottom: '0%',
        transform: 'translateX(-50%)',
        cursor: 'pointer',
        userSelect: 'none',
        pointerEvents: 'auto'
      }
    }
  }
}
