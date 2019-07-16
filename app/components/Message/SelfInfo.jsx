import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Tooltip, Modal, Divider, Input, Avatar, Spin,message} from "antd";
import QueueAnim from 'rc-queue-anim';
import {getSelfInfoAction, submitModifyAction, uploadQRAction, clearRemindAction} from "../../actions/messageActions";
import {openSpinningAction} from "../../actions/mainActions";
import "./selfinfo.less";

const Search = Input.Search;
const warning = (str) => {
  message.warning(str, 1);
};

class SelfInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modalTitle: "修改用户名",
      // 1. 修改用户名 2 修改密码  3 修改地址
      modalState: 1,
      name: "",
      password: "",
      address: "",
      getSelfInfoToState: false,
      qrcode: "",
      isqrUpload: false
    }
  }

  handleOk = () => {
    this.props.submitModify(this.state.name, this.state.address, this.state.qrcode);
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  usernameChange(e) {
    this.setState({
      name: e.target.value
    })
  }
  passwordChange(e) {
    this.setState({
      password: e.target.value
    })
  }
  addressChange(e) {
    this.setState({
      address: e.target.value
    })
  }

  componentDidMount() {
    this.props.clearRemind();
    this.props.getSelfInfo();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!this.state.getSelfInfoToState) {
      this.setState({
        name: this.props.selfInfo.name,
        address: this.props.selfInfo.address,
        getSelfInfoToState: true,
        qrcode: this.props.selfInfo.qrcode
      })
    }

    // 这是上传二维码
    if(!this.props.spinState) {
      this.setState({
        isqrUpload: false,
      })
      this.props.openSpinning();
    }
  }

  onModifyUsernameClick() {
    this.setState({
      visible: true,
      modalTitle: "修改用户名",
      // 1. 修改用户名 2 修改密码  3 修改地址
      modalState: 1
    })
  }
  onModifyPasswordClick() {
    this.setState({
      visible: true,
      modalTitle: "修改密码",
      // 1. 修改用户名 2 修改密码  3 修改地址
      modalState: 2
    })
  }
  onModifyShippingAddressClick() {
    this.setState({
      visible: true,
      modalTitle: "修改地址",
      // 1. 修改用户名 2 修改密码  3 修改地址
      modalState: 3
    })
  }

  uploadQRcode() {
    
    let _that = this;
    this.refs.inputQR.click();
    this.refs.inputQR.onchange = function() {
      let file = this.files[0];

      // 检查上传的图片是否符合格式
      if(file.type.indexOf("jpeg") > -1 || file.type.indexOf("jpg") > -1 || file.type.indexOf("png") > -1) {
        if(file.name.indexOf("JPEG") > -1 || file.name.indexOf("JPG") > -1 || file.name.indexOf("PNG") > -1) {
          warning("上传的图片格式后缀名小写哟~");
          return false;
        }
        let formData = new FormData(document.getElementById("inputQR"));
        formData.append('file', file);
        _that.props.uploadQR(_that.state.name, _that.state.address,formData);
        _that.setState({
          isqrUpload: true
        })
      } else {
        warning("上传的图片格式必须是jpg，jpeg，png其中的一种哟~");
        return false;
      }

    }
  }

  render() {
    if (this.props.selfInfo.length === 0) {
      return <div className="self-box">
        <div className="self-box-loading">
          <Spin />
        </div>
      </div>
    }
    const selfInfo = this.props.selfInfo;
    return (
      <div className="self-box">
        <Modal
          centered
          okText="保存"
          cancelText="取消"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Divider>{this.state.modalTitle}</Divider>
          {this.state.modalState === 1 ?
            <Search
              style={{padding: 30}}
              placeholder="修改用户名"
              enterButton="检查"
              value={this.state.name}
              onChange={(e) => {this.usernameChange(e)}}
            />
              :
            this.state.modalState === 2 ?
              <Input.Password
                style={{width: "80%", marginLeft: "10%", padding: "30px 0"}}
                placeholder="不能超过16位"
                value={this.state.password}
                onChange={(e) => {this.passwordChange(e)}}
              />
              :
              <Input
                style={{width: "80%", margin: "30px 10%"}}
                placeholder="修改地址"
                value={this.state.address}
                onChange={(e) => {this.addressChange(e)}}
              />

          }
        </Modal>
        <div className="my-demand-content-box">
          <QueueAnim>
          <div key="key1" className="item">
            <p>用户名：</p>
            <p>
              <strong>{selfInfo.name}
                <Tooltip placement="top" title="点击修改用户名">
                  <span onClick={this.onModifyUsernameClick.bind(this)} className="iconfont icon-bianji"></span>
                </Tooltip>
              </strong>
            </p>
          </div>
          {/*<div className="item">*/}
            {/*<p>邮 箱：</p>*/}
            {/*<p><strong>{selfInfo.address}</strong></p>*/}
          {/*</div>*/}
          <div key="key2" className="item">
            <p>密 码：</p>
            <p>
              <strong>********
                <Tooltip placement="top" title="点击修改密码">
                  <span onClick={this.onModifyPasswordClick.bind(this)} className="iconfont icon-bianji"></span>
                </Tooltip>
              </strong>
            </p>
          </div>
          <div key="key3" className="item">
            <p>信用值：</p>
            <p><strong>{selfInfo.credit}</strong></p>
          </div>
          <div key="key4" className="item">
            <p>地 址：</p>
            <p>
              <strong>
                {selfInfo.address}
                <Tooltip placement="top" title="点击修改地址">
                  <span  onClick={this.onModifyShippingAddressClick.bind(this)} className="iconfont icon-bianji"></span>
                </Tooltip>
              </strong>
            </p>
          </div>

          <div key="key5" className="item">
            <p>账户余额：</p>
            <p><strong>{selfInfo.account} 元</strong></p>
          </div>

          <div key="key6" className="item">
            <p>头像：</p>
            <p><Avatar src={`http://${selfInfo.avatar}`} icon="user" /></p>
          </div>

          <div key="key7" className="item">
            <input type="file" ref="inputQR" id="inputQR" style={{display: "none"}}/>
            <p>收款二维码：
              <Tooltip placement="top" title="点击修改收款二维码">
                <span onClick={() => {this.uploadQRcode()}} className="iconfont icon-bianji"></span>
              </Tooltip>
            </p>
          </div>
          <div key="key8" className="item">
            
            <Spin spinning={this.state.isqrUpload} tip="上传二维码中...">
              <img style={{width: 200}} src={`http://${selfInfo.qrcode}`} alt="404 image not found"/>
            </Spin>
          </div>
          </QueueAnim>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selfInfo: state.messageReducers.selfInfo,
  spinState: state.mainReducers.spinState
});

const mapDispatchToProps = (dispatch) => ({
  getSelfInfo() {
    dispatch(getSelfInfoAction());
  },
  submitModify(name, address, qrcode) {
    dispatch(submitModifyAction(name, address, qrcode));
  },
  uploadQR(name, address, formData) {
    dispatch(uploadQRAction(name,address,formData));
  },
  clearRemind() {
    dispatch(clearRemindAction());
  },
  openSpinning() {
    dispatch(openSpinningAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelfInfo);