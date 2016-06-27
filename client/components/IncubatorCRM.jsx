import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

//import CRMEntryForm from './forms/CRMEntryForm.jsx';
import Spinner from './Spinner.jsx';


class IncubatorCRMList extends React.Component {
	constuctor() {
		this.state = {
			direction: ASC
		}
	}

	render() {
		if (this.props.list.length < 1) return (<div><Spinner></Spinner><br />Loading entities...</div>)
		return (
			<div className="incubator-crm-list">



				<div className="row">
					<div className="three columns"><strong>Startup</strong></div>
					<div className="three columns"><strong>Customer</strong></div>
					<div className="three columns"><strong>Interaction Type</strong></div>
					<div className="three columns"><strong>Date of Interaction</strong></div>
				</div>
				{this.props.list.map((ent) => {
					return (
						<div key={ent._id} className="row">
							<div className="three columns">{ent.entityId}</div>
							<div className="three columns">{ent.customer}</div>
							<div className="three columns">{ent.type}</div>
							<div className="three columns">{ent.dateOfInteraction}</div>
						</div>
					)
				})}
			</div>
		);
	}
}


export default class IncubatorCRM extends React.Component {
	componentWillMount() {
		this.state = {
			subscription: {
				interactions: Meteor.subscribe("interactions")
			}
		};
	}

	componentWillUnmount() {
		this.state.subscription.interactions.stop()
	}

	getInteractions() {
		return Interactions.find().fetch();
	}

	render() {
		var interactionList = this.getInteractions();

		return (
			<div className="incubator-crm">
        <h2>Incubator CRM</h2>
				<small>Click on a row for more detailed information.</small>
        <div className="row">
          <div className="twelve columns">
            <IncubatorCRMList list={interactionList} />
          </div>
        </div>
			</div>
		)
	}
}
ReactMixin(IncubatorCRM.prototype, TrackerReactMixin);
