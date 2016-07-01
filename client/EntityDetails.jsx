import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import EntityForm from './components/forms/EntityForm.jsx';
import AddEntityUpdateForm from './components/forms/AddEntityUpdateForm.jsx';

export default class EntityDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddUpdatesForm: false,
      showEditEntityForm: false,
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
    return EntityUpdates.find({ ownerEntity: this.props.entityID }, {sort: {createdAt: -1}}).fetch();
  }

  _entityUpdatesFormDisplay() {
    this.setState({showAddUpdatesForm: !this.state.showAddUpdatesForm});
  }

  _deleteEntity() {
    let entity = this.getEntityInfo();
    let entityName = entity.title;
    let confirmation = confirm("Are you sure you want to delete " + entityName + "?");
    if(confirmation) {
      Meteor.call('deleteEntity', this.props.entityID, (err, res)=>{
        if(err) throw new Meteor.Error("Error Deleting Entity", err);
        FlowRouter.go("/admin");
        Bert.alert({
          title: entityName + ' Deleted!',
          type: 'success',
          style: 'growl-top-right'
        });
      });
    }
  }

  _editEntity() {
    this.setState({'showEditEntityForm' : !this.state.showEditEntityForm});
  }

  _showEntityEditControls() {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return (
        <span>
          <div className="row">
            <button onClick={this._deleteEntity.bind(this)}
                    className="pull-right button-danger-o">
              <span className="lnr lnr-cross"></span> Delete
            </button>
            <button onClick={this._editEntity.bind(this)}
                    className="pull-right">
              <span className="lnr lnr-pencil"></span> Edit
            </button>
          </div>
          {this.state.showEditEntityForm ? <EntityForm /> : ""}
        </span>
      )
    }
  }

  _showUpdatesControls() {
    if(Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return (
        <button onClick={this._entityUpdatesFormDisplay.bind(this)}
                className="button pull-right"
                type="button">
            {this.state.showAddUpdatesForm ? 'Hide form' : '+ Add update'}
        </button>
      )
    }
  }

  render() {
    let entity = this.getEntityInfo();
    let updateList = this._getEntityUpdates();

    console.log(updateList)

    if (!entity) { return (<span>Entity does not exist</span>); }

    // customer listing
    const customerList = entity.customers.length < 1 ? "No customers yet..." : <ul>{entity.customers.map((customer)=>{return <li key={customer}>{customer}</li>})}</ul>;

    //the update listing
    const updateListing = updateList.length > 0 ? <ul className="update-listing">{updateList.map((update)=>{ return (
      <li key={update._id}><h5>{update.title}</h5>{update.createdAt.toDateString()}<br />{update.desc}</li>
    )})}</ul> : <p>No Updates yet...</p>;

    return (
      <div className="entity-details-template">

        { this._showEntityEditControls() }

        <div className="row">
          <div className="nine columns">
            <h1>{entity.title}</h1>
            <span className="goal">{entity.goal}</span>
            <p>{entity.desc}</p>
            <small>Working with Direct Supply Since: {entity.createdAt.toDateString()}</small>
            <ul>
              <li>Type: {entity.bucketType}</li>
              <li>Phone: {entity.phone}</li>
              <li>Address: {entity.address}</li>
              <li>Web: {entity.web}</li>
              {entity.lob ? <li>L.O.B.: {entity.lob}</li> : null}
              {entity.stage ? <li>Stage: {entity.stage}</li> : null}
              {entity.partnershipType ? <li>partnershipType: {entity.partnershipType}</li> : null}
              <li>User: {entity.entityUser}</li>
              <li>Email: {entity.email}</li>
            </ul>
          </div>
          <div className="three columns">
            <img src={entity.logo} className="u-max-full-width" />
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="nine columns">
            {this._showUpdatesControls()}
            <h3>Updates</h3>
            {this.state.showAddUpdatesForm ? <AddEntityUpdateForm entityID={this.props.entityID} /> : ""}
            {updateListing}
          </div>
          <div className="three columns">
            <h3>Customers</h3>
            { customerList }
          </div>
        </div>
      </div>
    )
  }
}
ReactMixin(EntityDetails.prototype, TrackerReactMixin);
