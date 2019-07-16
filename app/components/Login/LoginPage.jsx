import React from "react";
import "./loginpage.less";
import {Button} from "antd";
const LoginPage = props => {
  return(
    <div>
      <div className="login-box">
        <div className="login-content">
          <div className="login-logo">
            <img src={require("../../../static/image/png/loginlogo.png")} alt=""/>
          </div>
          <h1>登录</h1>
          <div className="login-input-box">
            <div className="user-input">
              <h2>账号</h2>
              <input
                autoFocus={true}
                onKeyDown={(e) => {props.enterClickHandle(e)}}
                onChange={(e) => {props.changeLoginUser(e.target.value)}}
                value={props.loginUser}
                placeholder="请输入用户名或邮箱地址"
                type="text"
              />
              <span className="iconfont icon-yonghu"></span>
            </div>
            <div className="pwd-input">
              <h2>密码</h2>
              <input
                onKeyDown={(e) => {props.enterClickHandle(e)}}
                onChange={(e) => {props.changeLoginPwd(e.target.value)}}
                value={props.loginPwd}
                placeholder="请输入密码"
                type="password"
              />
              <span className="iconfont icon-mima"></span>
            </div>
            <span className="forget-pwd"><a href="#">忘记密码？</a></span>
          </div>
          <div className="login-btn">
            <Button
              loading={props.isLogining ? true : false}
              onClick={() => {props.loginBtnClickHandle(props.loginUser, props.loginPwd)}}
              style={{ width: 340, height: 50}}
              type="primary"
            >
              登录
            </Button>
          </div>
          <span style={{paddingBottom: 80}}>
            <a onClick={props.jumpToRegister}>
              没有账号？ 前往注册
            </a>
          </span>
        </div>
      </div>
    </div>
  )
};
export default LoginPage;