import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import EditEntityForm from './components/forms/EditEntityForm.jsx';
import AddEntityUpdateForm from './components/forms/AddEntityUpdateForm.jsx';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// import 'sweetalert/dist/sweetalert.css';
// import sweetalert from 'sweetalert';

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
        <span className="entity-edit-controls">
          <button onClick={this._deleteEntity.bind(this)}
                  className="pull-right button-danger-o">
            <span className="lnr lnr-cross"></span> Delete
          </button>

          <button onClick={this._editEntity.bind(this)}
                  className="pull-right">
            <span className="lnr lnr-pencil"></span> Edit
          </button>

          {this.state.showEditEntityForm ? <EditEntityForm entityInfo={this.getEntityInfo()} /> : ""}
        </span>
      )
    }
  }

  _renderEntLogo(entLogo) {
    if (entLogo !== '') {
      return Cloudinary._helpers.url(entLogo, {});
    } else {
      return "/images/default-logo.jpg";
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
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        transitionAppear={true}
        transitionAppearTimeout={300} >

        <div className="entity-details-template" key="entityAnimationKey">

          { this._showEntityEditControls() }

          <h1>{entity.title}</h1>

          <div className="row">
            <div className="nine columns">
              <div className="row">
                <div className="three columns">
                  <img src={this._renderEntLogo(entity.logo)} className="u-max-full-width" />
                </div>
                <div className="nine columns">
                  <span className={"goal " + entity.bucketType + "-color-inverse"}>Goal: <strong>{entity.goal}</strong></span>
                  <p>{entity.desc}</p>
                </div>
              </div>
            </div>
            <div className="three columns">
              <ul className="entity-contact-info">
                <li><strong>User</strong><br /> {entity.entityUser}</li>
                <li><strong>Email</strong><br /> {entity.email}</li>
                <li><strong>Phone</strong><br /> {entity.phone}</li>
                <li><strong>Address</strong><br /> {entity.address}</li>
                <li><strong>Web</strong><br/> {entity.web}</li>
              </ul>
            </div>
          </div>

          <ul className="entity-details">
            <li>Added:<br /> <strong>{entity.createdAt.toDateString()}</strong></li>
            <li>Type:<br /> <strong className={entity.bucketType + "-color"}>{entity.bucketType}</strong></li>
            {entity.lob ? <li>L.O.B.:<br /> <strong>{entity.lob}</strong></li> : null}
            {entity.stage ? <li>Stage:<br /> <strong>{entity.stage}</strong></li> : null}
            {entity.partnershipType ? <li>partnershipType:<br /> <strong>{entity.partnershipType}</strong></li> : null}
          </ul>

          <div className="row">
            <div className="nine columns">
              {this._showUpdatesControls()}
              <h3>Updates</h3>
              <div className="well dark-bg">
                {this.state.showAddUpdatesForm ? <AddEntityUpdateForm entityID={this.props.entityID} /> : ""}
                {updateListing}
              </div>
            </div>
            <div className="three columns">
              <h3>Customers</h3>
              { customerList }
            </div>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
}
ReactMixin(EntityDetails.prototype, TrackerReactMixin);
