import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import Spinner from './components/Spinner.jsx';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

const styles = {
	active: {
		display: 'inherit'
	},
	inactive: {
		display: 'none'
	}
}

class SingleCRMEntry extends React.Component {
	constructor() {
		super();
		this.state = {
			active: false
		}
		this._toggleActive = this._toggleActive.bind(this);
	}

	_toggleActive() {
		this.setState({active: !this.state.active});
	}
	render() {
		const stateStyle = this.state.active ? styles.active : styles.inactive;

		return (
			<div className="single-crm-entry" onClick={this._toggleActive}>
				<div className="row">
					<div className="three columns">Entit ID: {this.props.data.entityId}</div>
					<div className="three columns">{this.props.data.customer}</div>
					<div className="three columns">{this.props.data.type}</div>
					<div className="three columns">{this.props.data.dateOfInteraction}</div>
				</div>
				<div style={stateStyle}>
					{this.props.data.details}
				</div>
			</div>
		);
	}
}

class IncubatorCRMList extends React.Component {
	render() {
		if (this.props.list.length < 1) return (<div>Loading entities...<Spinner></Spinner></div>)
		return (
			<div className="incubator-crm-list">
				<div className="row">
					<div className="three columns"><strong>Entity</strong></div>
					<div className="three columns"><strong>Customer</strong></div>
					<div className="three columns"><strong>Interaction Type</strong></div>
					<div className="three columns"><strong>Date of Interaction</strong></div>
				</div>
				{this.props.list.map((ent) => {
					return (
						<SingleCRMEntry key={ent._id} data={ent} />
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
