import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Tag, Modal, Icon, Select, message, Empty} from "antd";
import QueueAnim from 'rc-queue-anim';
import {
  getMyOrderAction,
  changeOrderStateAction,
  downloadBaseImageAction,
  changeOrderStateToPayAction,
  uploadAdImageAction,
  viewSellerImageAction,
  clearOrderDataAction,
  // deleteOrderAction
} from "../../actions/messageActions";
import {hashHistory} from "react-router";
import {getButtonState} from "./getButtonState";
import {getAdDetailAction} from "../../actions/detailActions";
import "./order.less";

const info = (str) => {
  message.info(str, 0.5);
};
const Option = Select.Option;

class Order extends PureComponent {
  constructor(props) {
    super(props);
    this.state={
      // 判断当前是我卖出的  和  我购买的
      isBuyPage: true,
      show: true,
      closeBtnClick: false
    }
  }


  onWeiQuanClick(order_id) {
    this.setState({
      closeBtnClick: true
    });
    this.props.changeOrderState(order_id);
  }

  onOrderStateChange(order_id) {
    if(this.props.userInfo.avatar === "images.adchina.club/") {
      info("亲，需要去个人中心上传收款二维码图片才能继续进行操作哟");
      return;
    }
    this.setState({
      closeBtnClick: true
    });
    this.props.changeOrderState(order_id);
  }

  onOrderStateChangeTopayData(order_id) {
    if(this.props.userInfo.avatar === "images.adchina.club/") {
      info("亲，需要去个人中心上传收款二维码图片才能继续进行操作哟");
      return;
    }
    this.props.onOrderStateChangeTopay(order_id);
  }

  sellerUploadImg(order_id) {
    let _that = this;
    let input = document.getElementById("sellerUpload");
    input.click();
    input.onchange = function() {
      let file = this.files[0];
      let formData = new FormData(input);
      formData.append('file', file);
      _that.props.uploadAdImage(formData, order_id);
    }
  }


  onPageChange(value) {
    if(value === "购买页") {
      this.setState({
        isBuyPage: true,
        show: !this.state.show
      }, () => {
        info("购买页");
        setTimeout(() => {
          this.setState({
            show: !this.state.show
          })
        }, 500);
        this.props.getMyOrderData(this.state.isBuyPage);
      })
    } else {
      this.setState({
        isBuyPage: false,
        show: !this.state.show
      }, () => {
        info("卖出页");
        setTimeout(() => {
          this.setState({
            show: !this.state.show
          })
        }, 500);
        this.props.getMyOrderData(this.state.isBuyPage);
      })
    }
  }
  componentDidMount() {
    this.props.getMyOrderData(this.state.isBuyPage);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.isBuyPage !== this.state.isBuyPage) {
      this.props.clearOrderData();
    }
  }

  componentWillUnmount() {
    this.props.clearOrderData();
  }

  showModal = (id) => {
    this.props.getAdDetail(id);
    this.setState({
      visible: true,
    });
  };

  handleOk(id) {
    hashHistory.push(`/detail/1/${id}`);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div className="order-box">
        <input style={{display: "none"}} type="file" id="sellerUpload"/>
        <Modal
          title="广告详情"
          visible={this.state.visible}
          onOk={() => {this.handleOk(this.props.adDetail.info_id)}}
          okText="跳转到详情页"
          cancelText="返回"
          onCancel={this.handleCancel}
        >
          <strong><span>名称：</span></strong><p>{this.props.adDetail.name}</p>
          <strong><span>id：</span></strong><p>{this.props.adDetail.info_id}</p>
          <strong><span>类型：</span></strong><p>{this.props.adDetail.type}</p>
          <strong><span>地址：</span></strong><p>{this.props.adDetail.address}</p>
          <strong><span>联系方式：</span></strong><p>{this.props.adDetail.tel}</p>
          <strong><span>大小：</span></strong><p>{this.props.adDetail.maxArea}</p>
          <strong><span>营业时间：</span></strong><p>{this.props.adDetail.exposureDay} 天/周 {this.props.adDetail.exposureHour} 时/天</p>
          <strong><span>人流量：</span></strong><p>{this.props.adDetail.traffic}</p>
          <strong><span>价格：</span></strong><p>￥{this.props.adDetail.price}</p>
          <strong><span>详情：</span></strong><p>{this.props.adDetail.content}</p>
        </Modal>
        <div>
          <span>订单流程：</span>
          <Tag color="#2db7f5">等待接受</Tag>
          <Icon style={{marginRight: 10}} type="swap-right" />
          <Tag color="#2db7f5">等待付款</Tag>
          <Icon style={{marginRight: 10}} type="swap-right" />
          <Tag color="#2db7f5">已付款</Tag>
          <Icon style={{marginRight: 10}} type="swap-right" />
          <Tag color="#2db7f5">已邮寄</Tag>
          <Icon style={{marginRight: 10}} type="swap-right" />
          <Tag color="#2db7f5">确认图已上传</Tag>
          <Icon style={{marginRight: 10}} type="swap-right" />
          <Tag color="#2db7f5">已完成</Tag>
          <span style={{marginLeft: 20}}>特殊流程：</span>
          <Tag color="#2db7f5">维权中</Tag>
          <Tag color="#2db7f5">已取消</Tag>
          <Select defaultValue="购买页" style={{ width: 130, marginTop: 30 }} onChange={this.onPageChange.bind(this)}>
            <Option value="购买页">购买页</Option>
            <Option value="卖出页">卖出页</Option>
          </Select>
        </div>
        {this.props.myOrder.length === 0 ? 
          <QueueAnim
            type="bottom"
          >
            <Empty description="暂无数据" style={{margin: "100px 0 0 -150px"}} key="0" />
          </QueueAnim>
          : 
          ""
         }
        <QueueAnim>
          {this.state.show ?
            this.props.myOrder.map((item, index) => {
              // 解决广告位被删除后 导致订单显示有些为空
              if(item.name===null && item.price === null) {
                return ""
              }
              return (
                <table key={index}>
                  <tbody>
                  <tr>
                    <th className="v-big-td"><span className="first">
                    <span className="iconfont icon-shijian order-icon">
                    </span>
                      {item.create_time.substring(0, 10)}
                  </span>
                      <span>
                    <span className="iconfont icon-dingdanhao order-icon">
                    </span>
                        {item.order_id}
                  </span>
                    </th>
                    <th className="big-td"><span className="first">
                    <span className="iconfont icon-zhifumaijia order-icon">
                    </span>
                      {item.buyer}
                  </span>
                      <span>
                    <span className="iconfont icon-maijia order-icon">
                    </span>
                        {item.seller}
                  </span>
                    </th>
                    <th className="small-td">
                <span className="first">
                  <span className="iconfont icon-lianxiwomen order-icon">
                  </span>
                  订单状态
                </span>
                    </th>
                    <th className="small-td">
                    <span className="first">
                      <span className="iconfont icon-caozuo order-icon">
                      </span>
                      更多操作
                      {/*<span onClick={() => {this.props.deleteOrderHandle(item.order_id)}} className="deleteOrderIcon">del</span>*/}
                    </span>
                    </th>
                  </tr>
                  <tr>
                    <td className="v-big-td">
                      <p>名称：{item.name}</p>
                      <p>id：{item.sellerinfo_id}</p>
                      <p>地址：{item.sellerinfo_address}</p>
                      <a onClick={() => {this.showModal(item.sellerinfo_id)}}>
                        <span>查看更多</span>
                      </a>
                    </td>
                    <td className="big-td">￥{item.price}</td>
                    <td className="small-td">
                      {/*{*/}
                      {/*getOrderState(item.orderCode)*/}
                      {/*}*/}
                      {item.order_status}
                    </td>
                    <td className="small-td">
                      {getButtonState(item.order_status, this.state.isBuyPage, this, item.order_id, this.state.closeBtnClick)}
                    </td>
                  </tr>
                  </tbody>
                </table>
              )
            })
            :
            null
          }

        </QueueAnim>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  mailAddress: state.loginReducers.mailAddress,
  myOrder: state.messageReducers.myOrder,
  adDetail: state.detailReducers.adDetail,
  userInfo: state.loginReducers.userInfo
});

const mapDispatchToProps = (dispatch) => ({
  getMyOrderData(isBuyPage) {
    dispatch(getMyOrderAction(isBuyPage));
  },
  getAdDetail(id) {
    dispatch(getAdDetailAction(id));
  },
  changeOrderState(order_id) {
    dispatch(changeOrderStateAction(order_id));
  },
  onOrderStateChangeTopay(order_id) {
    dispatch(changeOrderStateToPayAction(order_id));
  },
  downloadBaseImage(order_id) {
    dispatch(downloadBaseImageAction(order_id));
  },
  uploadAdImage(formData, order_id) {
    dispatch(uploadAdImageAction(formData, true, order_id));
  },
  viewSellerImage(order_id) {
    dispatch(viewSellerImageAction(order_id));
  },
  // deleteOrderHandle(order_id) {
  //   dispatch(deleteOrderAction(order_id));
  // },
  clearOrderData() {
    dispatch(clearOrderDataAction());
  }
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Order);