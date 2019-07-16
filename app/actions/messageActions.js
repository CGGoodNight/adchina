import {actionType} from '../constants/actionType';
import {message} from "antd";
import {getTypeValue} from "../components/Message/getDetailItem";
import host from "../constants/host";
import axios from 'axios';
import {searchGetDetail} from "./searchAction";
import {submitPrivateLetter} from "./detailActions";
import {getUserInfoAction} from "./loginActions";
import {cancelSpinningAction} from "./mainActions";
import NProgress from "nprogress";

const success = (str) => {
  message.success(str, 1);
};

const error = (str) => {
  message.error(str, 1);
};

const getReceivePrivateMessage = (data) => ({
  type: actionType.messageType.GET_RECEIVE_PRIVATE_MESSAGE,
  data
});

const getSendPrivateMessage = (data) => ({
  type: actionType.messageType.GET_SEND_PRIVATE_MESSAGE,
  data
});

const getReceivePrivateDetail = (data) => ({
  type: actionType.messageType.GET_RECEIVE_PRIVATE_DETAIL,
  data
});

const getSendPrivateDetail = (data) => ({
  type: actionType.messageType.GET_SEND_PRIVATE_DETAIL,
  data
});

const getMyDemand = (data) => ({
  type: actionType.messageType.GET_MY_DEMAND,
  data
});

const getMyAdd = (data) => ({
  type: actionType.messageType.GET_MY_ADD,
  data
});

const getMyOrder = (data) => ({
  type: actionType.messageType.GET_MY_ORDER,
  data
});

const getSelfInfo = (data) => ({
  type: actionType.messageType.GET_SELF_INFO,
  data
});

const uploadImageUrl = (url) => ({
  type: actionType.messageType.GET_UPLOAD_IMG_URL,
  url
});

const getSystemInfo = (data) => ({
  type: actionType.messageType.GET_SYSTEM_INFO,
    data
});


export const clearOrderDataAction = () => ({
  type: actionType.messageType.CLEAR_ORDER_DATA
});

export const clearImageUrlAction = () => ({
  type: actionType.messageType.CLEAR_IMG_URL
});

// 用户接受到的所有私信
export const getReceivePrivateMessageAction = () => {
  NProgress.start();
  return dispatch => {
    axios({
      method: "get",
      url: host + "/api/users/contacts/Received",
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      dispatch(getReceivePrivateMessage(res.data.data));
      NProgress.done();
    }).catch(err => {
      console.log(err);
    })
  }
};

// 用户接受到与某人的详细私信
export const getReceivePrivateDetailAction = (apply_id) => {
  NProgress.start();
  return dispatch => {
    axios({
      method: "get",
      url: host + "/api/users/contacts/"  + apply_id + "/detail",
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      dispatch(getReceivePrivateDetail(res.data.data));
      NProgress.done();
    }).catch(err => {
      console.log(err);
    })
  }
};

// 用户发送的所有私信
export const getSendPrivateMessageAction = () => {
  NProgress.start();
  return dispatch => {
    axios({
      method: "get",
      url: host + "/api/users/contacts/Sended",
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      dispatch(getSendPrivateMessage(res.data.data));
      NProgress.done();
    }).catch(err => {
      console.log(err);
    })
  }
};
// 用户发送的与某人的详细私信 用户接受到与某人的详细私信 合并Api  调用同一个
// 用户发送的与某人的详细私信
export const getSendPrivateDetailAction = (accept_id) => {
  NProgress.start();
  return dispatch => {
    axios({
      method: "get",
      url: host + "/api/users/contacts/"  + accept_id + "/detail",
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      dispatch(getSendPrivateDetail(res.data.data));
      NProgress.done();
    }).catch(err => {
      console.log(err);
    })
  }
};


// 上传需求和广告
export const submitDemandAction = (dataObj) => {
  NProgress.start();
  return dispatch => {
    if (dataObj.address.length === 0) {
      // 添加需求
      console.log("添加需求");
      let name = dataObj.name;
      let type = getTypeValue(dataObj.type);
      let maxArea = dataObj.maxArea;
      let exposureDay = dataObj.exposureDay;
      let exposureHour = dataObj.exposureHour;
      let tel = dataObj.tel;
      let price = dataObj.price;
      let content = dataObj.content;
      let traffic = dataObj.traffic;
      axios({
        method: "post",
        url: host + "/api/demands",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
        },
        data: {
          name,
          type,
          minArea: maxArea,
          exposureDay,
          exposureHour,
          tel,
          price,
          content,
          traffic
        }
      }).then(res => {
        if (res.status === 201) {
          success(res.data.message);
          NProgress.done();
        }
      }).catch(err => {
        // error("修改失败");
        console.log(err);
      })
    } else {
      // 添加广告
      console.log("添加广告");
      let name = dataObj.name;
      let address = dataObj.address;
      let type = getTypeValue(dataObj.type);
      let maxArea = dataObj.maxArea;
      let exposureDay = dataObj.exposureDay;
      let exposureHour = dataObj.exposureHour;
      let tel = dataObj.tel;
      let price = dataObj.price;
      let content = dataObj.content;
      let images = dataObj.uploadImg;

      let imagesArr = [];
      images.map((item, index) => {
        let str = item;
        const addStr = "adchina_adverts/";
        str = str.split("adchina_adverts/");
        item = addStr + str[1];
        imagesArr.push({"image": item});
      });

      let traffic = dataObj.traffic;
      axios({
        method: "post",
        url: host + "/api/adverts",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
        },
        data: {
          name,
          type,
          address,
          maxArea,
          exposureDay,
          exposureHour,
          tel,
          price,
          content,
          traffic,
          images: imagesArr
        }
      }).then(res => {
        if (res.status === 201) {
          success(res.data.message);
          NProgress.done();
        }
      }).catch(err => {
        // error("修改失败");
        console.log(err);
      })
    }

  }
};

// 修改需求和广告
export const modifyDemandAction = (dataObj) => {
  NProgress.start();
  return dispatch => {
    if (dataObj.address.length === 0) {
      console.log("修改需求");
      let name = dataObj.name;
      let type = getTypeValue(dataObj.type);
      let maxArea = dataObj.maxArea;
      let exposureDay = dataObj.exposureDay;
      let exposureHour = dataObj.exposureHour;
      let tel = dataObj.tel;
      let price = dataObj.price;
      let content = dataObj.content;
      let traffic = dataObj.traffic;
      axios({
        method: "patch",
        url: host + "/api/demands/" + dataObj.modifyId,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
        },
        data: {
          name,
          type,
          minArea: maxArea,
          exposureDay,
          exposureHour,
          traffic,
          tel,
          price,
          content
        }
      }).then(res => {
        if (res.status === 204) {
          success("修改成功！");
          NProgress.done();
        }
      }).catch(err => {
        error("修改失败");
      })
    } else {
      console.log("修改广告");
      let address = dataObj.address;
      // dataObj.address.map((item, index) => {
      //   if (index === 0) {
      //     address = address + item;
      //   } else {
      //     address = address + "/" + item;
      //   }
      // });
      let name = dataObj.name;
      let type = getTypeValue(dataObj.type);
      let maxArea = dataObj.maxArea;
      let exposureDay = dataObj.exposureDay;
      let exposureHour = dataObj.exposureHour;
      let tel = dataObj.tel;
      let price = dataObj.price;
      let content = dataObj.content;
      let images = dataObj.uploadImg;
      let traffic = dataObj.traffic;
      let imagesArr = [];
      images.map((item, index) => {
        let str = item;
        const addStr = "adchina_adverts/";
        str = str.split("adchina_adverts/");
        item = addStr + str[1];
        imagesArr.push({"image": item});
      });
      axios({
        method: "patch",
        url: host + "/api/adverts/" + dataObj.modifyId,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
        },
        data: {
          name,
          address,
          type,
          maxArea,
          exposureDay,
          exposureHour,
          tel,
          price,
          content,
          traffic,
          images: imagesArr
        }
      }).then(res => {
        if (res.status === 204) {
          success("修改成功！");
          NProgress.done();
        }
      }).catch(err => {
        error("修改失败");
      })
    }
  }
};

export const getMyDemandAction = () => {
  NProgress.start();
  return dispatch => {
    axios.get(host + "/api/demands", {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      const data = res.data.data;
      dispatch(getMyDemand(data));
      NProgress.done();
    }).catch((err) => {
      console.log(err);
    })
  }
};

// 得到自己的所有的广告
export const getMyAddAction = () => {
  NProgress.start();
  return dispatch => {
    axios.get(host + "/api/adverts", {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      const data = res.data.data;
      dispatch(getMyAdd(data));
      NProgress.done();
    }).catch((err) => {
      console.log(err);
    })
  }
};

// 得到我的所有的订单详情  isBuyPage 判断是购买页  还是卖出页
export const getMyOrderAction = (isBuyPage) => {
  NProgress.start();
  return dispatch => {
    if(isBuyPage) {
      axios({
        method: "get",
        url: host + "/api/getAllOrdersAsBuyer",
        headers: {
          "Content-Type": "application/json",
          'Authorization': localStorage.getItem("token")
        }
      }).then(res => {
        const data = res.data.data;
        dispatch(getMyOrder(data));
        NProgress.done();
      }).catch((err) => {
        console.log(err);
      })
    } else {
      axios({
        method: "get",
        url: host + "/api/getAllOrdersAsSeller",
        headers: {
          "Content-Type": "application/json",
          'Authorization': localStorage.getItem("token")
        }
      }).then(res => {
        const data = res.data.data;
        NProgress.done();
        dispatch(getMyOrder(data));
      }).catch((err) => {
        console.log(err);
      });
    }
  }
};

// 获取个人信息
export const getSelfInfoAction = () => {
  NProgress.start();
  return dispatch => {
    axios({
      method: "get",
      url: host + "/api/user/me",
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      NProgress.done();
      dispatch(getSelfInfo(res.data.data));
    }).catch(err => {
      console.log(err);
    })
  }
};

// 上传头像
export const uploadAvatarAction = (formData) => {
  NProgress.start();
  return dispatch => {
    axios({
      method: "post",
      url: host + "/api/UploadAvatar",
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': localStorage.getItem("token")
      },
      data: formData
    }).then(res => {
      success(res.data.message);
      dispatch(getUserInfoAction());
      dispatch(cancelSpinningAction());
      NProgress.done();
    }).catch(err => {
      error("上传失败，请刷新后重新上传~");
      dispatch(cancelSpinningAction());
      console.log(err);
    })
  }
};

// 上传广告图片并把url返回给我
export const uploadAdImageAction = (formData, isSeller = false, order_id = 1) => {
  NProgress.start();
  return dispatch => {
    if(isSeller) {
      axios({
        method: "post",
        url: host + "/api/UploadAdverts",
        headers: {
          'Authorization': localStorage.getItem("token")
        },
        data: formData
      }).then(res => {
        if(res.status === 201) {
          success(res.data.message);
          let result = "";
          let str = res.data.url;
          const addStr = "adchina_adverts/";
          str = str.split("adchina_adverts/");
          result = addStr + str[1];
          console.log(result);
          console.log(order_id);
          axios({
            method: "patch",
            url: host + "/api/orders/" + order_id,
            headers: {
              'Authorization': localStorage.getItem("token")
            },
            data: {
              order_confirmImage: result
            }
          }).then(res => {
            if(res.status === 204) {
              success("成功啦");
              window.location.reload();
            }
          }).catch(err => {
            console.log(err);
          });

          NProgress.done();
        }
      }).catch(error => {
        console.log(error);
      })
    } else {
      axios({
        method: "post",
        url: host + "/api/UploadAdverts",
        headers: {
          'Authorization': localStorage.getItem("token")
        },
        data: formData
      }).then(res => {
        if(res.status === 201) {
          success(res.data.message);
          dispatch(uploadImageUrl(res.data.url));
          dispatch(cancelSpinningAction());
          NProgress.done();
        }
      }).catch(error => {
        console.log(error);
      })
    }
  }
};

// 修改个人信息的action
export const submitModifyAction = (name, address, qrcode) => {
  NProgress.start();
  return dispatch => {
    console.log(qrcode);
    let str = qrcode;
    const addStr = "adchina_qrcode/";
    str = str.split("adchina_qrcode/");
    qrcode = addStr + str[1];
    axios({
      method: "post",
      url: host + "/api/users",
      headers: {
        'Authorization': localStorage.getItem("token")
      },
      data: {
        name,
        address,
        qrcode
      }
    }).then(res => {
      console.log(res);
      if(res.status === 204) {
        success("修改成功");
        dispatch(getSelfInfoAction());
        dispatch(cancelSpinningAction());
        NProgress.done();
      }
    }).catch(err => {
      console.log(err);
    })
  }
};

// 通过id获取广告
export const CrossIdGetAdAction = (id, isSearchPage) => {
  NProgress.start();
  return dispatch => {
    if (id === "") {
      axios.get(host + "/api/adverts", {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      }).then(res => {
        const data = res.data.data;
        dispatch(getMyAdd(data));
      }).catch((err) => {
        console.log(err);
      })
    } else {
      axios({
        method: "get",
        url: host + "/api/adverts/" + id,
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      }).then(res => {
        let data = [res.data.data];
        NProgress.done();
        if(isSearchPage) {
          dispatch(searchGetDetail(data));
        } else {
          dispatch(getMyAdd(data));
        }
      }).catch(err => {
        NProgress.done();
        error("没有搜索到指定id的广告");
      })
    }
  }
};

// 通过id获取需求
export const CrossIdGetDemandAction = (id, isSearchPage = false) => {
  NProgress.start();
  return dispatch => {
    if (id === "") {
      axios.get(host + "/api/demands", {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      }).then(res => {
        const data = res.data.data;
        dispatch(getMyDemand(data));
      }).catch((err) => {
        console.log(err);
      })
    } else {
      axios({
        method: "get",
        url: host + "/api/demands/" + id,
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      }).then(res => {
        let data = [res.data.data];
        NProgress.done();
        if(isSearchPage) {
          dispatch(searchGetDetail(data));
        } else {
          dispatch(getMyDemand(data));
        }
      }).catch(err => {
        NProgress.done();
        error("没有搜索到指定id的需求");
      })
    }
  }

};

// 删除指定需求
export const deleteDemandAction = (id) => {
  NProgress.start();
  return dispatch => {
    axios({
      method: "delete",
      url: host + "/api/demands/" + id,
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      if (res.status === 204) {
        success("删除成功！");
        NProgress.done();
        dispatch(getMyDemandAction());
      }
    }).catch(err => {
      NProgress.done();
      error("删除失败!");
    })
  }
};

export const deleteAdAction = (id) => {
  NProgress.start();
  return dispatch => {
    axios({
      method: "delete",
      url: host + "/api/adverts/" + id,
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      if (res.status === 204) {
        success("删除成功！");
        NProgress.done();
        dispatch(getMyAddAction());
      }
    }).catch(err => {
      NProgress.done();
      error("该广告位有订单交易，不能删除!");
    })
  }
};

// 回复私信
export const submitReplyContentAction = (other_id, replyContent) => {
  return dispatch => {
    if(replyContent === "") {
      error("发送内容不能为空");
      return;
    }
    // 后端上传回复数据过后，回复内容没有马上添加到返回的内容中，设置定时器来实现
    setTimeout(() => {
      dispatch(getSendPrivateDetailAction(other_id));
    }, 500);
    dispatch(submitPrivateLetter(other_id, replyContent));
  }
};

export const uploadQRAction = (name, address, formData) => {
  NProgress.start();
  return dispatch => {
    axios({
      method: "post",
      url: host + "/api/UploadQrCode",
      headers: {
        'Authorization': localStorage.getItem("token")
      },
      data: formData
    }).then(res => {
      dispatch(submitModifyAction(name, address, res.data.url));
      NProgress.done();
    }).catch(err => {
      console.log(err);
    });
  }
};

// 删除订单
// export const deleteOrderAction = (order_id) => {
//   return dispatch => {
//     console.log(order_id);
//   }
// };

// 改变订单状态
export const changeOrderStateAction = (order_id) => {
  NProgress.start();
  return dispatch => {
    axios({
      method: "patch",
      url: host + "/api/orders/" + order_id,
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      window.location.reload();
      NProgress.done();
    }).catch(err => {
      console.log(err);
    })
  }
};

// 为支付页面单独新建一个action
export const changeOrderStateToPayAction = (order_id) => {
  let newWindow = window.open();
  NProgress.start();
  return dispatch => {
    axios({
      method: "patch",
      url: host + "/api/orders/" + order_id,
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      NProgress.done();
      success(res.data.message);
      newWindow.location.href = res.data.url;
    }).catch(err => {
      console.log(err);
    })
  }
};


// 订单的下载的底图
export const downloadBaseImageAction = (order_id) => {
  let newWindow = window.open();
  NProgress.start();
  return dispatch => {
    console.log(order_id);
    axios({
      method: "get",
      url: host + "/api/downloadCompoundPic/" + order_id,
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      NProgress.done();
      console.log(res);
      newWindow.location.href = `http://${res.data.url}`;
    }).catch(err => {
      console.log(err);
    })
  }
};

export const viewSellerImageAction = (order_id) => {
  let newWindow = window.open();
  return dispatch => {
    axios({
      method: "get",
      url: host + "/api/getConfirmPic/" + order_id,
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      if(res.status === 200) {
        newWindow.location.href = res.data.url;
        // window.open(res.data.url);
      }
    }).catch(err => {
      console.log(err);
    })
  }
};

// 提现
export const withdrawAction = (apply_sum, apply_alipay, apply_name) => {
  return dispatch => {
    axios({
      method: "post",
      url: host + "/api/user/withdrawals",
      headers: {
        'Authorization': localStorage.getItem("token")
      },
      data: {
        apply_sum,
        apply_alipay,
        apply_name
      }
    }).then(res => {
      success(res.data.message);
    }).catch(err => {
      console.log(err);
    })
  }
};

export const clearRemindAction = () => {
  return dispatch => {
    axios({
      method: "patch",
      url: host + "/api/users/contacts/clear",
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }
};
export const getSystemInfoAction = (isSerach = false, value = "") => {
  NProgress.start();
  return dispatch => {
    if(isSerach) {
      axios({
        method: "get",
        url: host + "/api/systemNotifications/" + value,
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      }).then(res => {
        if(res.status === 200) {
          let data = [res.data.data];
          dispatch(getSystemInfo(data));
          NProgress.done();
        }
      }).catch((err) => {
        error("没有查询到对应的通知");
        NProgress.done();
        console.log(err);
      })
    } else {
      axios({
        method: "get",
        url: host + "/api/systemNotifications",
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      }).then(res => {
        if(res.status === 200) {
          dispatch(getSystemInfo(res.data.data));
          NProgress.done();
        }
      }).catch((err) => {
        NProgress.done();
        console.log(err);
      })
    }

  }
};