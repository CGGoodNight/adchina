import React from "react";
import "./maindemand.less";
import QueueAnim from 'rc-queue-anim';
import {hashHistory} from "react-router";
import {Spin} from "antd";

const MainDemand = props => {
  if (props.demandList.length === 0) {
    return <div style={{display: "flex", justifyContent: "center"}}><Spin/></div>
  }
  console.log(props.demandList);
  return (
    <div>
      <div className="w clearfix">
        <div id="demandBox" key="0" className="wrapper-home-title clearfix">
          <h2>招标位</h2>
          <a className="more-btn" onClick={() => {
            hashHistory.push("/serach/2")
          }}>更多&gt;</a>
        </div>
        <div className="demand-all-box">
          <ul>
            {
              props.demandList.map((item, index) => {
                return (
                  <li key={index}>
                    <div onClick={() => {
                      hashHistory.push(`/detail/2/${item.info_id}`)
                    }} className="content">
                      <div className="first">
                        <div className="type">
                          <span style={{marginLeft: 0, color: "#f40"}}>￥{item.price}</span>
                          <span>{item.name}</span>
                        </div>
                        <div className="other">
                          <p>类型：{item.type}</p>
                          <p className="fg">丨</p>
                          <p>工作时间：{item.exposureDay} 天/周 {item.exposureHour} 时/天</p>
                        </div>
                      </div>
                      <div className="second">
                        <div className="con">详情：{item.content === "" ? "暂无详情" : item.content}</div>
                        <div className="other">
                          <p>
                            大小：{item.minArea}
                          </p>
                          <p className="fg">丨</p>
                          <p>
                            流量：{item.traffic}
                          </p>
                        </div>
                      </div>
                      <div className="third">
                        <div className="user">
                          发布人：{item.user_name}
                        </div>
                        <div className="other">
                          <p>tel：{item.tel}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })
            }
            <div key="666" className="searchBtn-box">
              <input onClick={() => {
                hashHistory.push("/serach/2")
              }} id="searchBtn" type="button" value="点击查看更多需求->"/>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
};
export default MainDemand;