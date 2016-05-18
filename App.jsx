import React from 'react';
import ReactDOM from 'react-dom';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

export default class App extends React.Component {

  resolutions() {
    return Resolutions.find().fetch();
  }

  addResolution(event) {
    event.preventDefault();
    var text = this.refs.resolution.value.trim();
    Resolutions.insert({
      text: text,
      complete: false,
      createdAt: new Date()
    });
    this.refs.resolution.value = '';
  }

  render() {
    let res = this.resolutions();

    if(res.length < 1) {
      return (<div>Loading...</div>)
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3">
            List of projects under Bucket
          </div>
          <div className="col-sm-9">
            Selected Project's details
            <form className="new-resolution" onSubmit={this.addResolution.bind(this)} >
              <input type="text"
                     className="form-control"
                     ref="resolution"
                     placeholder="New Resolution" />
            </form>
            <div>
              {res.map((res) => {
                    return <span key={res._id}>{res.text}</span>;
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
ReactMixin(App.prototype, TrackerReactMixin);
