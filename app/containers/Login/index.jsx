import React, {PureComponent} from 'react';
import {message} from "antd";
import {connect} from 'react-redux';
import LoginPage from "../../components/Login/LoginPage";
import RegisterPage from "../../components/Login/RegisterPage";
import {hashHistory} from "react-router";
import {submitToLoginAction, submitToRegisterAction, getyzmAction, loginFailed, regFailed, regSuccess} from "../../actions/loginActions";

const success = (str) => {
  message.success(str);
};

const error = (str) => {
  message.error(str);
};

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      //1代表登录页  2代表注册页
      currentPage: 1,
      loginUser: "",
      loginPwd: "",
      regMailAdd: "",
      regUser: "",
      regPwd: "",
      regPwd2: "",
      isRegistering: false,
      isLogining: false,
      yzm: ""
    }
  }
  changeLoginUser(data) {
    this.setState({
      loginUser: data
    })
  }
  changeLoginPwd(data) {
    this.setState({
      loginPwd: data
    })
  }
  changeRegMailAdd(data) {
    this.setState({
      regMailAdd: data
    })
  }
  changeRegUser(data) {
    this.setState({
      regUser: data
    })
  }
  changeRegPwd(data) {
    this.setState({
      regPwd: data
    })
  }
  changeRegPwd2(data) {
    this.setState({
      regPwd2: data
    })
  }
  changeYzm(data) {
    this.setState({
      yzm: data
    })
  }
  jumpToRegister() {
    this.setState({
      currentPage: 2
    })
  }

  jumpToLogin() {
    this.setState({
      currentPage: 1
    })
  }
  enterClickHandleToReg(e) {
    if(e.keyCode === 13) {
      this.registerBtnClickHandle(this.state.regMailAdd, this.state.regUser, this.state.regPwd)
    }
  }
  loginBtnClickHandle(user, pwd) {
    // 检查用户输入的是否符合规范
    if(user === "") {
      error("请输入账号");
    } else if (pwd === "") {
      error("请输入密码");
    } else {
      this.props.submitToLogin(user, pwd);
      this.setState({
        isLogining: true
      })
    }
  }
  enterClickHandle(e) {
    if(e.keyCode === 13) {
      this.loginBtnClickHandle(this.state.loginUser, this.state.loginPwd);
    }
  }
  registerBtnClickHandle(mailAddress, user, pwd, pwd2, yzm, captcha_key) {
    // 检查用户输入的是否符合规范
    if(mailAddress === "") {
      error("请输入邮箱地址");
    } else if (user === "") {
      error("请输入用户名");
    } else if(pwd === "") {
      error("请输入密码");
    } else if(pwd2 === "") {
      error("请输入确认密码");
    } else{
      this.props.submitToRegister(mailAddress, user, pwd, pwd2, yzm, captcha_key);
      this.setState({
        isRegistering: true
      })
    }

  }

  getyzm() {
    if(this.state.regMailAdd === "") {
      error("请输入邮箱地址");
    } else {
      this.props.getyzmData(this.state.regMailAdd);
    }
  }
  componentDidMount() {
    if(localStorage.getItem("token")) {
      hashHistory.push("/");
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    // 注册成功

    if(this.props.regSuccess) {
      this.setState({
        currentPage: 1,
        loginUser: "",
        loginPwd: "",
        regMailAdd: "",
        regUser: "",
        regPwd: "",
        regPwd2: "",
        isRegistering: false,
        isLogining: false,
        yzm: ""
      });
      this.props.cancelRegSuccess();
    }

    // 注册失败

    if(this.props.regFailed) {
      this.setState({
        isRegistering: false
      });
      this.props.cancelRegFailed();
    }

    // 登录失败后修改登录是否动画
    if(this.props.loginFailed) {
      this.setState({
        isLogining: false
      });
      // 将loginFailed 改为false
      this.props.cancelLoginFailed();
    }

    if(this.props.loginState === true && this.state.isLogining === true) {
      this.setState({
        isLogining: false
      });
      success("登录成功");
      hashHistory.push("/");
    }
  }
  render() {
    return (
      <div>
        {
          this.state.currentPage === 1 ?
            <LoginPage jumpToRegister={this.jumpToRegister.bind(this)}
                       changeLoginUser={this.changeLoginUser.bind(this)}
                       changeLoginPwd={this.changeLoginPwd.bind(this)}
                       loginUser = {this.state.loginUser}
                       loginPwd = {this.state.loginPwd}
                       loginBtnClickHandle = {this.loginBtnClickHandle.bind(this)}
                       isLogining = {this.state.isLogining}
                       enterClickHandle = {this.enterClickHandle.bind(this)}
            />
            :
            <RegisterPage jumpToLogin={this.jumpToLogin.bind(this)}
                          changeRegMailAdd={this.changeRegMailAdd.bind(this)}
                          changeRegUser={this.changeRegUser.bind(this)}
                          changeRegPwd = {this.changeRegPwd.bind(this)}
                          changeRegPwd2 = {this.changeRegPwd2.bind(this)}
                          changeYzm = {this.changeYzm.bind(this)}
                          regMailAdd = {this.state.regMailAdd}
                          regUser = {this.state.regUser}
                          regPwd = {this.state.regPwd}
                          regPwd2 = {this.state.regPwd2}
                          yzm = {this.state.yzm}
                          registerBtnClickHandle = {this.registerBtnClickHandle.bind(this)}
                          enterClickHandleToReg = {this.enterClickHandleToReg.bind(this)}
                          isRegistering = {this.state.isRegistering}
                          getyzm = {this.getyzm.bind(this)}
                          yzmInfo = {this.props.yzmInfo}
            />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loginState: state.loginReducers.loginState,
  yzmInfo: state.loginReducers.yzmInfo,
  loginFailed: state.loginReducers.loginFailed,
  regFailed: state.loginReducers.regFailed,
  regSuccess: state.loginReducers.regSuccess
});

const mapDispatchToProps = (dispatch) => ({
  submitToLogin(user, pwd) {
    dispatch(submitToLoginAction(user, pwd));
  },
  submitToRegister(mailAddress, user, pwd, pwd2, yzm, captcha_key) {
    dispatch(submitToRegisterAction(mailAddress, user, pwd, pwd2, yzm, captcha_key));
  },
  getyzmData(email) {
    dispatch(getyzmAction(email));
  },
  cancelLoginFailed() {
    dispatch(loginFailed());
  },
  cancelRegFailed() {
    dispatch(regFailed());
  },
  cancelRegSuccess() {
    dispatch(regSuccess());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);