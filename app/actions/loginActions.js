import { actionType } from '../constants/actionType'
import axios from 'axios';
import {message} from "antd";
import host from  "../constants/host";
import NProgress from "nprogress"

const success = (str) => {
  message.success(str);
};

const error = (str) => {
  message.error(str);
};

export const loginFailed = () => ({
  type: actionType.loginType.LOGIN_FAILED
});

export const exitLogin = () => ({
  type: actionType.loginType.EXIT_LOGIN
});

export const regFailed = () => ({
  type: actionType.loginType.REG_FAILED
});

export const regSuccess = () => ({
  type: actionType.loginType.REG_SUCCESS
});

export const toggleLoginAction = () => ({
  type: actionType.loginType.TOGGLE_LOGIN_STATE,
});

const getUserInfo = (data) => ({
  type: actionType.loginType.GET_USER_INFO,
  data
});

const getyzmInfo = (data) => ({
  type: actionType.loginType.GET_YZM_INFO,
  data
});

export const submitToLoginAction = (user, pwd) => {
  NProgress.start();
  return dispatch => {
    axios.post(host + '/api/users/login', {
      email: user,
      password: pwd
    })
      .then(function (response) {
        let localToken = "Bearer" + " " + response.data.access_token;
        localStorage.setItem("token", localToken);
        dispatch(toggleLoginAction());
        NProgress.done();
      })
      .catch(function (err) {
        NProgress.done();
        if(err.response.status === 401) {
          error("账号或密码输入错误");
          dispatch(loginFailed());
        }
        if(err.response.status === 403) {
          error("邮箱尚未激活，请前往邮箱激活！");
          dispatch(loginFailed());
        }
      });
  }
};

export const getUserInfoAction = () => {
  const token = localStorage.getItem("token");
  return dispatch => {
    axios({
      method: "get",
      url: host + "/api/user/me",
      headers: {
        'Authorization':  token
      }
    }).then(res => {
        dispatch(getUserInfo(res.data.data))
    }).catch(err => {
      dispatch(exitLoginAction());
      console.log(err);
    })
  }
};

export const submitToRegisterAction = (mailAddress,user, pwd, pwd2, yzm, captcha_key) => {
  NProgress.start();
  return dispatch => {
    axios({
      method: "post",
      url: host + "/api/users/register",
      data: {
        name: user,
        email: mailAddress,
        password: pwd,
        password_confirmation: pwd2,
        captcha_key: captcha_key,
        captcha_code: yzm
      }
    }).then(res => {
      dispatch(regSuccess());
      success(res.data.message);
      NProgress.done();
    }).catch(err => {
      NProgress.done();
      error("验证码或邮箱输入错误，请重新拉取验证码");
      dispatch(regFailed());
    })
  }
};

export const getyzmAction = (email) => {
  NProgress.start();
  return dispatch => {
    axios({
      method: "post",
      url: host + "/api/captchas",
      data: {
        email: email
      }
    }).then(res => {
      dispatch(getyzmInfo(res.data));
      NProgress.done();
      // dispatch(res.data);
    }).catch(err => {
      NProgress.done();
      error("请检查邮箱格式，或者改邮箱已被注册");
    })
  }
};

export const exitLoginAction = () => {
  const token = localStorage.getItem("token");
  localStorage.removeItem("token");
  return dispatch => {
    dispatch(exitLogin());
    axios({
      method: "get",
      url: host + "/api/user/logout",
      headers: {
        'Authorization':  token
      }
    }).then(res => {
      success(res.data.message);
    }).catch(error => {
      console.log(error);
    })
  }
};



