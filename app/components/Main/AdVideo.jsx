import React from "react";
import "./advideo.less";
const AdVideo = props => {
  console.log(props.videoList);
  return(
    <div>
      <div className="w">
        <div className="wrapper-home-title clearfix">
          <h2>AdChina 介绍</h2>
          {/*<a className="more-btn" href="#">更多&gt;</a>*/}
        </div>
        <div className="video-box">
          {
            props.videoList.map((item, index) => {
              return(
                <div key={index} onClick={() => {props.jumpToVideoDetail(item.id)}} className="video-box-item">
                  <img src={item.imgUrl} alt=""/>
                  <div className="video-box-item-title">
                    <h3>{item.title}</h3>
                  </div>
                </div>
              )
            })
          }
        </div>

      </div>
    </div>
  )
};
export default AdVideo;