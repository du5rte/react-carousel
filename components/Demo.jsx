import React, { Component } from 'react'
import View from 'react-flexbox'

import Carousel from './Carousel'

export default class Demo extends Component {
  render() {
    let styleContrainer = {
      height: '400px',
      width: '600px'
      // height: '100%',
      // width: '100%',
    }

    let style = {
      height: '100%',
      fontSize: '1500%',
      display: 'flex',
      flex: '1',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.3)'
    }

    let styleANother = {
      height: '150px',
      width: '50px',
      fontSize: '100%',
      display: 'flex',
      flex: '1',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.3)'
    }

    let asd = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"


    return (
      <div style={styleContrainer}>
        <Carousel >
          <div style={style}>0😭</div>
          <div style={style}>1😩</div>
          <div style={styleANother}>2😟</div>
          <div style={style}>3🙁</div>
          <div style={style}>4😶</div>
          <div style={style}>5🙂</div>
          <div style={style}>6😀</div>
          <div style={style}>7😂</div>
        </Carousel>
      </div>
    )
  }
}
