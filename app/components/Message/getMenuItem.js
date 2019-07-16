export default function getMenuItem(menuObj2, currentPage) {
  let menuObj = menuObj2;
  switch (currentPage) {
    case 1: {
      menuObj.menuOneTitle = "个人信息";
      menuObj.menuOne.push("我的头像");
      menuObj.menuOne.push("账号信息");
      menuObj.menuTwoTitle = "账户信息";
      menuObj.menuTwo.push("提现");
      menuObj.menuThreeTitle = "系统信息";
      menuObj.menuThree.push("系统信息");
      return menuObj;
    }
    case 2: {
      menuObj.menuOneTitle = "我的私信";
      menuObj.menuOne.push("我收到的私信");
      menuObj.menuOne.push("我发送的私信");
      menuObj.menuTwoTitle = "系统消息";
      menuObj.menuTwo.push("系统消息");
      return menuObj;
    }
    case 3: {
      menuObj.menuOneTitle = "我的订单";
      menuObj.menuOne.push("查看订单");
      menuObj.menuTwoTitle = "系统消息";
      menuObj.menuTwo.push("系统消息");
      return menuObj;
    }
    case 4: {
      menuObj.menuOneTitle = "广告位管理";
      menuObj.menuOne.push("添加广告位");
      menuObj.menuOne.push("我的广告位");
      menuObj.menuTwoTitle = "系统消息";
      menuObj.menuTwo.push("系统消息");
      return menuObj;
    }
    case 5: {
      menuObj.menuOneTitle = "需求管理";
      menuObj.menuOne.push("添加需求");
      menuObj.menuOne.push("我的需求");
      menuObj.menuTwoTitle = "系统消息";
      menuObj.menuTwo.push("系统消息");
      return menuObj;
    }
  }
}