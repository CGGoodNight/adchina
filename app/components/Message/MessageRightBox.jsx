import React from 'react';
import "./messagerightbox.less";
import {hashHistory} from "react-router";
import MsgRightBoxContent from  "./MsgRightBoxContent";

const MessageRightBox = props => {
  return(
    <div>
      <div className="message-right-box">
        <div className="item active"><a onClick={() => {props.changeCurrentPage(1);hashHistory.push("/message/1")}} className="underline link-active" >个人中心</a></div>
        <div className="item"><a onClick={() => {props.changeCurrentPage(2);hashHistory.push("/message/2")}} className="underline" >消息列表</a></div>
        <div className="item"><a onClick={() => {props.changeCurrentPage(3);hashHistory.push("/message/3")}} className="underline" >订单列表</a></div>
        <div className="item"><a onClick={() => {props.changeCurrentPage(4);hashHistory.push("/message/4")}} className="underline" >我的广告</a></div>
        <div className="item"><a onClick={() => {props.changeCurrentPage(5);hashHistory.push("/message/5")}} className="underline" >我的需求</a></div>
      </div>
      <MsgRightBoxContent
        currentPage = {props.currentPage}
        pageKey = {props.pageKey}
        ReceivePrivateMessageHandle = {props.ReceivePrivateMessageHandle}
        receivePrivateData = {props.receivePrivateData}
        userInfo = {props.userInfo}
        uploadAvatar = {props.uploadAvatar}
        isUploadAvatar = {props.isUploadAvatar}
      />
    </div>
  )
};
export default MessageRightBox;