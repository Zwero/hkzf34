/* 
1 了解百度地图的用法 
2 根据 城市 名称 获取 id 
3 根据 城市的 id 去获取 城市下的 房源信息 


 */
import React, { Component, Fragment } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import styles from "./index.module.scss";
import { axios } from "../../utils/request";
import store from "../../store";

const BMap = window.BMap;
class index extends Component {
  constructor() {
    super();
    store.subscribe(this.initCity);
  }
  componentDidMount() {
    // // 创建地图实例  
    // const map = new BMap.Map("allmap");
    // // 创建点坐标  
    // // 初始化地图，设置中心点坐标和地图级别
    // map.centerAndZoom("广州市", 15);
    // // 缩放组件
    // map.addControl(new BMap.NavigationControl());
    // // 比例尺
    // map.addControl(new BMap.ScaleControl());
  }

  async initCity() {
    const cityName=store.getState().mapReducer.cityName;
    console.log(store.getState());
    console.log(cityName);
    // 创建地图实例  
    const map = new BMap.Map("allmap");
    // 创建点坐标  
    // 初始化地图，设置中心点坐标和地图级别
    map.centerAndZoom("广州市", 15);
    // 缩放组件
    map.addControl(new BMap.NavigationControl());
    // 比例尺
    map.addControl(new BMap.ScaleControl());
    const res1 = (await axios.get("/area/info?name="+cityName))
    console.log(res1);
  }

  render() {
    return (
      <Fragment>
        <div className={styles.hk_bdmap}>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.go(-1)}
          >地图找房</NavBar>
          <div className={styles.bd_map_content}>
            <div className={styles.allmap} id="allmap"></div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default index;