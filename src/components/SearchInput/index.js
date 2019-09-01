import React, { Component, Fragment } from 'react';
import styles from "./index.module.scss";
import store from "../../store";

class index extends Component {
  state = {
    cityName: ""
  }
  constructor() {
    super();
    const storeState = store.getState();
    this.state = {
      cityName: storeState.mapReducer.cityName
    }
    store.subscribe(this.handleStateChange);
  }
  handleStateChange = () => {
    this.setState({
      cityName: store.getState().mapReducer.cityName
    })
  }
  render() {
    return (
      <Fragment>
        <div className={styles.search_input}>
          <div className={styles.si_city}>
            <div className={styles.si_city_name}>
              <span>{this.state.cityName}</span>
              <i className={"iconfont icon-arrow"}></i>
            </div>
            <div className={styles.si_city_inp}>
              <i className={"iconfont icon-seach"}></i>
              <span>请输入小区或地址</span>
            </div>
          </div>
          <div className={styles.si_icon}>
            <i className={"iconfont icon-map " + styles["icon-map"]}></i>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default index;