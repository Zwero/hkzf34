import React, { Component, Fragment } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import styles from "./index.module.scss";
const BMap = window.BMap;
class index extends Component {
  componentDidMount() {
    // 创建地图实例  
    const map = new BMap.Map("allmap");
    // 创建点坐标  
    // 初始化地图，设置中心点坐标和地图级别
    map.centerAndZoom("广州市", 15);
    // 缩放组件
    map.addControl(new BMap.NavigationControl());
    // 比例尺
    map.addControl(new BMap.ScaleControl());
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