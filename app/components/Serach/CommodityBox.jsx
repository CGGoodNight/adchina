import React from "react";
import './commoditybox.less';
import {hashHistory} from "react-router";
import {Pagination, Empty} from 'antd';

function isInteger(obj) {
  return obj%1 === 0
}

const CommodityBox = props => {
  if (props.searchPageDisplayData.length === 0) {
    return <div style={{marginTop: 50}}><Empty description="暂无搜索内容"/></div>
  }
  if(!props.searchPageDisplayData[0].images && props.isSearchAdPage === true) {
    return <div style={{marginTop: 50}}><Empty description="暂无搜索内容"/></div>
  }
  return (
    <div>
      {props.isSearchAdPage ?
        <div className="w comm-flex">
          <div className="commodity-box">
            {props.searchPageDisplayData.map((item, index) => {
              return (
                <div key={index} className={isInteger(index/4) ? "commodity-box-item fir" : "commodity-box-item"}>
                  <div onClick={() => {hashHistory.push(`/detail/1/${item.info_id}`)}} className="commodity-img-box">
                    {
                      item.images[0] ?
                        <img style={{width: "100%", height: "100%"}} src={`http://images.adchina.club/${item.images[0].image}`} alt=""/>
                        :
                        ""
                    }
                  </div>
                  <div className="price">
                    <span className="iconfont icon-renminbi"></span>
                    <span>{item.price}</span>
                  </div>
                  <div className="commodity-title">
                    {
                      props.isSearchAdPage ?
                        <p><a onClick={() => {
                          hashHistory.push(`/detail/1/${item.info_id}`)
                        }}>{item.content}</a></p>
                        :
                        <p><a onClick={() => {
                          hashHistory.push(`/detail/2/${item.info_id}`)
                        }}>{item.content}</a></p>
                    }

                  </div>
                  <div className="commodity-address">
                    <span className="iconfont icon-icon-"></span>
                    &nbsp;{item.address}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="comm-flex-pag">
            <Pagination 
             showQuickJumper
             onChange={props.onPageChange} 
             defaultPageSize={12} 
             defaultCurrent={1} 
             total={props.allSearchPageDisplayData.length}
             />
          </div>
        </div>
        :
        <div className="w">
          <div className="demand-all-box">
            <ul>
              {
                props.searchPageDisplayData.map((item, index) => {
                  return(
                    <li key={index}>
                      <div onClick={() => {hashHistory.push(`/detail/2/${item.info_id}`)}} className="content">
                        <div className="first">
                          <div className="type">
                            <span style={{marginLeft: 0, color: "#f40"}}>￥{item.price}</span>
                            <span>{item.name}</span>
                          </div>
                          <div className="other">
                            <p>类型：{item.type}</p>
                            <p className="fg">丨</p>
                            <p>工作时间：{item.exposureDay} 天/周 {item.exposureHour}时/天</p>
                          </div>
                        </div>
                        <div className="second">
                          <div className="con">详情：{item.content === "" ? "暂无详情" : item.content }</div>
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
            </ul>
          </div>
        </div>
      }
    </div>
  )
};
export default CommodityBox;
