import React from "react";
import {Divider, Tooltip, Button, Empty} from "antd";
import "./detailcontent.less";
import {getFlowValue, getSizeValue} from "../Message/getDetailItem";
import QueueAnim from 'rc-queue-anim';
import BannerAnim, {Element} from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';

const BgElement = Element.BgElement;

const DetailContent = props => {
  let displayData;
  if (props.page === 1) {
    // 广告详情页
    displayData = props.adDetail;
  } else if (props.page === 2) {
    // 需求详情页
    displayData = props.demandDetail;
  }
  return (
    <div>
      <div className="w">
        <div key={0} className="detail-name">
          <h1>
            {displayData.name}
          </h1>
        </div>
        <div key={1} className="detail-content">
          <h3>{displayData.content}</h3>
        </div>
        <div className="detail-content-box detail">
          <div className="my-demand-content-box clearfix">
            {
              props.page === 2 ?
                ""
                :
                <div>
                  {
                    displayData.images.length === 0 ?
                      <div style={{margin: "50px 0 50px -200px"}}>
                        <Empty description="暂无展示图片"/>
                      </div>
                      :
                      <QueueAnim
                        type="left"
                        delay={200}
                      >
                        <div key={0} className="display-img">
                          <BannerAnim prefixCls="banner-user">
                            {
                              displayData.images.map((item, index) => {
                                return (
                                  <Element
                                    prefixCls="banner-user-elem"
                                    key={index}
                                  >
                                    <BgElement
                                      onClick={() => {
                                        window.open(`http://images.adchina.club/${item.image}`)
                                      }}
                                      key="bg"
                                      className="bg"
                                      style={{
                                        backgroundImage: `url(http://images.adchina.club/${item.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        height: '100%',
                                      }}
                                    />
                                  </Element>
                                )
                              })
                            }
                          </BannerAnim>
                        </div>
                      </QueueAnim>
                  }
                </div>

            }
            <div className="detail-container">
              <QueueAnim>
                <div key={0} className="detail-container-item">
                  <h3>作者：</h3>
                  <p>{displayData.user_name}</p>
                </div>

                <div key={1} className="detail-container-item">
                  <h3>编号：</h3>
                  <p>{displayData.info_id}</p>
                </div>
                {
                  props.page === 1 ?
                    <div key={2} className="detail-container-item">
                      <h3>地址：</h3>
                      <p>{displayData.address}</p>
                    </div>
                    :
                    ""
                }
                <div key={3} className="detail-container-item">
                  <h3>类型：</h3>
                  <p>{displayData.type}</p>
                </div>
                <div key={4} className="detail-container-item">
                  <h3>大小：</h3>
                  {
                    props.page === 1 ?
                      <p>{displayData.maxArea}</p>
                      :
                      <p>{displayData.minArea}</p>
                  }

                </div>
                <div key={5} className="detail-container-item">
                  <h3>价格：</h3>
                  <p>{displayData.price}</p>
                </div>
                <div key={6} className="detail-container-item">
                  <h3>流量：</h3>
                  <p>{displayData.traffic}</p>
                </div>
                <div key={7} className="detail-container-item">
                  <h3>时间：</h3>
                  <p>{displayData.exposureDay} 天/周 {displayData.exposureHour} 时/天</p>
                </div>
              </QueueAnim>
            </div>
          </div>
          <QueueAnim
            type="right"
            delay={800}
          >
            <div key="9" className="detail-lianxi">
              {
                props.page === 2 ?
                  ""
                  :
                  <Button
                    key={0}
                    disabled={displayData.status === "已交易" ? true : false}
                    onClick={() => {
                      props.wantBtnOnClick(2)
                    }} type="primary">
                    <input style={{display: "none"}} type="file" name="wantBtnInput" id="wantBtnInput"/>
                    <span className="iconfont icon-lianxiwomen1"></span>
                    购买广告
                  </Button>
              }

              <Button key={1} onClick={props.showLetterModal} type="primary">
                <span className="iconfont icon-lianxi"></span>
                发送私信
              </Button>
            </div>
          </QueueAnim>
        </div>
      </div>
    </div>
  )
};
export default DetailContent;