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
    const allCity = (await axios("/area/city?level=1")).body;
    // 3 获取热门的城市
    const hotCity = (await axios("/area/hot")).body;
    // 4 综合的数组
    /* 
    [
      {"当前地址":["广州市"]},
      {"热门城市":["北京","广州","上海","深圳"]}
      {A:[]},
      {B:[]}...
    ]
     */
    let totalCity = [
      { "当前地址": [cityName] },
      { "热门城市": hotCity.map(v => v.label) }
    ];
    // 5 对数组进行排序  a aa ab abc ba bb bc ....
    allCity.sort((a, b) => a.short.localeCompare(b.short));
    // 6 循环
    allCity.forEach(v => {
      // 获取到了 “bj” 中的 "B"
      const firstLetter = v.short[0].toUpperCase();
      // 7 判断  获取索引 
      const index = totalCity.findIndex(vv => {
        // vv = { "当前地址": [cityName] }
        // vv = { "热门城市": ['广州'] }
        if (vv[firstLetter]) {
          return true;
        } else {
          return false;
        }
      })
      // 8 判断 数组中是否存在 A 对象了
      if (index === -1) {
        // {A:[]} 不存在 
        totalCity.push(
          // firstLetter 是一个变量 而不是 对象中的一个属性
          { [firstLetter]: [v.label] }
        );
      } else {
        // totalCity 数组
        //  totalCity[index] 数组中的某个元素  == 对象 => {"A":[]}
        //  totalCity[index][firstLetter] {"A":[]}.A 
        totalCity[index][firstLetter].push(v.label);
      }
    })
    console.log(totalCity);
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