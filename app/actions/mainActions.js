import { actionType } from '../constants/actionType';
import host from "../constants/host";
import axios from 'axios';
import NProgress from "nprogress";

const getMainData = (adList, demandList, videoList) => ({
  type: actionType.mainType.GET_MAIN_DATA,
  adList,
  demandList,
  videoList

});

// 上传东西成功后调用的
export const cancelSpinningAction = () => ({
  type: actionType.mainType.CANCEL_SPINNING
});

export const openSpinningAction = () => ({
  type: actionType.mainType.OPEN_SPINNING
});
// 上传东西成功后调用的

export const getMainDataAction  = () => {
  NProgress.start();
  return (dispatch) => {
    let getMainAdData = () => {
      return new Promise((resolve, reject) => {
        axios.get(host + "/api/hotAdverts")
          .then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        })
      })
    };

    let getMainDemandData = () => {
      return new Promise((resolve, reject) => {
        axios.get(host + "/api/hotDemands", {
        }).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        })
      })
    };

    // let getMainVideoData = () => {
    //   return new Promise((resolve, reject) => {
    //     axios("/public/main/videoList.json").then(res => {
    //       resolve(res);
    //     }).catch(err => {
    //       console.log(err);
    //     })
    //   })
    // };

    Promise.all([getMainAdData(), getMainDemandData()]).then((result) => {
      // result[2].data.data
      dispatch(getMainData(result[0].data.data, result[1].data.data, []));
      NProgress.done();
    }).catch(err => {
      console.log(err);
    })
  }
};
