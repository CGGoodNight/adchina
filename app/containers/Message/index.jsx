import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Header from "../../components/Common/Header";
import Footer from "../../components/Common/Footer";
import MessageLeftBox from "../../components/Message/MessageLeftBox";
import MessageRightBox from "../../components/Message/MessageRightBox";
import {getReceivePrivateMessageAction, uploadAvatarAction} from "../../actions/messageActions";
import {exitLoginAction} from "../../actions/loginActions";
import {BackTop, message} from "antd";
import {hashHistory} from "react-router";
import {getUserInfoAction, toggleLoginAction} from "../../actions/loginActions";
import {openSpinningAction} from "../../actions/mainActions";
import $ from "jquery";

const warning = (str) => {
  message.warning(str, 1);
};

class Message extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // 1：个人中心 2：消息列表 3：订单列表 4：我的广告 5：我的需求
      currentPage: 1,
      pageKey: 1,
      newAvatarUrl: "",
      isUploadAvatar: false
    }
  }
  exitLogin() {
    this.props.exitLoginData();
  }

  componentDidUpdate() {
    if(!this.props.spinState) {
      this.setState({
        isUploadAvatar: false
      })
      this.props.openSpinning();
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if(!localStorage.getItem("token")) {
      warning("请先登录后在进行操作哟~");
      hashHistory.push("/");
    } else {
      this.props.toggleLogin();
      this.props.getUserInfoData();
    }

    if(this.props.params.currentPage) {
      this.changeCurrentPage(this.props.params.currentPage);
      if(this.props.params.currentPage == 2) {
        this.setState({
          currentPage: 2,
          pageKey: 1
        })
      }
      if(this.props.params.currentPage == 1) {
        this.setState({
          currentPage: 1,
          pageKey: 1
        })
      }
      if(this.props.params.currentPage == 5) {
        this.setState({
          currentPage: 5,
          pageKey: 1
        })
      }
      if(this.props.params.currentPage == 4) {
        this.setState({
          currentPage: 4,
          pageKey: 1
        })
      }
      if(this.props.params.currentPage == 3) {
        this.setState({
          currentPage: 3,
          pageKey: 1
        })
      }
    }
  }

  changeCurrentPage(page) {
    // 改变classname来实现目前在那个位置下
    let aItems = $('.message-right-box .underline');
    aItems.removeClass("link-active");
    aItems[page - 1].className = "underline link-active";

    let divItems = $(".message-right-box div");
    divItems.removeClass("active");
    divItems[page - 1].className = "item active";

    this.setState({
      currentPage: page,
      pageKey: 1
    });
  }
  getLeftBoxClick(key) {
    this.setState({
      pageKey: parseInt(key.key)
    })
  }

  ReceivePrivateMessageHandle() {
    this.props.getReceivePrivateMessage()
  }

  systemInfoClick() {
    this.setState({
      currentPage: 1,
      pageKey: 4
    })
  }

  privateLetterClick() {
    this.changeCurrentPage(2);
  }
  adClick() {
    this.changeCurrentPage(4);
  }
  xqClick() {
    this.changeCurrentPage(5);
  }
  personCenterClick() {
    this.changeCurrentPage(1);
  }
  // 点击订单
  ddClick() {
    this.changeCurrentPage(3);
  }

  uploadAvatar() {
    let _that = this;
    this.refs.uploadAvatar.click();
    this.refs.uploadAvatar.onchange = function() {
      let file = this.files[0];

      // 检查上传的图片是否符合格式
      if(file.type.indexOf("jpeg") > -1 || file.type.indexOf("jpg") > -1 || file.type.indexOf("png") > -1) {
        if(file.name.indexOf("JPEG") > -1 || file.name.indexOf("JPG") > -1 || file.name.indexOf("PNG") > -1) {
          warning("上传的图片格式后缀名小写哟~");
          return false;
        }
        let formData = new FormData(document.getElementById("file"));
        formData.append('file', file);
        _that.setState({
          isUploadAvatar: true
        })
        _that.props.uploadAvatarData(formData);
      } else {
        warning("上传的图片格式必须是jpg，jpeg，png其中的一种哟~");
        return false;
      }
    }
  }

  render() {
    return (
      <div>
        <input style={{display: "none"}} id="file" name="file" ref="uploadAvatar" type="file"/>
        <BackTop />
        <Header
          loginState={this.props.loginState}
          userInfo = {this.props.userInfo}
          page = {2}
          adClick = {this.adClick.bind(this)}
          xqClick = {this.xqClick.bind(this)}
          personCenterClick = {this.personCenterClick.bind(this)}
          ddClick = {this.ddClick.bind(this)}
          exitLogin = {this.exitLogin.bind(this)}
          privateLetterClick = {this.privateLetterClick.bind(this)}
          systemInfoClick = {this.systemInfoClick.bind(this)}

        />
        <div>
          <div className="w">
            <div className="message-content-box">
              <MessageLeftBox getLeftBoxClick = {this.getLeftBoxClick.bind(this)}
                              currentPage = {this.state.currentPage}
                              pageKey = {this.state.pageKey}
              />
              <MessageRightBox
                changeCurrentPage={this.changeCurrentPage.bind(this)}
                currentPage = {this.state.currentPage}
                pageKey = {this.state.pageKey}
                ReceivePrivateMessageHandle = {this.ReceivePrivateMessageHandle.bind(this)}
                receivePrivateData = {this.props.receivePrivateData}
                userInfo = {this.props.userInfo}
                uploadAvatar = {this.uploadAvatar.bind(this)}
                isUploadAvatar = {this.state.isUploadAvatar}
              />
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loginState: state.loginReducers.loginState,
  receivePrivateData: state.messageReducers.receivePrivateData,
  userInfo: state.loginReducers.userInfo,
  newAvatarUrl: state.messageReducers.newAvatarUrl,
  spinState: state.mainReducers.spinState
});

const mapDispatchToProps = (dispatch) => ({
  getReceivePrivateMessage() {
    dispatch(getReceivePrivateMessageAction());
  },
  exitLoginData() {
    dispatch(exitLoginAction());
  },
  uploadAvatarData(formData) {
    dispatch(uploadAvatarAction(formData));
  },
  getUserInfoData() {
    dispatch(getUserInfoAction());
  },
  toggleLogin() {
    dispatch(toggleLoginAction());
  },
  openSpinning() {
    dispatch(openSpinningAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Message);