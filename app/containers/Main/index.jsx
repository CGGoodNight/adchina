import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Header from "../../components/Common/Header";
import MainAd from "../../components/Main/MainAd";
import MainDemand from "../../components/Main/MainDemand";
import AdVideo from "../../components/Main/AdVideo";
import Footer from "../../components/Common/Footer";
import {hashHistory} from "react-router";
import {getMainDataAction} from "../../actions/mainActions";
import {getUserInfoAction, toggleLoginAction, exitLoginAction} from "../../actions/loginActions";
import {Spin} from "antd";
 
class Main extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    // 获取用户数据
    if(localStorage.getItem("token")) {
      this.props.toggleLogin();
      this.props.getUserInfoData();
    }
    // 首页加载完成后获取首页数据
    this.props.getMainData();
  }

  exitLogin() {
    this.props.exitLoginData();
  }

  jumpToLogin() {
    hashHistory.push("/login");
  } 
  jumpToAdDetail(id) {
    // 跳转到广告详情页
    hashHistory.push(`/detail/1/${id}`);
  }
  jumpToDemandDetail(id) {
    // 跳转到需求详情页
    hashHistory.push(`/detail/2/${id}`);
    
  }
  jumpToVideoDetail(id) {
    // 跳转到视频详情页
    hashHistory.push(`/detail/3/${id}`);
  }
  render() {
    if(this.props.adList.length === 0 || this.props.demandList.length === 0) {
      return <div style={{display: "flex", justifyContent: "center", marginTop: 100}}>
        <Spin size="large" />
      </div>
    }
    return (
      <div>
        <Header
          loginState = {this.props.loginState}
          jumpToLogin={this.jumpToLogin}
          userInfo = {this.props.userInfo}
          exitLogin = {this.exitLogin.bind(this)}
          page={1}
        />
        <MainAd adList={this.props.adList} jumpToAdDetail = {this.jumpToAdDetail.bind(this)} />
        <MainDemand demandList={this.props.demandList} jumpToDemandDetail = {this.jumpToDemandDetail.bind(this)} />
        {/*<AdVideo videoList={this.props.videoList} jumpToVideoDetail = {this.jumpToVideoDetail.bind(this)} />*/}
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  adList: state.mainReducers.adList,
  demandList: state.mainReducers.demandList,
  videoList: state.mainReducers.videoList,
  loginState: state.loginReducers.loginState,
  userInfo: state.loginReducers.userInfo
});

const mapDispatchToProps = (dispatch) => ({
  getMainData() {
    dispatch(getMainDataAction());
  },
  getUserInfoData() {
    dispatch(getUserInfoAction());
  },
  toggleLogin() {
    dispatch(toggleLoginAction());
  },
  exitLoginData() {
    dispatch(exitLoginAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);