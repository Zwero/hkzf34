
import React, { Component, Fragment } from 'react';

import { HashRouter as Router, Link, Route } from "react-router-dom";

const Home = () => <div>首页</div>
const About = () => <div>About</div>
const User = () => <div>User</div>

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <nav>
            <Link to="/">首页</Link>
            <Link to="/About">关于</Link>
            <Link to="/User">用户</Link>
          </nav>
          <section>
            <Route path="/" exact  component={Home} />
            <Route path="/About" component={About} />
            <Route path="/User" component={User} />
          </section>
        </Router>
      </Fragment>
    );
  }
}
export default App;