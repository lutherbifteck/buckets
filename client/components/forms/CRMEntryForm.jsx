import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class CRMEntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewCustField: false,
    };
  }

  componentWillReceiveProps() {
    var conditionsPass = this.props.currentUser && Roles.userIsInRole(Meteor.userId(), 'entity-member') && this.props.loadingEntityData && this.props.currentUser && this.props.currentUser.profile && this.props.currentUser.profile.entity;

    if( conditionsPass ) {
        let data = this._getEntData();
        if (data[0].customers && data[0].customers.length > 0) {
          this.setState({customers: data[0].customers})
        } else {
          this.setState({customers: false})
          this.setState({showNewCustField: true})
        };
    }
  }

  _getEntData() {
    return Entities.find({_id: this.props.currentUser.profile.entity}).fetch();
  }

  _toggleNewCustField() {
    if(this.refs.customer.value === 'other') {
      this.setState({showNewCustField: true});
    } else {
      this.setState({showNewCustField: false});
    }
  }

  handleSubmit(myEntID, event) {
    event.preventDefault();
    var dateOfInteraction = this.refs.dateOfInteraction.value;
    var type = this.refs.interactionType.value;
    var details = this.refs.interactionDetails.value.trim();
    var customer;

    if( this.refs.customer.value === 'other') {
      customer = this.refs.newCustomer.value.trim();
    } else {
      customer = this.refs.customer.value;
    }

    Meteor.call('AddInteraction',
      dateOfInteraction,
      myEntID,
      customer,
      type,
      details,
      (err) => {
        if (err) throw new Meteor.Error('error-submitting-interaction', err);
        this.refs.customer.value = "";
        this.refs.interactionDetails.value = "";

        // clear newCustomer field if it is rendered
        if (this.refs.newCustomer) this.refs.newCustomer.value = "";
        this.setState({showNewCustField: false});

        Bert.alert({
          title: 'Interaction Added!',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-thumbs-up'
        });
      }
    );
  }

  _renderCustomers() {
    if(this.state.customers) {
      return this.state.customers.map((cust)=>{
        return (
          <option key={cust} value={cust}>{cust}</option>
        );
      });
    }
  }

  render() {
    let myUserId = this.props.currentUser ? this.props.currentUser.username : '';
    let myEntID = this.props.currentUser ? this.props.currentUser.profile.entity : '';

    return (

      <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        transitionAppear={true} >


      <div key="crmEntryAnimationKey">
        <h3>Add an Interaction</h3>
        <p><strong>User:</strong> {myUserId}</p>
        <p><strong>User Entity:</strong> {myEntID}</p>

        <form onSubmit={this.handleSubmit.bind(this, myEntID)}>
          <label>Date of Interaction</label>
          <input ref="dateOfInteraction" type="date" className="u-full-width" />

          <label>Customer</label>
          <select ref="customer"
                className="u-full-width"
                onChange={this._toggleNewCustField.bind(this)}
                value = "">
            { this._renderCustomers() }
            <option onClick={this._toggleNewCustField} value="other">Other</option>
          </select>

          {this.state.showNewCustField || this.state.customers && this.state.customers.length < 0 ? <div><label>Add New Customer</label><input type="text" ref="newCustomer" className="u-full-width" placeholder="New Customer..." /></div> : null}

          <label>Interaction Type</label>
          <select ref="interactionType" className="u-full-width" >
            <option value="targeting">Targeting</option>
            <option value="sales">Sales</option>
          </select>

          <label>How'd it go?</label>
          <textarea ref="interactionDetails" className="u-full-width" placeholder="How'd it go?"></textarea>
          <input className="button-success u-full-width" type="submit" value="Submit" />
        </form>
      </div>

    </ReactCSSTransitionGroup>
    );
  }
}
ReactMixin(CRMEntryForm.prototype, TrackerReactMixin);
