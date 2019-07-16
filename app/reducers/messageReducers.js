import {actionType} from "../constants/actionType";

const defaultState = {
  receivePrivateData: [],
  sendPrivateData: [],
  myDemand: [],
  myAdd: [],
  myOrder: [],
  selfInfo: [],
  receivePrivateDetailData: [],
  sendPrivateDetailData: [],
  uploadImgUrl: "",
  systemInfo: []
}
;

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionType.messageType.GET_RECEIVE_PRIVATE_MESSAGE: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.receivePrivateData = action.data;
      return newState;
    }
    case actionType.messageType.GET_MY_DEMAND: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.myDemand = action.data;
      return newState;
    }
    case actionType.messageType.GET_MY_ADD: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.myAdd = action.data;
      return newState;
    }
    case actionType.messageType.GET_MY_ORDER: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.myOrder = action.data;
      return newState;
    }
    case actionType.messageType.GET_SELF_INFO: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.selfInfo = action.data;
      return newState;
    }
    case actionType.messageType.GET_RECEIVE_PRIVATE_DETAIL: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.receivePrivateDetailData = action.data;
      return newState;
    }
    case actionType.messageType.GET_SEND_PRIVATE_MESSAGE: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.sendPrivateData = action.data;
      return newState;
    }
    case actionType.messageType.GET_SEND_PRIVATE_DETAIL: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.sendPrivateDetailData = action.data;
      return newState;
    }
    case actionType.messageType.GET_UPLOAD_IMG_URL: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.uploadImgUrl = action.url;
      return newState;
    }
    case actionType.messageType.CLEAR_IMG_URL: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.uploadImgUrl = "";
      return newState;
    }
    case actionType.messageType.CLEAR_ORDER_DATA: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.myOrder = [];
      return newState;
    }
    case actionType.messageType.GET_SYSTEM_INFO: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.systemInfo = action.data;
      return newState;
    }
    default:
      return state;
  }
}