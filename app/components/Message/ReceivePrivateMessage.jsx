import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  Comment, Icon, Tooltip, Avatar, PageHeader, Input, Button
} from 'antd';
import {clearRemindAction, getReceivePrivateDetailAction, submitReplyContentAction} from "../../actions/messageActions";
import QueueAnim from 'rc-queue-anim';
import "./ReceivePrivateMessage.less";
import {getRemainderTime} from "./getRemainderTime";

const {TextArea} = Input;

class ReceivePrivateMessage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEditor: false,
      apply_id: "",
      accept_id: "",
      replyContent: ""
    }
  }

  componentDidMount() {
    this.props.clearRemind();
    this.props.parentProps.ReceivePrivateMessageHandle();
  }

  sendLetter(apply_id, accept_id) {
    this.props.getPrivateLetterDetail(apply_id);
    this.setState({
      isEditor: !this.state.isEditor,
      apply_id,
      accept_id,
    });

  }

  replyContentChange = (e) => {
    this.setState({
      replyContent: e.target.value
    })
  };

  sendBack() {
    this.setState({
      isEditor: !this.state.isEditor
    });
  }

  render() {
    return (
      <div className="right-box-content">
        {this.state.isEditor ?
          <PageHeader
            style={{marginLeft: 100}}
            onBack={() => this.sendBack()}
            title="返回"
          />
          :
          <h1>收到的私信</h1>

        }

        {this.state.isEditor ?
          <QueueAnim
            style={{width: "100%"}}
          >
            <div key="num1" className="letter-send-to">
              <div>私信给：<a> {this.props.receivePrivateDetailData.length === 0 ? "" : this.props.receivePrivateDetailData[0].name}</a></div>
              <TextArea rows={6} onChange={this.replyContentChange} value={this.state.replyContent}/>
              <div className="send-btn">
                <Button
                  onClick={() => {
                    this.props.submitReplyContent(this.state.apply_id, this.state.replyContent)
                  }}
                  type="danger"
                >
                  <span className="iconfont icon-fasong"></span>
                  &nbsp; 发送
                </Button>
              </div>
              <div className="bd">
                <QueueAnim
                  style={{width: "100%"}}
                >
                  {this.props.receivePrivateDetailData.map((item, index) => {

                    let releaseStr = "";
                    let date = getRemainderTime(item.pubtime);
                    // 判断返回的字符串
                    if (date.year > 0) {
                      releaseStr = date.year + "年前";
                    } else if (date.month > 0) {
                      releaseStr = date.month + "月前";
                    } else if (date.day > 0) {
                      releaseStr = date.day + "天前";
                    } else if (date.hour > 0) {
                      releaseStr = date.hour + "小时前";
                    } else if (date.minute > 0) {
                      releaseStr = date.minute + "分钟前";
                    } else if (date.second > 0 && date.second < 10) {
                      releaseStr = "几秒前";
                    } else if (date.second >= 10) {
                      releaseStr = date.second + "秒前";
                    }
                    return (
                      <Comment
                        author={<a>{item.name}</a>}
                        style={{width: "100%", borderBottom: "1px solid #ccc", padding: "20px 0"}}
                        key={index}
                        avatar={(
                          <Avatar
                            src={`http://images.adchina.club/${item.avatar}`}
                          />
                        )}
                        content={(
                          <p>{item.content}</p>
                        )}
                        datetime={(
                          <Tooltip title={item.pubtime}>
                            <span>{releaseStr}</span>
                          </Tooltip>
                        )}
                      />
                    )
                  })}
                </QueueAnim>
              </div>
            </div>
          </QueueAnim>
          :

          <div className="bd">
            <QueueAnim
              style={{width: "100%", marginLeft: 100}}
            >
              {this.props.receivePrivateData.map((item, index) => {

                let releaseStr = "";
                let date = getRemainderTime(item.pubtime);
                // 判断返回的字符串
                if (date.year > 0) {
                  releaseStr = date.year + "年前";
                } else if (date.month > 0) {
                  releaseStr = date.month + "月前";
                } else if (date.day > 0) {
                  releaseStr = date.day + "天前";
                } else if (date.hour > 0) {
                  releaseStr = date.hour + "小时前";
                } else if (date.minute > 0) {
                  releaseStr = date.minute + "分钟前";
                } else if (date.second > 0 && date.second < 10) {
                  releaseStr = "几秒前";
                } else if (date.second >= 10) {
                  releaseStr = date.second + "秒前";
                }
                return (
                  <Comment
                    style={{width: "80%", borderBottom: "1px solid #ccc", padding: "20px 0"}}
                    key={index}
                    author={<a>{item.name}</a>}
                    actions={[<span onClick={() => this.sendLetter(item.apply_id, item.accept_id)}>回复私信</span>]}
                    avatar={(
                      <Avatar
                        src={`http://images.adchina.club/${item.avatar}`}
                      />
                    )}
                    content={(
                      <p>{item.content}</p>
                    )}
                    datetime={(
                      <Tooltip title={item.pubtime}>
                        <span>{releaseStr}</span>
                      </Tooltip>
                    )}
                  />
                )
              })}
            </QueueAnim>
          </div>

        }

      </div>
    )
  }
}

const mapStateToProps = state => ({
  receivePrivateData: state.messageReducers.receivePrivateData,
  receivePrivateDetailData: state.messageReducers.receivePrivateDetailData
});

const mapDispatchToProps = (dispatch) => ({
  getPrivateLetterDetail(apply_id) {
    dispatch(getReceivePrivateDetailAction(apply_id));
  },
  submitReplyContent(other_id, replyContent) {
    dispatch(submitReplyContentAction(other_id, replyContent));
  },
  clearRemind() {
    dispatch(clearRemindAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReceivePrivateMessage);