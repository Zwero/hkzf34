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
  // 全局的地图对象
  Map = null;
  constructor() {
    super();
    // 开启了订阅 需要等待 App.js  获取当前城市 成功 
    store.subscribe(this.initCity);
  }
  componentDidMount() {
    const cityName = store.getState().mapReducer.cityName;
    if (cityName) {
      this.initCity();
    }
  }

  initCity = async () => {


    let cityName = store.getState().mapReducer.cityName;
    // console.log(cityName);
    cityName = "广州市";
    // 创建地图实例  
    this.Map = new BMap.Map("allmap");
    // 创建点坐标  
    // 初始化地图，设置中心点坐标和地图级别
    this.Map.centerAndZoom(cityName, 11);
    // 缩放组件
    this.Map.addControl(new BMap.NavigationControl());
    // 比例尺
    this.Map.addControl(new BMap.ScaleControl());
    // 获取城市的 id 
    const id = (await axios.get("/area/info?name=" + cityName)).body.value
    // 获取 该城市的 区域 房源信息
    const areas = (await axios.get("/area/map?id=" + id)).body;
    // 开始描绘房源
    this.drawHouse(areas);
  }

  // 描绘 房源信息到地图上 
  drawHouse = (arr) => {
    arr.forEach(v => {
      const point = new BMap.Point(v.coord.longitude, v.coord.latitude);

      const opts = {
        position: point,    // 指定文本标注所在的地理位置
        offset: new BMap.Size(30, -30)    //设置文本偏移量
      }
      const label = new BMap.Label(`<div  class=${styles.circle} > ${v.label}<br/>${v.count}套 </div>`, opts);  // 创建文本标注对象
      label.setStyle({
       backgroundColor:"transparent",
       border:"none"
      });
      // 把覆盖物添加到 地图上
      this.Map.addOverlay(label);
    })
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