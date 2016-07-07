import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import Reactable from 'reactable';

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
	/*render() {
		if (this.props.list.length < 1) return (<div>No Interactions yet.</div>)
		return (
			<div className="incubator-crm-list">
				<small>Click on a row for more detailed information.</small>
				<div className="row">
					<div className="three columns"><strong>Entity</strong></div>
					<div className="three columns"><strong>Customer</strong></div>
					<div className="three columns"><strong>Interaction Type</strong></div>
					<div className="three columns"><strong>Date of Interaction</strong></div>
				</div>
				{this.props.list.map((int) => {
					return (
						<SingleCRMEntry key={int._id} data={int} />
					)
				})}
			</div>
		);
	}*/
	_intToRow(inter) {
		var unsafe = Reactable.unsafe;

		var row = {
			entity: inter.entityName,
			customer: inter.customer,
			type: inter.type,
			date: inter.dateOfInteraction,
			description: inter.details,
			created: inter.createdAt.toDateString()
		}
		return row;
	}


	render() {
		var Table = Reactable.Table,
			Tr = Reactable.Tr;

		//var data = this.props.list.map((inter) => this._intToRow(inter));

		if (this.props.list.length < 1)
			return (<div>No Interactions yet.</div>)

		else {
			var data = this.props.list;
			var data2 = data.map((inter) => this._intToRow(inter));

			console.log(data);

			console.log(data2);

			return (
				<Table className="table" sortable={true}>
					{this.props.list.map((int)=>{
						return (
							<Tr key={int._id} data={this._intToRow(int)}></Tr>
						)
					})}
				</Table>
			)
		}

		//for each element inter of this.props.list
	/*	return <Table className="table" data={this.props.list} />*/
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
