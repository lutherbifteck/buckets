import React from 'react';

export default class CRMEntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    var customer = this.refs.customer.value;
    var type = this.refs.interactionType.value;
    var details = this.refs.interactionDetails.value.trim();

    Meteor.call('AddInteraction',
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

  render() {
    return (
      <div>
        <h3>Add An Interaction</h3>
        <p><strong>User</strong> {this.state.userId}</p>

      <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Customer</label>
          <select className="u-full-width"
                  ref="customer">
            <option value="Cust. No. 1">Cust. No. 1</option>
          </select>

          <label>Interaction Type</label>
          <select className="u-full-width"
                  ref="interactionType">
            <option value="targeting">Targeting</option>
            <option value="sales">Sales</option>
          </select>

          <label>How'd it go?</label>
          <textarea ref="interactionDetails" className="u-full-width" placeholder="How'd it go?"></textarea>
          <input className="button-primary u-full-width" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
