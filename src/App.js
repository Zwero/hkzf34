
import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import News from "./pages/News";
import Profile from "./pages/Profile";
import HKLayout from "./components/HKLayout";
import {citySet  } from "./store/actionCreator";
import store from "./store";


class App extends Component {

  componentDidMount() {
    this.getLocalCity();
  }
  getLocalCity() {
    const myCity = new window.BMap.LocalCity();
    myCity.get((result) => {
      const cityName = result.name;
      store.dispatch(citySet(cityName));  
    });
  }


  render() {
    return (
      <Fragment>
        <Router>
          <section>
            <Route path="/" exact render={() => <HKLayout> <Home /> </HKLayout>} />
            <Route path="/List" render={() => <HKLayout> <List /> </HKLayout>} />
            <Route path="/News" render={() => <HKLayout> <News /> </HKLayout>} />
            <Route path="/Profile" render={() => <HKLayout> <Profile /> </HKLayout>} />
          </section>
        </Router>
      </Fragment>
    );
  }
}
export default App;