import React from "react";
import {Button, Avatar, Badge, Popover, Icon} from "antd";
import {hashHistory} from "react-router";
import "./style.less";
import logoPic from "../../constants/logo.png";
import getDropMenu from "./getDropMenu";
import QueueAnim from 'rc-queue-anim';

let _props;

const contentMessage = (
  <div className="avatar-pop">
    <p onClick={() => {
      hashHistory.push("/message/2");
      // 等待跳转过后在执行，不然会提示privateLetterClick is undefined
      setTimeout(() => {
        _props.privateLetterClick();
      },100);
    }}><a>我的私信</a></p>
    <p onClick={() => {
      hashHistory.push("/message/1");
      // 等待跳转过后在执行，不然会提示systemInfoClick is undefined
      setTimeout(() => {
        _props.systemInfoClick();
      }, 100)
    }}><a>系统信息</a></p>
  </div>
);

// page 1  主页
// page 2  Message页

const Header = props => {
  let content = getDropMenu(props.page, props);
  _props = props;
  return (
    <QueueAnim>
      <div key="0" className="header">
        <div className="w">
          <div className="header-box">
            <div className="logo">
              <img height="100%" src={logoPic}/>
            </div>
            <ul className="header-box-banner">
              <li><a onClick={() => {
                hashHistory.push("/")
              }} className="underline">首页</a></li>
              {props.page === 1 ?
                <li><a onClick={() => {
                  hashHistory.push("/message/4")
                }} className="underline">我的广告</a></li>
                :
                <li><a onClick={() => {
                  props.adClick();
                  hashHistory.push("/message/4");
                }} className="underline">我的广告</a></li>
              }
              {props.page === 1 ?
                <li><a onClick={() => {
                  hashHistory.push("/message/5")
                }} className="underline">我的需求</a></li>
                : <li><a onClick={() => {
                  props.xqClick();
                  hashHistory.push("/message/5");
                }} className="underline">我的需求</a></li>
              }
            </ul>
            <div className="main-login-reg">
              {props.loginState ? <div>
                <Popover content={contentMessage}>
                  <Badge style={{marginRight: 20}} count={props.userInfo.notification_count}>
                    <Icon style={{fontSize: 26, marginRight: 25}} type="message"/>
                  </Badge>
                </Popover>
                <Popover content={content}>
                  <Avatar size="large" src={`http://${props.userInfo.avatar}`} icon="user"/>
                </Popover>
              </div> : <Button onClick={props.jumpToLogin} type="danger">登录/注册</Button>}
            </div>
          </div>
        </div>
      </div>
    </QueueAnim>
  )
};
export default Header;