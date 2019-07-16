import React, {PureComponent} from "react";
import {
  Input,
  Radio,
  Select,
  Button,
  message,
  InputNumber,
  Spin
} from "antd";
import {
  submitDemandAction,
  modifyDemandAction,
  uploadAdImageAction,
  clearImageUrlAction
} from "../../actions/messageActions";
import {openSpinningAction} from "../../actions/mainActions";
import {getTypeValue} from "./getDetailItem";
import QueueAnim from 'rc-queue-anim';
import {connect} from "react-redux";
import "./adddemand.less";

const RadioGroup = Radio.Group;
const Option = Select.Option;
const {TextArea} = Input;

const warning = (str) => {
  message.warning(str, 1);
};
const error = str => {
  message.error(str);
};

class AddDemand extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isAddAdPage: false,
      isModifyPage: false,
      modifyDemandId: 1,
      tel: 1,
      address: "",
      traffic: 100,
      type: 1,
      maxArea: "",
      exposureHour: 8,
      exposureDay: 5,
      price: 100,
      content: "",
      name: "",

      uploadImg: [],
      isUploadImg: false
    };
  }


  nameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  };

  demandTelChange(e) {
    this.setState({
      tel: e.target.value
    });
  }

  onAddressChange = (e) => {
    this.setState({
      address: e.target.value
    });
  };

  onFlowInputChange(value) {
    this.setState({
      traffic: value
    });
  }

  onTypeRadioChange = e => {
    this.setState({
      type: e.target.value
    });
  };
  onSizeInputChange = e => {
    this.setState({
      maxArea: e.target.value
    });
  };

  onTime1OptionChange(value) {
    this.setState({
      exposureDay: value
    });
  }

  onTime2OptionChange(value) {
    this.setState({
      exposureHour: value
    });
  }

  onPriceOptionChange(value) {
    this.setState({
      price: value
    });
  }

  detailContentChange(e) {
    this.setState({
      content: e.target.value
    });
  }

  submitDemand() {
    if(this.state.name === "") {
      error("名称不能为空");
      return;
    } else if(this.state.name.length > 14) {
      error("名称不能超过14个字");
      return;
    } else if (this.state.tel === "") {
      error("联系电话不能为空");
    } else if (
      this.state.address === "" &&
      this.state.isAddAdPage === true
    ) {
      error("地址不能为空");
      return;
    } else if (this.state.maxArea === "") {
      error("大小不能为空");
      return;
    } else if(this.state.uploadImg.length === 0 && this.state.isAddAdPage === true) {
      error("必须上传至少一张图片");
      return;
    } else{
      this.props.submitDemandData(this.state);
      this.clearAll();
    }
  }

  modifyDemand() {
    if(this.state.name === "") {
      error("名称不能为空");
      return;
    } else if(this.state.name.length > 14) {
      error("名称不能超过14个字");
      return;
    } else if (this.state.tel === "") {
      error("联系电话不能为空");
      return;
    } else if (this.state.address === "" && this.state.isAddAdPage === true) {
      error("地址不能为空");
      return;
    } else if (this.state.maxArea === "") {
      error("大小不能为空");
      return;
    } else if(this.state.uploadImg.length === 0 && this.state.isAddAdPage === true) {
      error("必须上传至少一张图片");
      return;
    }{
      this.props.submitModifyDemandData(this.state);
    }
  }

  clearAll() {
    this.setState({
      tel: 1,
      address: "",
      traffic: 100,
      type: 1,
      maxArea: "",
      exposureHour: 8,
      exposureDay: 5,
      price: 100,
      content: "",
      name: "",
      uploadImg: []
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // FIXME: 可能是点击我的需求和我的广告之间这个组件没有重新didMount 所以通过didUpdata来刷新
    this.setState({
      isAddAdPage: this.props.isAddAdPage,
      isModifyPage: this.props.isModifyPage
    });

    if (this.props.uploadImgUrl !== "") {
      this.setState({
        uploadImg: [...this.state.uploadImg, this.props.uploadImgUrl]
      });
      this.props.clearImgUrl();
    }

    // 判断上传图片完成了没
    if(!this.props.spinState) {
      this.setState({
        isUploadImg: false,
      })
      this.props.openSpinning();
    }
  }

  componentDidMount() {
    // 修改需求
    if (this.props.isModifyPage) {
      // 是修改页
      if (this.props.isAddAdPage) {
        // 是修改页 是修改广告页
        const data = this.props.modifyDemandData;
        let img = [];
        data.images.map((item, index) => {
          img.push(item.image);
        });
        console.log(data);
        this.setState({
          modifyId: data.modifyId,
          tel: data.tel,
          address: data.address,
          traffic: data.traffic,
          type: data.type,
          maxArea: data.maxArea,
          exposureHour: data.exposureHour,
          exposureDay: data.exposureDay,
          price: data.price,
          content: data.content,
          isAddAdPage: true,
          isModifyPage: true,
          name: data.name,
          uploadImg: img
        });
      } else {
        // 是修改页 是修改需求页
        const data = this.props.modifyDemandData;
        this.setState({
          modifyId: data.modifyId,
          tel: data.tel,
          traffic: data.traffic,
          type: data.type,
          maxArea: data.maxArea,
          exposureHour: data.exposureHour,
          exposureDay: data.exposureDay,
          price: data.price,
          content: data.content,
          name: data.name,
          isModifyPage: true
        });
      }
    } else {
      // 不是修改页
      if (this.props.isAddAdPage) {
        // 添加广告
        this.setState({
          isAddAdPage: true
        });
      }
    }
  }

  // 上传图片
  uploadImgClick() {
    this.refs.uploadImgInput.click();
    let _that = this;
    this.refs.uploadImgInput.onchange = function () {
      let file = this.files[0];

      // 检查上传的图片是否符合格式
      if(file.type.indexOf("jpeg") > -1 || file.type.indexOf("jpg") > -1 || file.type.indexOf("png") > -1) {
        if(file.name.indexOf("JPEG") > -1 || file.name.indexOf("JPG") > -1 || file.name.indexOf("PNG") > -1) {
          warning("上传的图片格式后缀名小写哟~");
          return false;
        }
        let formData = new FormData(document.getElementById("imgFile"));
        formData.append("file", file);
        _that.props.uploadAdImage(formData);
        _that.setState({
          isUploadImg: true
        })
      } else {
        warning("上传的图片格式必须是jpg，jpeg，png其中的一种哟~");
        return false;
      }

    };
  }



  render() {
    return (
      <div
        className={
          this.state.isModifyPage ? "add-demand modify-demand" : "add-demand"
        }
      >
        {this.state.isModifyPage ? (
          ""
        ) : this.state.isAddAdPage ? (
          <h1>添加广告</h1>
        ) : (
          <h1>添加需求</h1>
        )}
        {/*需求名称*/}
        <QueueAnim>
          <div key="a11" className="ad-box">
            <span className="center">名称：</span>
            <Input
              autoFocus={true}
              value={this.state.name}
              onChange={this.nameChange.bind(this)}
              placeholder={this.props.isAddAdPage ? "输入广告名称" : "输入需求名称"}
            />
          </div>
          <div key="an1" className="ad-box">
            <span className="center">联系电话：</span>
            <Input
              value={this.state.tel}
              onChange={this.demandTelChange.bind(this)}
              placeholder="输入联系电话"
            />
          </div>
          {/* 需求地址 */}
          {this.props.isAddAdPage ? (
            <div key="an2" className="ad-box">
              <span className="center">地 址：</span>
              <Input 
              value={this.state.address}
              onChange={this.onAddressChange.bind(this)}
              placeholder="重庆市永川区渝西大道中段**小区**号"
               />
              {/* <Cascader
                onChange={this.onAddressOptionChange.bind(this)}
                value={this.state.address}
                options={options}
                placeholder="选择地址"
              /> */}
            </div>
          ) : (
            ""
          )}
          {/*人流量*/}
          <div key="an3" className="ad-box">
            <span className="center">人 流 量：</span>
            <InputNumber
              value={this.state.traffic}
              onChange={this.onFlowInputChange.bind(this)}
            />
          </div>
          {/*类型*/}
          <div key="an4" className="ad-box">
            <span className="center">类 型：</span>
            <RadioGroup
              onChange={this.onTypeRadioChange}
              value={this.state.type}
            >
              <Radio value={1}>{getTypeValue(1)}</Radio>
              <Radio value={2}>{getTypeValue(2)}</Radio>
              <Radio value={3}>{getTypeValue(3)}</Radio>
              <Radio value={4}>{getTypeValue(4)}</Radio>
              <Radio value={5}>{getTypeValue(5)}</Radio>
              <Radio value={6}>{getTypeValue(6)}</Radio>
            </RadioGroup>
          </div>
          {/*大小*/}
          <div key="an5" className="ad-box">
            <span className="center">大 小：</span>
            <Input
              value={this.state.maxArea}
              onChange={this.onSizeInputChange}
              placeholder="40cm*40cm"
            />
          </div>
          {/*营业时间*/}
          <div key="an6" className="ad-box">
            <span className="center">营业时间：</span>
            <Select
              defaultValue="5"
              onChange={this.onTime1OptionChange.bind(this)}
              value={this.state.exposureDay}
              style={{width: 70}}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
              <Option value="6">6</Option>
              <Option value="7">7</Option>
            </Select>
            <span className="center" style={{fontWeight: 500}}>
              天/周
            </span>
            <Select
              onChange={this.onTime2OptionChange.bind(this)}
              value={this.state.exposureHour}
              style={{width: 70}}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
              <Option value="6">6</Option>
              <Option value="7">7</Option>
              <Option value="8">8</Option>
              <Option value="9">9</Option>
              <Option value="10">10</Option>
              <Option value="11">11</Option>
              <Option value="12">12</Option>
            </Select>
            <span className="center" style={{fontWeight: 500}}>
              时/天
            </span>
          </div>
          {/* 价格 */}
          <div key="an7" className="ad-box">
            <span className="center">价 格：</span>
            <InputNumber
              value={this.state.price}
              formatter={value =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={value => value.replace(/\$\s?|(,*)/g, "")}
              onChange={this.onPriceOptionChange.bind(this)}
            />
            <span> &nbsp; &nbsp; 元</span>
          </div>
          {/* 具体详情 */}
          <div key="an8 " className="ad-box">
            <span className="center">具体详情：</span>
            <TextArea
              onChange={this.detailContentChange.bind(this)}
              value={this.state.content}
              rows={6}
            />
          </div>
          <div key="an19" className="ad-box">
          {this.state.isAddAdPage ?
              <div>
                <span className="center">示例图片：</span>
                <Spin spinning={this.state.isUploadImg} />
                {this.state.uploadImg.map((item, index) => {
                  return (
                    <img
                      style={{width: 100, marginLeft: 10}}
                      key={index}
                      src={ item.indexOf("http://") > -1 ? `${item}` : `http://images.adchina.club/${item}` }
                      alt=""
                    />
                  );
                })}

                {this.state.uploadImg.length >= 5 ? (
                  <Button
                    style={{height: 40, fontSize: 16, marginLeft: 20}}
                    disabled
                    type="primary"
                  >
                    上传图片
                  </Button>
                ) : (
                  <Button
                    style={{height: 40, fontSize: 16, marginLeft: 20}}
                    onClick={() => {
                      this.uploadImgClick();
                    }}
                    type="primary"
                  >
                    上传图片
                  </Button>
                )}
                {
                  this.state.uploadImg.length >= 1 ? 
                  ""
                  :
                  <span style={{marginLeft: 10, fontSize: 14, color: "#f40"}}>建议上传1920*1080 1200*600等高清图片，图片比例尽量2:1</span>
                }
                
                <input
                  ref="uploadImgInput"
                  style={{display: "none"}}
                  type="file"
                  id="imgFile"
                />
              </div>
           :
            ""
          }
          </div>
          <div key="an10" className="add-demand-submit">
            {this.state.isModifyPage ? (
              <Button
                onClick={() => {
                  this.modifyDemand();
                }}
                type="primary"
              >
                保存
              </Button>
            ) : (
              <Button
                onClick={() => {
                  this.submitDemand();
                }}
                type="primary"
              >
                提交
              </Button>
            )}
            <Button
              onClick={() => {
                this.clearAll();
              }}
              type="danger"
            >
              清空
            </Button>
          </div>
        </QueueAnim>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  uploadImgUrl: state.messageReducers.uploadImgUrl,
  spinState: state.mainReducers.spinState
});

const mapDispatchToProps = dispatch => ({
  submitDemandData(state) {
    dispatch(submitDemandAction(state));
  },
  submitModifyDemandData(state) {
    dispatch(modifyDemandAction(state));
  },
  uploadAdImage(formData) {
    dispatch(uploadAdImageAction(formData));
  },
  clearImgUrl() {
    dispatch(clearImageUrlAction());
  },
  openSpinning() {
    dispatch(openSpinningAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDemand);
