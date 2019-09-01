import React, { Component } from 'react';
import { axios } from "../../utils/request";
import { Carousel, WingBlank } from 'antd-mobile';

import nav1 from "../../assets/images/nav-1.png";
import nav2 from "../../assets/images/nav-2.png";
import nav3 from "../../assets/images/nav-3.png";
import nav4 from "../../assets/images/nav-4.png";

// import "./index.module.css";

import styles from "./index.module.scss";




class index extends Component {
  state = {
    swiperList: [],
    imgHeight: 176,
    // 导航数据
    navs: [{ id: 0, title: '整租', img: nav1 }, { id: 1, title: '合租', img: nav2 }, { id: 2, title: '地图找房', img: nav3 }, { id: 3, title: '去出租', img: nav4 }],
    // 租房的小组
    homeGroups: []
  }
  componentDidMount() {
    // 1 轮播图
    axios.get("/home/swiper")
      .then(res => {
        this.setState({ swiperList: res.body });
      })

    // 2 租房小组
    axios.get("/home/groups")
      .then(res => {
        this.setState({ homeGroups: res.body });
      })
  }

  render() {
    const { swiperList } = this.state;
    return (
      <div className={styles.hk_home}>
        {/* 轮播图 开始 */}
        <div className={styles.home_swiper}>
          {swiperList.length && <Carousel
            autoplay
            infinite
          >
            {this.state.swiperList.map(val => (
              <a
                key={val.id}
                href="http://www.alipay.com"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                <img
                  src={'http://hkzf.zbztb.cn' + val.imgSrc}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    // 解决图片高度的bug使用 
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            ))}
          </Carousel>}

        </div>
        {/* 轮播图 结束 */}
        {/* 导航 开始 */}
        <nav className={styles.home_nav}>
          {this.state.navs.map(v =>
            <div key={v.id} className={styles.nav_item}>
              <img src={v.img} alt="" />
              <p>{v.title}</p>
            </div>
          )}
        </nav>
        {/* 导航 结束 */}

        {/* 租房小组 开始 */}
        <div className={styles.home_group}>
          <div className={styles.home_group_title}>
            <span>租房小组</span>
            <span>更多</span>
          </div>
          <div className={styles.home_group_content}>
            {this.state.homeGroups.map(v =>
              <div key={v.id} className={styles.home_group_item}>
                <div className={styles.home_group_item_name}>
                  <div className={styles.item_name_1}>{v.title}</div>
                  <div className={styles.item_name_2}>{v.desc}</div>
                </div>
                <div className={styles.home_group_item_img}>
                  <img src={"http://hkzf.zbztb.cn" + v.imgSrc} alt="" />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* 租房小组 结束 */}
      </div>
    );
  }
}
export default index;

