import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Collapse, Button, Input, PageHeader} from "antd";
import {hashHistory} from "react-router";
import {getMyDemandAction, getMyAddAction, CrossIdGetAdAction, CrossIdGetDemandAction, deleteDemandAction, deleteAdAction} from "../../actions/messageActions";
import {getTypeValueNum} from "./getDetailItem";
import AddDemand from "./AddDemand";
import QueueAnim from 'rc-queue-anim';
import "./mydemand.less";

const Search = Input.Search;
const Panel = Collapse.Panel;

class MyDemand extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isAddAdPage: false,
      isEditor: false,
      modifyId: 1,
      tel: 1,
      address: "",
      traffic: 1,
      type: 1,
      maxArea: "",
      exposureHour: 8,
      exposureDay: 5,
      price: 1,
      content: "",
      name: "",
      images: []
    }
  }

  componentDidMount() {
    if(this.props.isAddAdPage) {
      // 得到广告位的数据
      this.setState({
        isAddAdPage: true
      });
      this.props.getMyAddData(this.props.mailAddress);
    } else {
      this.props.getMyDemandData(this.props.mailAddress);
    }
  }

  modifyDemand(name, info_id, tel, address, traffic, type, maxArea, exposureDay, exposureHour, price, content, images) {
    type = getTypeValueNum(type);
    this.setState({
      isEditor: true,
      modifyId: info_id,
      name,
      tel,
      address,
      traffic,
      type,
      maxArea,
      exposureDay,
      exposureHour,
      price,
      content,
      images
    })
  }

  cancelEditor() {
    this.setState({
      isEditor: false
    });
    // 返回后重新获取一次数据
    if(this.props.isAddAdPage) {
      // 得到广告位的数据
      this.setState({
        isAddAdPage: true
      });
      this.props.getMyAddData(this.props.mailAddress);
    } else {
      this.props.getMyDemandData(this.props.mailAddress);
    }
  }

  render() {
    let disPlaydata = [];
    if(this.state.isAddAdPage) {
      disPlaydata = this.props.myAdd;
    }else {
      disPlaydata = this.props.myDemand;
    }
    return (
      <div className="my-demand">
        {
          this.state.isEditor ?
            this.state.isAddAdPage ?
              <div>
                <PageHeader
                  onBack={() => this.cancelEditor()}
                  title="返回"
                />
                <h1>修改广告</h1>
              </div>
              :
              <div>
                <PageHeader
                  onBack={() => this.cancelEditor()}
                  title="返回"
                />
                <h1>修改需求</h1>
              </div>
               :
            this.state.isAddAdPage ?
              <div>
                <h1>我的广告</h1>
                <Search
                  placeholder="输入id搜索广告"
                  onSearch={value => this.props.CrossIdGetAd(value)}
                  style={{ width: 200 }}
                />
              </div>
                :
              <div>
                <h1>我的需求</h1>
                <Search
                  placeholder="输入id搜索需求"
                  onSearch={value => this.props.CrossIdGetDemand(value)}
                  style={{ width: 200 }}
                />
              </div>
        }

        {
          this.state.isEditor ?
            this.state.isAddAdPage ?
              <AddDemand isModifyPage = {true} isAddAdPage={true} modifyDemandData={this.state} />
                :
              <AddDemand isModifyPage = {true} isAddAdPage={false} modifyDemandData={this.state} />
              :
              <QueueAnim>
            {disPlaydata.map((item, index) => {
              return (
                <Collapse key={index} style={{width: "656px", fontSize: 16}} bordered={false} accordion>
                  <Panel header={item.name} key="1">
                    <div className="my-demand-content-box">
                      <div className="item">
                        <p>名 称：</p>
                        <p><strong>{item.name}</strong></p>
                      </div>
                      <div className="item">
                        <p>id：</p>
                        <p><strong>{item.info_id}</strong></p>
                      </div>
                    <div className="item">
                      <p>联系电话：</p>
                      <p><strong>{item.tel}</strong></p>
                    </div>
                    {
                      // 广告页有地址  需求页没地址
                      this.state.isAddAdPage ?
                        <div className="item">
                          <p>地址：</p>
                          <p><strong>{item.address}</strong></p>
                        </div>
                        :
                        ""
                    }
                    <div className="item">
                      <p>人流量：</p>
                      <p><strong>{item.traffic}</strong></p>
                    </div>
                      <div className="item">
                        <p>类 型：</p>
                        <p><strong>{item.type}</strong></p>
                      </div>
                      <div className="item">
                        <p>大 小：</p>
                        <p><strong>{this.state.isAddAdPage ? item.maxArea : item.minArea}</strong></p>
                      </div>
                      <div className="item">
                        <p>营业时间：</p>
                        <p><strong>{item.exposureDay} 天/周 <span style={{marginLeft: 20}}></span> {item.exposureHour} 时/天</strong></p>
                      </div>
                      <div className="item">
                        <p>价 格：</p>
                        <p><strong>{item.price}</strong></p>
                      </div>
                      <div className="item">
                        <p>详 情：</p>
                        <p><strong>{item.detailContent === "" ? "暂无详情": item.content}</strong></p>
                      </div>
                      {this.state.isAddAdPage ?
                        <div className="item">
                          <p>展示图片：</p>
                          <div className="display-img">
                            {item.images.length === 0 ? <p>无</p> : ""}
                            {
                              item.images.map((data, num) => {
                              return(
                                <img key={num} src={`http://images.adchina.club/${data.image}`}/>
                              )
                            })}
                          </div>
                        </div>
                        :
                        ""
                      }
                      <div className="modify-delete-demand">
                        {this.state.isAddAdPage ?
                          <div>
                            <Button
                              onClick={() => {
                                this.modifyDemand(
                                  item.name,
                                  item.info_id,
                                  item.tel,
                                  item.address,
                                  item.traffic,
                                  item.type,
                                  item.maxArea,
                                  item.exposureDay,
                                  item.exposureHour,
                                  item.price,
                                  item.content,
                                  item.images
                                )}
                              }
                              type="primary">编辑
                            </Button>
                            <Button onClick={() => {hashHistory.push(`/detail/1/${item.info_id}`)}} type="primary">跳转详情页</Button>
                            <Button onClick={() => {this.props.deleteAd(item.info_id)}} type="danger">删除</Button>
                          </div>
                          :
                          <div>
                            <Button
                              onClick={() => {
                                this.modifyDemand(
                                  item.name,
                                  item.info_id,
                                  item.tel,
                                  item.address,
                                  item.traffic,
                                  item.type,
                                  item.minArea,
                                  item.exposureDay,
                                  item.exposureHour,
                                  item.price,
                                  item.content
                                )}
                              }
                              type="primary">编辑
                            </Button>
                            <Button onClick={() => {hashHistory.push(`/detail/2/${item.info_id}`)}} type="primary">跳转详情页</Button>
                            <Button onClick={() => {this.props.deleteDemand(item.info_id)}} type="danger">删除</Button>
                          </div>
                        }
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              )
            })
          }
            </QueueAnim>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  mailAddress: state.loginReducers.mailAddress,
  myDemand: state.messageReducers.myDemand,
  myAdd: state.messageReducers.myAdd
});

const mapDispatchToProps = (dispatch) => ({
  getMyDemandData(user) {
    dispatch(getMyDemandAction(user));
  },
  getMyAddData(user) {
    dispatch(getMyAddAction(user));
  },
  CrossIdGetAd(id) {
    dispatch(CrossIdGetAdAction(id));
  },
  CrossIdGetDemand(id) {
    dispatch(CrossIdGetDemandAction(id));
  },
  deleteDemand(id) {
    dispatch(deleteDemandAction(id));
  },
  deleteAd(id) {
    dispatch(deleteAdAction(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyDemand);