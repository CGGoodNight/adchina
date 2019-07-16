import {actionType} from "../constants/actionType";

const defaultState = {
  loginState: false,
  loginFailed: false,
  regFailed: false,
  regSuccess: false,
  userInfo: {},
  yzmInfo: {}
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionType.loginType.TOGGLE_LOGIN_STATE: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loginState = true;
      return newState;
    }
    case actionType.loginType.GET_USER_INFO: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.userInfo = action.data;
      return newState;
    }
    case actionType.loginType.GET_YZM_INFO: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.yzmInfo = action.data;
      return newState;
    }
    case actionType.loginType.LOGIN_FAILED: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loginFailed = !newState.loginFailed;
      return newState;
    }
    case actionType.loginType.REG_FAILED: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.regFailed = !newState.regFailed;
      return newState;
    }
    case actionType.loginType.REG_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.regSuccess = !newState.regSuccess;
      return newState;
    }
    case actionType.loginType.EXIT_LOGIN: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loginState = false;
      return newState;
    }
    default:
      return state;
  }
}