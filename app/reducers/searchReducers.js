import {actionType} from "../constants/actionType";

const defaultState = {
 searchPageDisplayData: [],
 allSearchPageDisplayData: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionType.searchType.SEARCH_GET_DETAIL: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.allSearchPageDisplayData = action.data;
      newState.searchPageDisplayData = action.data.slice(0, 12);
      return newState;
    }
    case actionType.searchType.ON_PAGE_CHANGE: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.searchPageDisplayData = newState.allSearchPageDisplayData.slice(action.start, action.end);
      return newState;
    }
    default: return state;
  }
}