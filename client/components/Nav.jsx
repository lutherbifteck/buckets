import React from 'react';

export default class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <img src="/buckets-logo.png" className="u-max-full-width" />
        <a href="/" className={FlowRouter.current().path == "/" ? 'active' : ''}><span className="lnr lnr-home"></span> HOME</a>
        <a href="grapes" className={FlowRouter.current().path == "/grapes" ? 'active' : ''}><span className="lnr lnr-users"></span></a>
        <a href="zoo" className={FlowRouter.current().path == "/zoo" ? 'active' : ''}><span className="lnr lnr-envelope"></span></a>
      </nav>
    )
  }
}
