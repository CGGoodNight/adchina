import React from "react";
import "./mainad.less";
import {hashHistory} from "react-router";
import bg from "../../../static/image/png/true.png";
import png1 from "../../../static/image/png/shop.png";
import png2 from "../../../static/image/png/shaokao.png";
import png3 from "../../../static/image/png/store.png";
import png4 from "../../../static/image/png/xiaotan.png";
import anime from '../../../node_modules/animejs/lib/anime.es.js';
import $ from "jquery";
import { Anchor, Divider, Affix, Button } from 'antd';
const { Link } = Anchor;
import { Parallax } from 'rc-scroll-anim';


class MainAd extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isShowAnchor: true
    };
  }



  componentDidMount() {
    // 页面加载动画
    setTimeout(() => {
      anime({
        targets: '.one',
        translateY: "60vh",
        duration: 1400,
        opacity: 1
      });
      anime({
        targets: '.two',
        translateY: "56vh",
        duration: 1600,
        opacity: 1
      });
      anime({
        targets: '.three',
        translateY: "62vh",
        duration: 1800,
        opacity: 1
      });
      anime({
        targets: '.four',
        translateY: "58vh",
        duration: 2000,
        opacity: 1
      });
      anime({
        targets: '.com',
        translateX: 150,
        duration: 1600,
        opacity: 1
      });
      anime({
        targets: '.intro .title h1',
        translateX: 0,
        duration: 1000,
        opacity: 1
      });
      anime({
        targets: '.intro .title h2',
        translateX: 0,
        duration: 1400,
        opacity: 1
      });
    }, 300);
    let _this = this;
    $(window).resize(function () {          //当浏览器大小变化时
      if($(window).width() <= 1620) {
        _this.setState({
          isShowAnchor: false
        })
      } else {
        _this.setState({
          isShowAnchor: true
        })
      }
    });

    $(document).scroll(function() {
      let scroH = $(document).scrollTop();  //滚动高度
      let viewH = $(window).height();  //可见高度
      let contentH = $(document).height();  //内容高度
      if(scroH >5500){  //距离顶部大于100px时
        _this.setState({
          isShowAnchor: false
        })
      } else {
        _this.setState({
          isShowAnchor: true
        })
      }

    });
  }
  componentWillUnmount() {
    $(window).resize(function () {});
    $(document).unbind("scroll");
  }

  handleClick = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <div className="banner">
          <div className="mainW">
            <img className="com" src={bg} alt=""/>
            <div className="banner-type">
              <img className="one" src={png1} alt=""/>
              <img className="two" src={png2} alt=""/>
              <img className="three" src={png3} alt=""/>
              <img className="four" src={png4} alt=""/>
            </div>
            <div className="intro">
              <div className="title">
                <h1 style={{transform: "translateX(150px)"}}>欢迎使用 广告中国</h1>
                <h2 style={{transform: "translateX(150px)"}}>广告推送服务，让企业与商户互帮互赢</h2>
                <Anchor style={{display: "none"}} onClick={this.handleClick}>
                  <Link href="#demandBox" title="Basic demo" />
                </Anchor>
                <Button style={{width: 150, height: 40, fontSize: 18, margin: "20px 38px"}} onClick={() => {$(".mainAd-box .ant-anchor-link-title").eq(0)[0].click();}} type="primary">热门广告</Button>
                <Button style={{width: 150, height: 40, fontSize: 18, margin: "20px 0"}} onClick={() => {$(".intro .ant-anchor-link-title").eq(0)[0].click();}} type="primary">热门需求</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mainAd-box">
          <div className="w">
            <Affix style={this.state.isShowAnchor ? {} : {display: "none"}} offsetTop={100}>
              <Anchor style={{width: 200, marginLeft: -210, position: "absolute", transform: "translateY(200px)"}} bounds={100} onClick={this.handleClick}>
                <Link href="#item1" title="热门广告">
                  {
                    this.props.adList.map((item, index) => {
                      return (
                        <Link key={index} href={`#item${index + 1}`} title={item.name} />
                      )
                    })
                  }
                </Link>
                <Link href="#item6" title="查看更多" />
              </Anchor>
            </Affix>

            {this.props.adList.map((item, index) => {
              return (
                <div key={index} id={`item${index + 1}`} className="item">
                  <Parallax
                    animation={{ y: 0, opacity: 1, playScale: [0, 0.4] }}
                    style={{ transform: 'translateY(-100px)', opacity: 0 }}
                    className="code-box-shape"
                  >
                    <Divider>
                      <p className="rank">
                        No.{index + 1}
                      </p>
                    </Divider>
                  </Parallax>
                  <div className="content">
                    <Parallax
                      animation={{ x: 0, opacity: 1, playScale: [0, 0.4] }}
                      style={{ transform: 'translateX(-50px)', opacity: 0 }}
                      className="code-box-shape"
                    >
                      <div className="left">
                        <img onClick = {() => {hashHistory.push(`/detail/1/${item.info_id}`)}} src={`http://images.adchina.club/${item.images[0].image}`} alt=""/>
                      </div>
                    </Parallax>

                    <Parallax
                      animation={{ x: 0, opacity: 1, playScale: [0, 0.4] }}
                      style={{ transform: 'translateX(50px)', opacity: 0 }}
                      className="code-box-shape"
                    >
                      <div className="right">
                        <h1>{item.name}</h1>
                        <p>
                          {item.content}
                        </p>
                        <div onClick = {() => {hashHistory.push(`/detail/1/${item.info_id}`)}} className="turnToDetail">
                          跳转详情页->
                        </div>
                      </div>
                    </Parallax>
                  </div>
                </div>
              )
            })}
            <div className="searchBtn-box">
              <input onClick={() => {hashHistory.push("/serach/1")}} id="searchBtn" type="button" value="点击查看更多精彩广告->"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainAd;