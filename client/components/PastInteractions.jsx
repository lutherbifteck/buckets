import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class PastInteractions extends React.Component {
  componentWillMount() {
    this.state = {
      subscription: {
				interactions: Meteor.subscribe("myPastInteractions")
			}
    }
  }

  componentWillUnmount() {
    this.state.subscription.interactions.stop();
  }

  getMyPastInteractions() {
    return Interactions.find({createdBy: Meteor.userId()}).fetch();
  }

  render() {
    let myPastInteractions = this.getMyPastInteractions();

    const pastInts = myPastInteractions.length < 1 ? <p>You have no interactions</p> :
    <div className="past-interactions-list">
      <div className="row">
        <div className="three columns"><strong>Customer</strong></div>
        <div className="three columns"><strong>Interaction type</strong></div>
        <div className="three columns"><strong>Interaction Type</strong></div>
        <div className="three columns"><strong>Date of Interaction</strong></div>
      </div>
      {myPastInteractions.map((int) => {
        return (
          <div key={int._id} className="row">
             <div className="three columns">{int.customer}</div>
             <div className="three columns">{int.type}</div>
             <div className="three columns">{int.dateOfInteraction}</div>
             <div className="three columns">{int.details}</div>
           </div>
        )
      })}
    </div>;

    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        transitionAppear={true}
        transitionAppearTimeout={300} >
        <div>
          <h1>My Past Interactions</h1>
          {pastInts}
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
ReactMixin(PastInteractions.prototype, TrackerReactMixin);
