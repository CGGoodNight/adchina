import React from "react";
import {Button} from "antd";

function isEmptyObject(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}

const RegisterPage = props => {

  return(
    <div>
      <div className="login-box">
        <div className="login-content">
          <div className="login-logo">
            <img src={require("../../../static/image/png/loginlogo.png")} alt=""/>
          </div>
          <h1>注册</h1>
          <div className="login-input-box">
            <div className="user-input">
              <h2>邮箱</h2>
              <input
                autoFocus={true}
                onKeyDown={(e) => {props.enterClickHandleToReg(e)}}
                onChange={(e) => {props.changeRegMailAdd(e.target.value)}}
                value={props.regMailAdd}
                placeholder="请输入邮箱地址"
                type="text"
              />
              <span className="iconfont icon-youxiang"></span>
            </div>
            <div className="user-input">
              <h2>用户名</h2>
              <input
                onKeyDown={(e) => {props.enterClickHandleToReg(e)}}
                onChange={(e) => {props.changeRegUser(e.target.value)}}
                value={props.regUser}
                placeholder="请输入用户名"
                type="text"
              />
              <span className="iconfont icon-yonghu"></span>
            </div>
            <div className="pwd-input">
              <h2>密码</h2>
              <input
                onKeyDown={(e) => {props.enterClickHandleToReg(e)}}
                onChange={(e) => {props.changeRegPwd(e.target.value)}}
                value={props.regPwd}
                placeholder="请输入密码"
                type="password"
              />
              <span className="iconfont icon-mima"></span>
            </div>
            <div className="pwd-input">
              <input
                onKeyDown={(e) => {props.enterClickHandleToReg(e)}}
                onChange={(e) => {props.changeRegPwd2(e.target.value)}}
                value={props.regPwd2}
                placeholder="确认密码"
                type="password"
              />
              <span className="iconfont icon-mima"></span>
            </div>
            <div className="user-input">
              <h2>验证码</h2>
              <input
                onKeyDown={(e) => {props.enterClickHandleToReg(e)}}
                onChange={(e) => {props.changeYzm(e.target.value)}}
                value={props.yzm}
                placeholder="输入验证码"
                type="text"
              />
              <span className="iconfont icon-lianxi"></span>
              <div onClick={props.getyzm} className="reg-yzm">
                {isEmptyObject(props.yzmInfo) ?
                  <p>点击获取验证码</p>
                    :
                  <img src={props.yzmInfo.captcha_image_content} alt="" />
                }

              </div>
            </div>
          </div>
          <div className="login-btn">
            <Button
              onClick={() => {props.registerBtnClickHandle(props.regMailAdd, props.regUser, props.regPwd, props.regPwd2, props.yzm, props.yzmInfo.captcha_key)}}
              style={{ width: 340, height: 50}}
              type="primary"
              loading = {props.isRegistering ? true : false}
            >
              注册
            </Button>
          </div>
          <span style={{paddingBottom: 40}}>
            <a onClick={props.jumpToLogin}>
              已有账号？ 前往登录
            </a>
          </span>
        </div>
      </div>
    </div>
  )
};
export default RegisterPage;