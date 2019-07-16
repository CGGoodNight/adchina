import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Spin, Divider, PageHeader} from "antd";
import {getSystemInfoAction} from "../../actions/messageActions";
import "./systeminfo.less";


class SystemInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDetailInfo: false
    }
  }

  componentDidMount() {
    this.props.getSystemInfo(false, "");
  }

  turnToDetail(id) {
    this.props.getSystemInfo(true, id);
    this.setState({
      isDetailInfo: true
    })
  }

  render() {
    if (this.props.systemInfo.length === 0) {
      return <div style={{display: "flex", justifyContent: "center"}}>
        <Spin size="large"/>
      </div>
    }
    return (
      <div className="system-info-box">
        {
          this.state.isDetailInfo ?
            <PageHeader
              onBack={() => {
                this.props.getSystemInfo(false, "");
                this.setState({isDetailInfo: false})}
              }
              title="返回系统信息"
            />
            :
            ""
        }
        {
          this.state.isDetailInfo ?

            <div className="system-info-detail">
              <div className="detail-title">
                {this.props.systemInfo[0].title}
              </div>
              <div className="detail-time">
                <span>发布时间：{this.props.systemInfo[0].pubtime.substring(0, 10)}</span>
                <span style={{marginLeft: 10}}>作者：{this.props.systemInfo[0].pubpeople}</span>
              </div>
              <div className="detail-desc">
                <p><strong>简介：</strong>{this.props.systemInfo[0].description}</p>
              </div>

              <Divider>正文内容</Divider>
              <div className="detail-content" dangerouslySetInnerHTML={{__html: this.props.systemInfo[0].content}}></div>
            </div>
            :
            this.props.systemInfo.map((item, index) => {
              return (
                <div key={index} className="system-info-item">
                  <div className="system-info-header">
                    <p>{item.title}</p>
                  </div>
                  <div className="system-info-content">
                    <div style={{padding: 20}}>
                      <p>简介：<strong>{item.description}</strong></p>
                      <p>发布时间：<strong>{item.pubtime}</strong></p>
                    </div>
                  </div>
                  <div className="system-info-footer">
                    <p>
                      发布人: <strong>{item.pubpeople}</strong>
                    </p>
                    <p className="look-detail">
                      <a onClick={() => {this.turnToDetail(item.id)}}>点击查看详情</a>
                    </p>
                  </div>
                </div>
              )
            })
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  systemInfo: state.messageReducers.systemInfo
});

const mapDispatchToProps = (dispatch) => ({
  getSystemInfo(isSearch, value) {
    dispatch(getSystemInfoAction(isSearch, value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SystemInfo);