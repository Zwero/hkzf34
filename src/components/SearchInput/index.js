import React, { Component, Fragment } from 'react';
import styles from "./index.module.scss";
import store from "../../store";

import {withRouter  } from "react-router-dom";

class index extends Component {
  state = {
    cityName: ""
  }
  Unsubscribe = null;
  constructor() {
    super();
    // 1 获取store中的数据
    const storeState = store.getState();

    this.state = {
      cityName: storeState.mapReducer.cityName
    }

    // 2 订阅 
    this.Unsubscribe=store.subscribe(this.handleStateChange);
  }
  handleStateChange = () => {
    this.setState({
      cityName: store.getState().mapReducer.cityName
    })
  }
  // 组件将要 卸载的时候 
  componentWillUnmount() {
    // 取消订阅 
    this.Unsubscribe();
  }
  render() {
    return (
      <Fragment>
        <div className={styles.search_input}>
          <div className={styles.si_city}>
            <div  onClick={()=>this.props.history.push("/CityList")}  className={styles.si_city_name}>
              <span>{this.state.cityName}</span>
              <i className={"iconfont icon-arrow"}></i>
            </div>
            <div className={styles.si_city_inp}>
              <i className={"iconfont icon-seach"}></i>
              <span>请输入小区或地址</span>
            </div>
          </div>
          <div onClick={()=>this.props.history.push("/BDMap")} className={styles.si_icon}>
            <i className={"iconfont icon-map " + styles["icon-map"]}></i>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default withRouter(index);