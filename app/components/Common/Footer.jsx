import React from "react";
import "./footer.less";

const Footer = props => {
  return(
    <div className="footer clearfix">
      <div className="w">
      <div className="container">
        <div className="footer-links fl">
          <span className="line"></span>
        </div>
        <div className="footer-text fl">
          <p><a href="http://www.beian.miit.gov.cn" target="_blank">渝ICP备18005245号-3</a></p>
        </div>

        <div className="footer-links fr">
          <span className="line"></span>
        </div>
        <div style={{clear:"both"}}></div>
      </div>
      </div>
    </div>
  )
};
export default Footer;