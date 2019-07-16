import { actionType } from '../constants/actionType'
import axios from 'axios';
import {message} from "antd";
import host from  "../constants/host";
import NProgress from "nprogress";

const success = (str) => {
  message.success(str);
};

const error = (str) => {
  message.error(str);
};

export const searchGetDetail = (data) => ({
  type: actionType.searchType.SEARCH_GET_DETAIL,
  data
});

export const submitSearchConditionAction = (dataObj) => {
  NProgress.start();
  return dispatch => {
    let type = dataObj.type;
    let traffic = dataObj.traffic;
    let price_start = dataObj.price_start;
    let price_end = dataObj.price_end;
    let address = dataObj.address;
    // 搜索广告
    if(dataObj.isSearchAdPage) {
      axios({
        method: "post",
        url: host + "/api/allAdverts",
        data: {
          type, traffic, price_start,price_end,address
        }
      }).then(res => {
        if(res.status === 200) {
          dispatch(searchGetDetail(res.data.data));
          NProgress.done();
        }

      }).catch((err) => {
        NProgress.done();
        error("获取数据失败");
        console.log(err);
      })
    } else {
      // 搜索需求
      console.log("需求");
      axios({
        method: "post",
        url: host + "/api/allDemands",
        data: {
          type, traffic, price_start,price_end
        }
      }).then(res => {
        if(res.status === 200) {
          dispatch(searchGetDetail(res.data.data));
          NProgress.done();
        }

      }).catch((err) => {
        NProgress.done();
        error("获取数据失败");
        console.log(err);
      })
    }

  }
};

export const onPageChangeAction = (start, end) => ({
  type: actionType.searchType.ON_PAGE_CHANGE,
  start,
  end
})
