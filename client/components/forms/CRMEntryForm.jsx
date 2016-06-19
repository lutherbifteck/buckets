import React from 'react';

export default class CRMEntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      userEntityId: props.userEntityId
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    var dateOfInteraction = this.refs.dateOfInteraction.value;
    var userEntityId = this.props.userEntityId;
    var customer = this.refs.customer.value;
    var type = this.refs.interactionType.value;
    var details = this.refs.interactionDetails.value.trim();

    Meteor.call('AddInteraction',
    dateOfInteraction,
    userEntityId,
    customer,
    type,
    details,
    (err) => {
      if (err) throw new Meteor.Error('error-submitting-interaction', err);
      this.refs.customer.value = "";
      this.refs.interactionDetails.value = "";
      this.refs.interactionType.value = "";
      Bert.alert({
        title: 'Interaction Added!',
        type: 'success',
        style: 'growl-top-right',
        icon: 'fa-thumbs-up'
      });
    });
  }

  // uploadFile(ev) {
  //   _.each(ev.target.files, function(file) {
  //     Meteor.saveFile(file, file.name);
  //   });
  // }

  render() {
    return (
      <div>
        <h3>Add an Interaction</h3>
        <p><strong>User</strong> {this.state.userId}</p>
        <p><strong>User Entity</strong> {this.state.userEntityId}</p>

        {/* <input ref="fileUpload" onChange={this.uploadFile.bind(this)} type="file" /> */}

        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Date of Interaction</label>
          <input ref="dateOfInteraction" type="date" className="u-full-width" />

          <label>Customer</label>
          <select ref="customer" className="u-full-width">
            <option value="Customer 1">Customer 1</option>
            <option value="Customer 2">Customer 2</option>
            <option value="Customer 3">Customer 3</option>
          </select>

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
    );
  }
}
