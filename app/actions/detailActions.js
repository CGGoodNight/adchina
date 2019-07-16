import { actionType } from '../constants/actionType'
import axios from 'axios';
import {message} from "antd";
import host from  "../constants/host";
import NProgress from "nprogress";
import {hashHistory} from "react-router";
import {cancelSpinningAction} from "./mainActions";

const success = (str) => {
  message.success(str);
};

const error = (str) => {
  message.error(str);
};

const getAdDetail = (data) => ({
  type: actionType.detailType.GET_AD_DETAIL,
  data
});

const getDemandDetail = (data) => ({
  type: actionType.detailType.GET_DEMAND_DETAIL,
  data
});

export const clearDetailAction = () => ({
  type: actionType.detailType.CLEAR_DETAIL
});

// 根据id获取到广告详情
export const getAdDetailAction = (id) => {
  NProgress.start();
  return dispatch => {
    axios({
      method: "get",
      url: host + "/api/adverts/" + id,
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }).then((res) => {
      if(res.status === 200) {
        dispatch(getAdDetail(res.data.data))
        NProgress.done();
      }
    }).catch((err) => {
      error("广告位不存在或已被删除");
      NProgress.done();
      console.log(err);
    })
  }
};
// 根据id获取到需求详情
export const getDemandDetailAction = (id) => {
  NProgress.start();
  return dispatch => {
    axios({
      method: "get",
      url: host + "/api/demands/" + id,
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }).then((res) => {
      if(res.status === 200) {
        dispatch(getDemandDetail(res.data.data));
        NProgress.done();
      }
    }).catch((err) => {
      NProgress.done();
      console.log(err);
    })
  }
};

export const getVideoDetailAction = (id) => {
  return dispatch => {
    axios("/public/detail/videoDetailData.json").then(res => {
      if(res.data.code) {
        const data= res.data.data;
        console.log(data);
        // dispatch(getvideoDetail(data.demandDetail));
      }
    }).catch(error => {
      NProgress.done();
      console.log(error);
    })
  }
};

export const submitPrivateLetter = (to, content) => {
  console.log(to);
  NProgress.start();
  return dispatch => {
    if(content === "") {
      error("发送的内容不能为空！");
      return;
    }
    axios({
      method: "post",
      url: host + "/api/users/contacts/"+ to +"/create",
      headers: {
        'Authorization': localStorage.getItem("token")
      },
      data: {
        content
      }
    }).then(res => {
      if(res.status === 201) {
        success(res.data.message);
        NProgress.done();
      }
    }).catch((err) => {
      error("发送失败或该用户已注销");
      NProgress.done();
      console.log(err);
    })
  }
};

// 创建订单
export const createOrder = (id, url) => {
  NProgress.start();
  return dispatch => {
    let str = url;
    const addStr = "adchina_baseimages/";
    str = str.split("adchina_baseimages/");
    url = addStr + str[1];
    console.log(id, url);
    axios({
      method: "post",
      url: host + "/api/orders",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      data: {
        advert_baseImage: url,
        sellersinfo_id: id
      }
    }).then(res => {
      success(res.data.message);
      hashHistory.push("/message/3");
      NProgress.done();
    }).catch(err => {
      NProgress.done();
      console.log(err);
    })
  }
};

export const uploadAdImageAction = (id,formData) => {
  NProgress.start();
  return dispatch => {
    console.log(id, formData);
    axios({
      method: "post",
      url: host + "/api/UploadBaseImage",
      headers: {
        "Authorization": localStorage.getItem("token")
      },
      data: formData
    }).then(res => {
      if(res.status === 201) {
        success(res.data.message);
        NProgress.done();
        dispatch(cancelSpinningAction());
        success("上传成功，正在生成订单");
        dispatch(createOrder(id, res.data.url));
      }

    }).catch(err => {
      console.log(err);
    })
  }
};

