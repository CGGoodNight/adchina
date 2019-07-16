import React from "react";
import {Button, Popconfirm} from "antd";
export const getButtonState = function (status, isBuyPage, _this, order_id, closeBtnClick) {
  let content;
  switch (status) {
    case "等待接受": {
      if(isBuyPage) {
        // 我是买家
        content = (
          <Button onClick={() => {_this.onOrderStateChange(order_id)}} type="primary" disabled>等待对方接受</Button>
        )
      } else {
        // 卖家
        content = (
          <Button onClick={() => {_this.onOrderStateChange(order_id)}} disabled={closeBtnClick ? true : false} type="primary">接受</Button>
        )
      }
      return content;
    }
    case "等待付款": {
      if(isBuyPage) {
        // 我是买家
        content = (
          <Button onClick={() => {_this.onOrderStateChangeTopayData(order_id)}} type="primary">去付款</Button>
        )
      } else {
        // 卖家
        content = (
          <Button onClick={() => {_this.onOrderStateChange(order_id)}} type="primary" disabled>等待对方付款</Button>
        )
      }
      return content;
    }
    case "已付款": {
      if(isBuyPage) {
        // 我是买家
        content = (
          <div>
            <Button onClick={() => {_this.props.downloadBaseImage(order_id)}} type="primary">下载</Button>
            <Button
              onClick={() => {_this.onOrderStateChange(order_id)}}
              disabled={closeBtnClick ? true : false}
              style={{marginLeft: 10}} type="primary">
              邮寄
            </Button>
          </div>
          
        )
      } else {
        // 卖家
        content = (
          <div>
            <Button onClick={() => {_this.props.downloadBaseImage(order_id)}} type="primary">下载</Button>
            <Button onClick={() => {_this.onOrderStateChange(order_id)}} style={{marginLeft: 10}} disabled type="primary">邮寄</Button>
          </div>
        )
      }
      return content;
    }
    case "已邮寄": {
      if(isBuyPage) {
        // 我是买家
        content = (
          <Button onClick={() => {_this.onOrderStateChange(order_id)}} type="primary" disabled>等待对方上传图片</Button>
        )
      } else {
        // 卖家
        content = (
          <Button onClick={() => {_this.sellerUploadImg(order_id)}} type="primary">上传图片</Button>
        )
      }
      return content;
    }
    case "确认图已上传": {
      if(isBuyPage) {
        // 我是买家
        content = (
          <div style={{width: 200}}>
            <Button onClick={() => {_this.props.viewSellerImage(order_id)}} type="primary">查看图片</Button>
            <Button
              style={{marginLeft: 10}}
              onClick={() => {_this.onOrderStateChange(order_id)}}
              disabled={closeBtnClick ? true : false}
              type="primary">
              确认满意
            </Button>
          </div>
        )
      } else {
        // 卖家
        content = (
          <Button onClick={() => {_this.onOrderStateChange(order_id)}} type="primary" disabled>等待对方确认满意</Button>
        )
      }
      return content;
    }
    case "已完成": {
      if(isBuyPage) {
        // 我是买家
        content = (
          <Popconfirm title="您确定使用维权么？" okText="确定" cancelText="取消" onConfirm={() => {_this.onWeiQuanClick(order_id)}}>
            <Button type="primary">已完成，点击维权</Button>
          </Popconfirm>          
        )
      } else {
        // 卖家
        content = (
          <Button type="primary" disabled>已完成</Button>
        )
      }
      return content;
    }
    case "维权中": {
      if(isBuyPage) {
        // 我是买家
        content = (
          <Button type="primary" disabled>已受理</Button>
        )
      } else {
        // 卖家
        content = (
          <Button type="primary" disabled>对方请求维权中</Button>
        )
      }
      return content;
    }
    case "已取消": {
      if(isBuyPage) {
        // 我是买家
        content = (
          <Button type="primary" disabled>订单已取消</Button>
        )
      } else {
        // 卖家
        content = (
          <Button type="primary" disabled>订单已取消</Button>
        )
      }
      return content;
    }
  }
};