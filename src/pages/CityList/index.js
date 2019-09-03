/* 
1 获取 数据 1 当前定位 2 热门城市 3 所有城市 
  1 当前定位 （redux）
    1 先打开 城市列表页面
      1 componentDidMount （因为componentDidMount 运行时机比 App.js 中 获取当前城市 代码要快 ）
        1 直接获取redux中的 当前城市 获取不到 
      2 需要通过 store.subscribe 来获取 
    2 先打开首页 
      1 在首页中 已经是获取到了  当前城市
      2 切换到 城市列表 页面的时候 store.subscribe  订阅 不会触发的！！ 
      3 需要通过 componentDidMount 直接获取即可  
  2 热门城市 /area/hot
  3 所有城市 /area/city
2 思考如何构造数据  （什么样的格式）
 */
import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { axios } from "../../utils/request";
import store from "../../store";
class index extends Component {

  constructor() {
    super();
    // 1 对store中的数据开启了监听 
    store.subscribe(this.getAllCitys);
  }


  componentDidMount() {

    const { mapReducer } = store.getState();
    if (mapReducer.cityName) {
      this.getAllCitys();
    }
  }

  // 获取 页面要的城市数据
  async getAllCitys() {
    // 1 当前城市
    const cityName = store.getState().mapReducer.cityName;
    // 2 获取所有的城市
    const allCity=(await axios("/area/city?level=1")).body;
    // 3 获取热门的城市
    const hotCity=(await axios("/area/hot")).body;
    console.log(hotCity);



  }


  render() {
    return (
      <div className="city_list">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >城市选择</NavBar>
      </div>
    );
  }
}
export default index;