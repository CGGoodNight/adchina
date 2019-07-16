import React from "react";
import {hashHistory} from "react-router";
export default function getDropMenu(page,props) {
  let content = "";
  switch (page) {
    case 1: {
      content = (
        <div className="avatar-pop">
          <p onClick={() => {hashHistory.push("/message/1")}} ><a>个人中心</a></p>
          <p onClick={() => {hashHistory.push("/message/4")}}><a>我的广告</a></p>
          <p onClick={() => {hashHistory.push("/message/5")}}><a>我的需求</a></p>
          <p onClick={() => {hashHistory.push("/message/3")}}><a>我的订单</a></p>
          <p onClick={() => {
            props.exitLogin();
          }}><a>退出登录</a></p>
        </div>
      );
      return content;
    }
    case 2: {
      content = (
        <div className="avatar-pop">
          <p onClick={props.personCenterClick}><a>个人中心</a></p>
          <p onClick={props.adClick}><a>我的广告</a></p>
          <p onClick={props.xqClick}><a>我的需求</a></p>
          <p onClick={props.ddClick}><a>我的订单</a></p>
          <p onClick={() => {
            props.exitLogin();
            hashHistory.push("/");
          }}><a>退出登录</a></p>
        </div>
      );
      return content;
    }
  }
}