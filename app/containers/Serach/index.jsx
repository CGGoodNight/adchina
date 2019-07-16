import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Header from "../../components/Common/Header";
import Footer from "../../components/Common/Footer";
import Select from "../../components/Serach/Select";
import SerchCommodity from "../../components/Serach/SerchCommodity";
import CommodityBox from "../../components/Serach/CommodityBox";
import {submitSearchConditionAction, onPageChangeAction} from "../../actions/searchAction";
import {CrossIdGetDemandAction, CrossIdGetAdAction} from "../../actions/messageActions";
import {hashHistory} from "react-router";
import $ from "jquery";
import {exitLoginAction, getUserInfoAction, toggleLoginAction} from "../../actions/loginActions";
import {message} from "antd";

const warning = (str) => {
  message.warning(str);
};

class Serach extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSearchAdPage: true,
      type: "",
      traffic: 0,
      price_start: 0,
      price_end: 0,
      address: "",
      idSearch: ""
    }
  }

  onSelectOptionsClick(item, index, e) {

   if(e.target.style.color === "") {
     let a = $(e.target);
     a.siblings().css("color", "");
     a.css("color", "#f40");

     switch (item.id) {
       case 1: {
         this.setState({
           type: item.options[index]
         });
         break;
       }
       case 2: {
         this.setState({
           traffic: parseInt(item.options[index])
         });
         break;
       }
       case 3: {
         this.setState({
           price_start: parseInt(item.options[index])
         });
         break;
       }
       case 4: {
         this.setState({
           price_end: parseInt(item.options[index])
         });
         break;
       }
       case 5: {
         this.setState({
           address: item.options[index]
         });
         break;
       }
     }
   }
   else {
     let a = $(e.target);
     a.css("color", "");

     switch (item.id) {
       case 1: {
         this.setState({
           type: ""
         });
         break;
       }
       case 2: {
         this.setState({
           traffic: 0
         });
         break;
       }
       case 3: {
         this.setState({
           price_start: 0
         });
         break;
       }
       case 4: {
         this.setState({
           price_end: 0
         });
         break;
       }
       case 5: {
         this.setState({
           address: ""
         });
         break;
       }
     }
   }
  }

  onTrafficInputChange(value) {
    let aAll = $(".select-box .select-box-item").eq(1).find(".detail a");
    for(let i=0, len = aAll.length; i < len; i++) {
      aAll.eq(i).css("color", "");
    }
    if(value) {
      this.setState({
        traffic: value
      })
    } else {
      this.setState({
        traffic: 0
      })
    }
  }

  onMinPriceChange(value) {
    let aAll = $(".select-box .select-box-item").eq(2).find(".detail a");
    for(let i=0, len = aAll.length; i < len; i++) {
      aAll.eq(i).css("color", "");
    }

    if(value) {
      this.setState({
        price_start: value
      })
    } else {
      this.setState({
        price_start: 0
      })
    }
  }
  onMaxPriceChange(value) {
    let aAll = $(".select-box .select-box-item").eq(3).find(".detail a");
    for(let i=0, len = aAll.length; i < len; i++) {
      aAll.eq(i).css("color", "");
    }

    if(value) {
      this.setState({
        price_end: value
      })
    } else {
      this.setState({
        price_end: 0
      })
    }
  }

  onAddressChange(value) {
    let aAll = $(".select-box .select-box-item").eq(4).find(".detail a");
    for(let i=0, len = aAll.length; i < len; i++) {
      aAll.eq(i).css("color", "");
    }
    this.setState({
      address: value
    })
  }

  submitSerchCondition() {
    this.props.submitSerchConditionData(this.state);
  }

  onIdSearchChange = (e) => {
    this.setState({
      idSearch: e.target.value
    })
  };

  CrossIdGetDemandData() {
    this.props.CrossIdGetDemand(this.state.idSearch);
  }

  CrossIdGetAdData() {
    this.props.CrossIdGetAd(this.state.idSearch);
  }

  exitLogin() {
    this.props.exitLoginData();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if(!localStorage.getItem("token")) {
      warning("请先登录后在进行操作哟~");
      hashHistory.push("/");
      return;
    } else {
      this.props.toggleLogin();
      this.props.getUserInfoData();
      if(parseInt(this.props.params.page) === 1) {
        this.setState({
          isSearchAdPage: true
        }, () => {
          this.props.submitSerchConditionData(this.state);
        })
      } else {
        this.setState({
          isSearchAdPage: false
        }, () => {
          this.props.submitSerchConditionData(this.state);
        })
      }
    }
  }

  onPageChange(page, pageSize) {
    let start = pageSize * (page - 1);
    let end = page * pageSize;
    this.props.onSearchPageChange(start, end);
  }

  render() {
    return (
      <div>
        <Header
          loginState = {this.props.loginState}
          userInfo = {this.props.userInfo}
          exitLogin = {this.exitLogin.bind(this)}
          page={1}
        >
        </Header>
        <Select
          isSearchAdPage = {this.state.isSearchAdPage}
          onSelectOptionsClick = {this.onSelectOptionsClick.bind(this)} isAdPage={true} />
        <SerchCommodity
          isSearchAdPage = {this.state.isSearchAdPage}
          selectOption = {this.state}
          onTrafficInputChange = {this.onTrafficInputChange.bind(this)}
          onMinPriceChange = {this.onMinPriceChange.bind(this)}
          onMaxPriceChange = {this.onMaxPriceChange.bind(this)}
          onAddressChange = {this.onAddressChange.bind(this)}
          submitSerchCondition = {this.submitSerchCondition.bind(this)}
          onIdSearchChange = {this.onIdSearchChange.bind(this)}
          idSearch = {this.state.idSearch}
          CrossIdGetDemandData = {this.CrossIdGetDemandData.bind(this)}
          CrossIdGetAdData = {this.CrossIdGetAdData.bind(this)}
        />
        <CommodityBox
          isSearchAdPage = {this.state.isSearchAdPage}
          searchPageDisplayData = {this.props.searchPageDisplayData}
          allSearchPageDisplayData = {this.props.allSearchPageDisplayData}
          onPageChange={this.onPageChange.bind(this)} />
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchPageDisplayData: state.searchReducers.searchPageDisplayData,
  allSearchPageDisplayData: state.searchReducers.allSearchPageDisplayData,
  loginState: state.loginReducers.loginState,
  userInfo: state.loginReducers.userInfo
});

const mapDispatchToProps = (dispatch) => ({
  submitSerchConditionData(dataObj) {
    dispatch(submitSearchConditionAction(dataObj));
  },
  exitLoginData() {
    dispatch(exitLoginAction());
  },
  getUserInfoData() {
    dispatch(getUserInfoAction());
  },
  toggleLogin() {
    dispatch(toggleLoginAction());
  },
  CrossIdGetDemand(id) {
    dispatch(CrossIdGetDemandAction(id, true));
  },
  CrossIdGetAd(id) {
    dispatch(CrossIdGetAdAction(id, true));
  },
  onSearchPageChange(start, end) {
    dispatch(onPageChangeAction(start, end));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Serach);