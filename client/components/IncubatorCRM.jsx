import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

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

	getStartups() {
		return Interactions.find().fetch();
	}

	render() {
		var startupList = this.getStartups();
		var incTable = startupList.length < 1 ? <div>'No entities'</div> :
			<div>
				<div className="row">
					<div className="three columns">Startup</div>
					<div className="three columns">Customer</div>
					<div className="three columns">Type</div>
					<div className="three columns">Date</div>
				</div>
				{startupList.map((ent)=>{return (
			 	<div key={ent._id} className="row">
			 		<div className="three columns">{ent.customer}</div>
			 	</div>
			 )})}
			</div>

		return (
			<div className="IncubatorCRM">
				<h2>Incubator CRM</h2>
				{incTable}
				Click on a row detailed information.
			</div>
		)
	}
}

ReactMixin(IncubatorCRM.prototype, TrackerReactMixin);
