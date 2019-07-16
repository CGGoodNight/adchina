import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Button, Modal, Input} from "antd";
import {withdrawAction} from "../../actions/messageActions";

class Withdraw extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      alipayAccount: "",
      alipayName: "",
      apply_sum: 0
    }
  }

  showModal = (account) => {
    this.setState({
      apply_sum: account,
      visible: true,
    });
  };

  handleOk = (e) => {
    this.props.withdrawHandle(this.state.apply_sum, this.state.alipayAccount, this.state.alipayName);
    this.setState({
      visible: false,
      alipayAccount: "",
      alipayName: ""
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
      alipayAccount: "",
      alipayName: ""
    });
  };

  alipayAccountChange = (e) => {
    this.setState({
      alipayAccount: e.target.value
    })
  };

  alipayNameChange = (e) => {
    this.setState({
      alipayName: e.target.value
    })
  };

  render() {
    return (
      <div style={{display: "flex", justifyContent: "center", marginTop: "50px", fontSize: 20, fontWeight: 700}}>
        <Modal
          cancelText="取消"
          okText="确定"
          centered
          title="提现"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{display: "flex", flexDirection: "column", height: "80px", justifyContent: "space-between", alignItems: "center"}}>
            <div>支付宝账号：<Input onChange={this.alipayAccountChange} value = {this.state.alipayAccount} style={{width: 300}} placeholder="输入提现的支付宝账号" /></div>
            <div>支付宝姓名：<Input onChange={this.alipayNameChange} value = {this.state.alipayName} style={{width: 300}} placeholder="输入提现的支付宝姓名" /></div>
          </div>
        </Modal>
        <p>
          当前可提现金额：{this.props.userInfo.account} 元
          <Button onClick={() => {this.showModal(this.props.userInfo.account)}} disabled={parseInt(this.props.userInfo.account) === 0 ? true : false} style={{marginLeft: 20}} type="primary">提现</Button>
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.loginReducers.userInfo
});

const mapDispatchToProps = (dispatch) => ({
  withdrawHandle(apply_sum, account, name) {
    dispatch(withdrawAction(apply_sum, account, name));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Withdraw);