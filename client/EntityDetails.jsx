import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import AddEntityUpdateForm from './components/forms/AddEntityUpdateForm.jsx';

export default class EntityDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddUpdatesForm: false,
      subscription: {
        singleEntityInfo: Meteor.subscribe("getSingleEntityInfo", this.props.entityID),
        entityUpdates: Meteor.subscribe('entityUpdates', this.props.entityID)
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.singleEntityInfo.stop();
    this.state.subscription.entityUpdates.stop();
  }

  getEntityInfo() {
    return Entities.findOne(this.props.entityID);
  }

  _getEntityUpdates() {
    return EntityUpdates.find({ ownerEntity: this.props.entityID }, {sort: {createdAt: -1}});
  }

  _entityUpdatesFormDisplay() {
    this.setState({showAddUpdatesForm: !this.state.showAddUpdatesForm});
  }

  _deleteEntity() {
    Meteor.call('deleteEntity', this.props.entityID, (err, res)=>{
      if(err) throw new Meteor.Error("Error Deleting Entity", err);
      console.log("ent deleted")
      FlowRouter.go("/admin");
    });
  }

  _editEntity() {
    console.log("editing entity...")
  }

  _showAdminControls() {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return (
        <div className="row">
          <button onClick={this._editEntity.bind(this)}>
            <span className="lnr lnr-pencil"></span> Edit
          </button>
          <button onClick={this._deleteEntity.bind(this)} className="button-danger">
            <span className="lnr lnr-cross"></span> Delete
          </button>
        </div>
      )
    }
  }

  render() {
    let entity = this.getEntityInfo();
    let updateList = this._getEntityUpdates();

    if (!entity) { return (<span>Entity does not exist</span>); }

    // customer listing
    const customerList = entity.customers.length < 1 ? "No customers yet..." : <ul>{entity.customers.map((customer)=>{return <li key={customer}>{customer}</li>})}</ul>;

    //the update listing
    const updateListing = updateList.length < 1 ? 'No Updates yet...' : <ul className="update-listing">{updateList.map((update)=>{ return (
      <li key={update._id}><h5>{update.title}</h5>{update.createdAt.toDateString()}<br />{update.desc}</li>
    )})}</ul>;

    return (
      <div className="entity-details-template">

        {this._showAdminControls()}

        <div className="row">
          <div className="nine columns">
            <h1>{entity.title}</h1>
            <span className="goal">{entity.goal}</span>
            <p>{entity.desc}</p>
            <small>Working with Direct Supply Since: {entity.createdAt.toDateString()}</small>
            <ul>
              <li>Phone</li>
              <li>Address</li>
              <li>name</li>
              <li>email</li>
            </ul>
            { customerList }
          </div>
          <div className="three columns">
            <img src={entity.logo} className="u-max-full-width" />
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="twelve columns">
            <div className="row">
              <button onClick={this._entityUpdatesFormDisplay.bind(this)}
                      className="button pull-right"
                      type="button">
                  {this.state.showAddUpdatesForm ? 'Hide form' : '+ Add update'}
              </button>
            </div>

            {this.state.showAddUpdatesForm ? <AddEntityUpdateForm entityID={this.props.entityID} /> : null}
            <h3>Updates</h3>
            {updateListing}
          </div>
        </div>

      </div>
    )
  }
}
ReactMixin(EntityDetails.prototype, TrackerReactMixin);
