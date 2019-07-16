import React from "react";
import "./msgrightboxcontent.less";
import getContent from "./getContent";

const MsgRightBoxContent = props => {
  return(
    <div>
      {getContent(props.currentPage, props.pageKey, props)}
    </div>
  )
};
export default MsgRightBoxContent;