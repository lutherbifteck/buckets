import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import AddEntityForm from './components/forms/AddEntityForm.jsx';

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
    console.log(this.state, Roles.userIsInRole(Meteor.userId(), ['admin']))
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

  _showAdminControls() {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return (
        <div>
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
          {this.state.showEditEntityForm ? <AddEntityForm /> : ""}
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
              <li>Phone: {entity.phone}</li>
              <li>Address: {entity.phone}</li>
              <li>name: {entity.phone}</li>
              <li>email: {entity.phone}</li>
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
