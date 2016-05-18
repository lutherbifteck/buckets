import React from 'react';
import Spinner from 'react-spin';

export default class BucketSpinner extends React.Component {
  render() {
    var spinCfg = {
      width: 12,
      radius: 35,
    };
    return <Spinner config={spinCfg} />
  }
};
