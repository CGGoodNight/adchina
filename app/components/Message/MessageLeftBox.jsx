import React from "react";
import {Menu, Affix} from 'antd';
import "./messageleftbox.less";
import getMenuItem from "./getMenuItem";
import QueueAnim from 'rc-queue-anim';
const SubMenu = Menu.SubMenu;


const MessageLeftBox = props => {

  const menuObj = {
    menuOneTitle: "",
    menuTwoTitle: "",
    menuThreeTitle: "",
    menuOne: [],
    menuTwo: [],
    menuThree: []
  };

  getMenuItem(menuObj, parseInt(props.currentPage));

  return (
    <Affix offsetTop={120}>
      <div className="message-left-box">
        <div className="title">
          <em></em>
          <h4>个人中心</h4>
        </div>
        <QueueAnim
          type="left"
        >
          <div key="key1" className="message-left-box-content">
            <Menu
              onClick={props.getLeftBoxClick}
              style={{width: 256}}
              selectedKeys = {[`${props.pageKey}`]}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={['sub1', 'sub2', 'sub3']}
              mode="inline"
            >
              { menuObj.menuOne.length === 0 ? "" :
                <SubMenu key="sub1" title={<span style={{fontSize: 16, color: '#000'}}>{menuObj.menuOneTitle}</span>}>
                  {
                    menuObj.menuOne.map((item, index) => {
                      return(
                        <Menu.Item className="menu-item" key={index +　1}>{item}</Menu.Item>
                      )
                    })
                  }
                </SubMenu>
              }
              { menuObj.menuTwo.length === 0 ? "" :
                <SubMenu key="sub2" title={<span style={{fontSize: 16, color: '#000'}}>{menuObj.menuTwoTitle}</span>}>
                  {
                    menuObj.menuTwo.map((item, index) => {
                      return(
                        <Menu.Item className="menu-item" key={ menuObj.menuOne.length +　1}>{item}</Menu.Item>
                      )
                    })
                  }
                </SubMenu>
              }
              { menuObj.menuThree.length === 0 ? "" :
                <SubMenu key="sub3" title={<span style={{fontSize: 16, color: '#000'}}>{menuObj.menuThreeTitle}</span>}>
                  {
                    menuObj.menuThree.map((item, index) => {
                      return(
                        <Menu.Item className="menu-item" key={menuObj.menuOne.length + menuObj.menuTwo.length +　1}>{item}</Menu.Item>
                      )
                    })
                  }
                </SubMenu>
              }
            </Menu>
          </div>
        </QueueAnim>
      </div>
    </Affix>
  )
};
export default MessageLeftBox;