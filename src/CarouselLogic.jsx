import React, { Component, PropTypes } from 'react'
import { spring, presets } from 'react-motion'

export default class CarouselLogic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: props.currentIndex,
      moving: false,
    }
  }

  static propTypes = {
    // Required
    children: PropTypes.arrayOf(PropTypes.element.isRequired),

    // Optional
    currentIndex: PropTypes.number,
    infinite: PropTypes.bool,
    inverted: PropTypes.bool,
    autoplay: PropTypes.bool,
    autoplaySpeed: PropTypes.number,
    slidesToShow: PropTypes.number,
    slidesToMove: PropTypes.number,
    springSettings: PropTypes.object,
    // slide
    keyboard: PropTypes.bool,
    showUI: PropTypes.bool,
    showButtons: PropTypes.bool,
    showNextButton: PropTypes.bool,
    showPreviousButton: PropTypes.bool,
    showTracker: PropTypes.bool,
    wrapperStyle: PropTypes.object,
    sliderStyle: PropTypes.object,
    slideStyle: PropTypes.object,
    uiStyle: PropTypes.object,
    buttonsStyle: PropTypes.object,
    trackerStyle: PropTypes.object,
    // TODO: find right prop type
    PreviousButton: PropTypes.func,
    NextButton: PropTypes.func,
    Tracker: PropTypes.func,
    // Events Handling
    // beforeSlide: PropTypes.func,
    // afterSlide: PropTypes.func,
  }

  static defaultProps = {
    currentIndex: 0,
    infinite: false,
    inverted: false,
    autoplay: false,
    autoplaySpeed: 3000,
    springSettings: presets.gentle,
    slidesToShow: 1,
    slidesToMove: 1,
    keyboard: false,
    showUI: true,
    showButtons: true,
    showNextButton: true,
    showPreviousButton: true,
    showTracker: true,
    PreviousButton: () => <div>previous</div>,
    NextButton: () => <div>next</div>,
    Tracker: ({ state, props }) => <div>{state.currentIndex + 1} / {props.children.length}</div>,
    onChange: () => null,
    beforeSlide: () => null,
    afterSlide: () => null,
  }

  get nextIndex() {
    let max = this.props.children.length - 1
    let next = this.state.currentIndex + this.props.slidesToMove
    let reset = this.props.slidesToMove - (this.props.children.length - this.state.currentIndex)

    if (this.props.infinite) {
      return  next > max ? reset :
              next
    } else {
      return  next > max ? max :
              next
    }
  }

  get previousIndex() {
    let min = 0
    let prev = this.state.currentIndex - this.props.slidesToMove
    let reset = this.props.children.length - (this.props.slidesToMove - this.state.currentIndex)

    if (this.props.infinite) {
      return  prev < min ? reset :
              prev
    } else {
      return  prev < min ? min :
              prev
    }
  }

  spring(index) {
    // returns a relative distance to currentIndex
    // https://babeljs.io/repl/#?evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&code=var%20children%20%3D%20%5B'a'%2C%20'b'%2C%20'c'%2C%20'd'%5D%0A%0A%2F%2F%20Change%20index%20here!%0Alet%20currentIndex%20%3D%200%0A%0Aconsole.log(%0A%20%20children.map((child%2C%20index%2C%20map)%20%3D%3E%20%7B%0A%20%20%20%20let%20length%20%3D%20children.length%0A%20%20%20%20let%20max%20%3D%20Math.floor(length%20%2F%202)%0A%20%20%20%20let%20min%20%3D%20-%20Math.floor(length%20%2F%202)%0A%20%20%20%20let%20move%20%3D%20currentIndex%20-%20index%0A%20%20%20%20let%20resetNext%20%3D%20move%20-%20length%0A%20%20%20%20let%20resetPrev%20%3D%20length%20%2B%20move%0A%20%20%20%20%0A%20%20%20%20let%20x%20%3D%20%0A%20%20%20%20%20%20%20%20%20%20%20%20move%20%3E%20max%20%3F%20resetNext%20%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20move%20%3C%20min%20%3F%20resetPrev%20%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20move%0A%0A%20%20%20%20return%20%7B%20%5B%60%24%7Bchild%7D%60%5D%3A%20x%20%7D%0A%20%20%7D)%0A)%0A

    // 0   1   2   3   4
    // a   b  (c)  d   e
    // 2   1   0  -1  -2

    let length = this.props.children.length
    let even = length % 2 === 0
    let max = Math.floor(length / 2) - (even ? 1 : 0)
    let min = - Math.floor(length / 2)
    let move = this.props.inverted ? this.state.currentIndex - index : this.state.currentIndex - index
    let next = move - length
    let prev = length + move

    let x = move < min ? prev :
            move > max ? next :
            move

    if (this.state.moving === 'backwards') {
      if (x === max) {
        return x
      }
    }

    if (this.state.moving === 'forwards') {
      if (x === min) {
        return x
      }
    }

    return spring(x, this.props.springSettings)
  }

  previous() {
    this.setState({moving: 'backwards'})
    this.setState({currentIndex: this.previousIndex})
  }

  next() {
    this.setState({moving: 'forwards'})
    this.setState({currentIndex: this.nextIndex})
  }

  select(index) {
    this.setState({currentIndex: index})
    console.log(index)
  }


  componentDidMount() {
    if (this.props.autoplay) {
      setInterval(() => {
        this.next()
      }, this.props.autoplaySpeed)
    }

    if (this.props.keyboard) {
      window.addEventListener('keydown', this.handleKeyDown.bind(this))
    }
  }

  componentWillUnmount() {
    if (this.props.keyboard) {
      window.removeEventListener('keydown', this.handleKeyDown.bind(this))
    }
  }

  handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      this.previous()
    }
    if (e.key === 'ArrowRight') {
      this.next()
    }
  }

  get styles() {
    return {
      wrapper: {
        display: 'flex',
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
      buttons: {
        ...this.props.buttonsStyle
      },
      previousButton: {
        position: 'absolute',
        top: '50%',
        left: '0%',
        transform: 'translateY(-50%)',
        // cursor: 'pointer',
        userSelect: 'none',
        pointerEvents: 'auto'
      },
      nextButton: {
        position: 'absolute',
        top: '50%',
        right: '0%',
        transform: 'translateY(-50%)',
        // cursor: 'pointer',
        userSelect: 'none',
        pointerEvents: 'auto'
      },
      tracker: {
        position: 'absolute',
        left: '50%',
        bottom: '0%',
        transform: 'translateX(-50%)',
        // cursor: 'pointer',
        userSelect: 'none',
        pointerEvents: 'auto',
        ...this.props.trackerStyle
      }
    }
  }
}
