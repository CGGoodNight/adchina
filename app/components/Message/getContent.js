import React from "react";
import ReceivePrivateMessage from "./ReceivePrivateMessage";
import SendPrivateMessage from "./SendprivateMessage";
import AddDemand from "./AddDemand";
import MyDemand from "./MyDemand";
import Order from "./Order";
import SelfInfo from "./SelfInfo";
import Withdraw from "./Withdraw";
import SystemInfo from "./SystemInfo";
import { Avatar, Button, Empty, Spin } from 'antd';
import QueueAnim from 'rc-queue-anim';
export default function getContent(currentPage, pageKey, props) {
  let content;
  switch (currentPage) {
    // 个人中心
    case 1: {
      switch (pageKey) {
        // 个人中心 我的头像
        case 1: {
          content = (
            <div className="modify-avatar">
            <Spin tip="正在上传头像..." spinning = { props.isUploadAvatar ? true : false } size = {"large"}>
              <QueueAnim>
                <Avatar key="num1" onClick={props.uploadAvatar} style={{cursor: "pointer"}} size={108} src={`http://${props.userInfo.avatar}`} icon="user" />
                <Button key="num2" style={{marginTop: 40, fontSize: 16, height: 40}} onClick={props.uploadAvatar} type="primary">点击修改头像</Button>
              </QueueAnim>
            </Spin>
            </div>
          );
          return content;
        }
        // 个人中心 账号信息
        case 2: {
          return <SelfInfo />;
        }
        // 账户信息 提现
        case 3: {
          return <Withdraw />;
        }
        // 系统信息 系统信息
        case 4: {
          return <SystemInfo />;
        }
      }
    }
    // 消息列表
    case 2: {
      switch (pageKey) {
        // 我的私信 我收到的私信
        case 1: {
          // 获取 用户收到的私信信息
          return <ReceivePrivateMessage parentProps = {props} />;
        }
        // 我的私信 我发送的私信
        case 2: {
          return <SendPrivateMessage />;
        }
        // 系统信息 系统信息
        case 3: {
          return <SystemInfo />;
        }
      }
    }
    // 我的订单
    case 3: {
      switch (pageKey) {
        // 我的订单 查看订单
        case 1: {
          return <Order />;
        }
        // 系统信息 系统信息
        case 2: {
          return <SystemInfo />;
        }
      }
    }
    // 我的广告
    case 4: {
      switch (pageKey) {
        // 广告管理 添加广告位
        case 1: {
          return <AddDemand isAddAdPage={true} isModifyPage={false} />;
        }
        // 广告管理 我的广告位
        case 2: {
          return <MyDemand isAddAdPage={true} isModifyPage={false} />;
        }
        // 系统信息 系统信息
        case 3: {
          return <SystemInfo />;
        }
      }
    }
    // 需求管理
    case 5: {
      switch (pageKey) {
        // 需求管理 添加需求
        case 1: {

          return <AddDemand isAddAdPage={false} isModifyPage={false} />;
        }
        // 需求管理 我的需求
        case 2: {
          return <MyDemand isAddAdPage={false} isModifyPage={false} />;
        }
        // 系统信息 系统信息
        case 3: {
          return <SystemInfo />;
        }
      }
    }
  }
}