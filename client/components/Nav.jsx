import React from 'react';

export default class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className={FlowRouter.current().path == "/" ? 'active' : ''}><span className="lnr lnr-home"></span></a>
        <a href="grapes" className={FlowRouter.current().path == "/grapes" ? 'active' : ''}><span className="lnr lnr-users"></span></a>
        <a href="supersecretsignup" className={FlowRouter.current().path == "/supersecretsignup" ? 'active' : ''}><span className="lnr lnr-cog"></span></a>
      </nav>
    )
  }
}
