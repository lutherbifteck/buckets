import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class FourOFour extends React.Component {
  render() {
    return (
      <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        transitionAppear={true} >

      <div className="row" key="FourOFourAnimationKey">
        <div className="three columns">
          <img src="/images/the-captain.jpg" width="100%" alt="Captain McGibblets" />
        </div>
        <div className="nine columns">
          <h1>ARRRRRRR, 404 Matey!!</h1>
          <h4>Captain McGibblets caught you reading his Book of Nautical Secrets!</h4>
          <p>Better get outta here or prepare to walk the plank, you yellow-bellied scallywag!</p>
          <a href="/" className="button button-success">Hightail it home</a>
        </div>
      </div>
    </ReactCSSTransitionGroup>
    );
  }
}
