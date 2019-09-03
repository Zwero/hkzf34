
import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import News from "./pages/News";
import CityList from "./pages/CityList";
import Profile from "./pages/Profile";
import HKLayout from "./components/HKLayout";
import {citySet  } from "./store/actionCreator";
import store from "./store";


class App extends Component {
  componentDidMount() {
    this.getLocalCity();
  }

  // 1 调用自己的方法
  getLocalCity() {
    // 2 LocalCity 百度地图 内置的方法
    const myCity = new window.BMap.LocalCity();
    // 3  获取当前的地理位置 
    myCity.get((result) => {
      // 4 获取地址 成功  
      const cityName = result.name;
      // 5 调用redux的方法 派发行为  
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
            <Route path="/CityList" component={CityList} />
          </section>
        </Router>
      </Fragment>
    );
  }
}
export default App;