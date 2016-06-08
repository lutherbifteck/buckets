import React from 'react';

export default TestUserAcounts = React.createClass({
  render() {
    return (
      <div>
        <header>
          {this.props.nav || <Nav />}
        </header>
        <main>
          {this.props.main}
        </main>
        <footer>
          {this.props.footer || <Footer />}
        </footer>
      </div>
    );
  }
});
