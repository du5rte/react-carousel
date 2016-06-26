import React, { Component, PropTypes } from 'react'
import { StaggeredMotion, spring, presets } from 'react-motion'
import View from 'react-flexbox'

/*
references:
https://github.com/chenglou/react-motion
https://github.com/souporserious/react-motion-slider
*/

export default class Carousel extends Component {
  static propTypes = {
    // Required
    children: PropTypes.arrayOf(PropTypes.element.isRequired),

    // Optional
    currentIndex: PropTypes.number,

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
    springConfig: presets.noWobble,
    // Default Elements
    PreviousButton: () => <div>previous</div>,
    NextButton: () => <div>next</div>,
    // Event Handling
    // onChange: () => null,
    // beforeSlide: () => null,
    // afterSlide: () => null,
  }

  constructor(props) {
    super(props)
    this.state = {
      currentIndex: props.currentIndex,
    }
  }

  nextIndex(num=this.state.currentIndex, max=this.props.children) {
    return  num === max.length - 1 ? 0 :
            num + 1
  }

  previousIndex(num=this.state.currentIndex, max=this.props.children) {
    return  num === 0 ? max.length - 1 :
            num - 1
  }

  next() {
    this.setState({currentIndex: this.nextIndex()})
  }

  previous() {
    this.setState({currentIndex: this.previousIndex()})
  }

  render() {
    let styles = {
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
      previous: {
        position: 'absolute',
        top: '50%',
        left: '0%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        userSelect: 'none',
        pointerEvents: 'auto'
      },
      next: {
        position: 'absolute',
        top: '50%',
        right: '0%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        pointerEvents: 'auto'
      }
    }

    return (
      <View column style={styles.wrapper}>
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
            <View style={styles.slider}>
              {
                interpolatingStyles.map(({ x }, index) =>
                  <View
                    key={index}
                    style={{
                      ...styles.slide,
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

        <View row style={styles.ui}>
          <div style={styles.previous} onClick={this.previous.bind(this)}>{<this.props.PreviousButton />}</div>
          <div style={styles.next} onClick={this.next.bind(this)}>{<this.props.NextButton />}</div>
        </View>
      </View>
    )
  }
}
