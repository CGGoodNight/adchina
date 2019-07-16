import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {message, Modal, Input, Button, Spin, Icon} from "antd";
import {hashHistory} from "react-router";
import Header from "../../components/Common/Header";
import DetailContent from "../../components/Detail/DetailContent";
import {getAdDetailAction, getDemandDetailAction, getVideoDetailAction, submitPrivateLetter, clearDetailAction, uploadAdImageAction} from "../../actions/detailActions";
import {getUserInfoAction, toggleLoginAction} from "../../actions/loginActions";
import {openSpinningAction} from "../../actions/mainActions";
import Footer from "../../components/Common/Footer";
import anime from '../../../node_modules/animejs/lib/anime.es.js';

const { TextArea } = Input;

const warning = (str) => {
  message.warning(str, 2);
};

const antIcon = <Icon type="loading" style={{ marginLeft: 12,fontSize: 24 }} spin />;



class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // 1.广告详情页 2.需求详情页 3.视频详情页
      page: 1,
      // 私信Modal的显示和提交
      letterVisible: false,
      sendLetterContent: "",
      confirmLoading: false,
      visible: false,
      isUploadImg: false
    }

  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  uploadAdImage(id) {

    // 判断一下当前用户是否上传了二维码
    // images.adchina.club/
    if(this.props.userInfo.qrcode === "images.adchina.club/") {
      warning("请在个人中心上传收款二维码才能进行操作哟~");
      return false;
    }

    let _that = this;
    let wantBtnInput = document.getElementById("wantBtnInput");
    wantBtnInput.click();
    wantBtnInput.onchange = function() {
      let file = this.files[0];

      // 检查上传的图片是否符合格式
      if(file.type.indexOf("jpeg") > -1 || file.type.indexOf("jpg") > -1 || file.type.indexOf("png") > -1) {
        if(file.name.indexOf("JPEG") > -1 || file.name.indexOf("JPG") > -1 || file.name.indexOf("PNG") > -1) {
          warning("上传的图片格式后缀名小写哟~");
          return false;
        }
        let formData = new FormData(wantBtnInput);
        formData.append('file', file);
        _that.props.uploadAdImage(id, formData);
        _that.setState({
          isUploadImg: true
        })
      } else {
        warning("上传的图片格式必须是jpg，jpeg，png其中的一种哟~");
        return false;
      }

    }
  }

  wantBtnOnClick() {
    this.showModal();
  }

  showLetterModal() {
    this.setState({
      letterVisible: true
    })
  }

  letterOkModal(user_id) {
    this.props.sendPrivateLetter(user_id, this.state.sendLetterContent);
    this.setState({
      letterVisible: false
    });
  }

  hiddenLetterModal() {
    this.setState({
      letterVisible: false,
    })
  }

  componentWillUnmount() {
    this.props.clearDetail();
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
    if(!this.props.spinState) {
      this.setState({
        isUploadImg: false,
        visible: false
      });
      this.props.openSpinning();
    }
  }

  componentDidMount() {
    if(!localStorage.getItem("token")) {
      warning("请先登录后在进行操作哟~");
      hashHistory.push("/");
      return;
    } else {
      this.props.toggleLogin();
      this.props.getUserInfoData();
    }
    // 根据路由传递过来的id获取数据
    if(this.props.params.page === "1") {
      // 广告详情页
      this.props.getAdDetail(this.props.params.id);
    } else if(this.props.params.page === "2") {
      // 需求详情页
      this.props.getDemandDetail(this.props.params.id);
    } else if(this.props.params.page === "3") {
      // 视频详情页
      this.props.getVideoDetail(this.props.params.id);
    }
    this.setState({
      page: parseInt(this.props.params.page),
      id: parseInt(this.props.params.id)
    });
  }

  sendContentChange = (e) => {
    this.setState({
      sendLetterContent: e.target.value
    })
  };
  render() {
    if(this.state.page === 1) {
      if(this.props.adDetail.length === 0) {
        return <div></div>
      }
    }
    if(this.state.page === 2) {
      if(this.props.demandDetail.length === 0) {
        return <div></div>
      }
    }
    return (
      <div>
        <Modal
          title="上传广告底图"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Button onClick={() => {this.uploadAdImage(this.props.adDetail.info_id)}} type="primary">上传底图</Button>
          <Spin indicator={antIcon} spinning={this.state.isUploadImg} />
         
        </Modal>
        <Modal
          title="发送私信"
          centered={true}
          visible={this.state.letterVisible}
          onOk={() => {this.letterOkModal(this.props.adDetail.user_id)}}
          onCancel={this.hiddenLetterModal.bind(this)}
        >
          <p>发送给：{this.state.page === 1 ? this.props.adDetail.user_name : this.props.demandDetail.user_name}</p>
          <TextArea
            rows={4}
            onChange={this.sendContentChange}
            value={this.state.sendLetterContent}
            autoFocus={true} />
        </Modal>
        <Header
          loginState = {this.props.loginState}
          userInfo = {this.props.userInfo}
          page={1}
        />
        {
          this.state.page === 1 ?
            <DetailContent
              page = {this.state.page}
              adDetail = {this.props.adDetail}
              showLetterModal = {this.showLetterModal.bind(this)}
              hiddenLetterModal = {this.hiddenLetterModal.bind(this)}
              letterOkModal = {this.letterOkModal.bind(this)}
              wantBtnOnClick={this.wantBtnOnClick.bind(this)}
            />
            :
            <DetailContent
              page = {this.state.page}
              demandDetail = {this.props.demandDetail}
              showLetterModal = {this.showLetterModal.bind(this)}
              hiddenLetterModal = {this.hiddenLetterModal.bind(this)}
              letterOkModal = {this.letterOkModal.bind(this)}
              wantBtnOnClick={this.wantBtnOnClick.bind(this)}
            />
        }
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loginState: state.loginReducers.loginState,
  userInfo: state.loginReducers.userInfo,
  adDetail: state.detailReducers.adDetail,
  demandDetail: state.detailReducers.demandDetail,
  spinState: state.mainReducers.spinState
});

const mapDispatchToProps = (dispatch) => ({
  getAdDetail(id) {
    dispatch(getAdDetailAction(id));
  },
  getDemandDetail(id) {
    dispatch(getDemandDetailAction(id));
  },
  getVideoDetail(id) {
    dispatch(getVideoDetailAction(id));
  },
  sendPrivateLetter(to, content) {
    dispatch(submitPrivateLetter(to, content));
  },
  clearDetail() {
    dispatch(clearDetailAction());
  },
  getUserInfoData() {
    dispatch(getUserInfoAction());
  },
  toggleLogin() {
    dispatch(toggleLoginAction());
  },
  uploadAdImage(id, formData) {
    dispatch(uploadAdImageAction(id, formData))
  },
  openSpinning() {
    dispatch(openSpinningAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);