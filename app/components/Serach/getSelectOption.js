export const getSelectOptions = function (isAdPage) {
  let optionArr;
  if(isAdPage) {
    // 返回广告选项卡
    return optionArr = [
      {
        id: 1,
        title: "类型",
        options: [
          "小摊", "超市", "学校社团", "个体商户", "企业", "其他"
        ]
      },
      {
        id: 2,
        title: "人流量",
        options: [
          "100", "200", "400", "1000", "2000", "5000"
        ]
      },
      {
        id: 3,
        title: "最低价",
        options: [
          "100", "500", "2000", "5000", "20000", "50000"
        ]
      },
      {
        id: 4,
        title: "最高价",
        options: [
          "500", "2000", "5000", "20000", "50000", "100000"
        ]
      },
      {
        id: 5,
        title: "地址",
        options: [
          "重庆", "四川", "北京", "浙江", "江苏", "广东", "上海"
        ]
      }
    ]
  } else {
    // 返回需求选项卡
    return optionArr = [
      {
        id: 1,
        title: "类型",
        options: [
          "小摊", "超市", "学校社团", "个体商户", "企业", "其他"
        ]
      },
      {
        id: 2,
        title: "人流量",
        options: [
          "100", "200", "400", "1000", "2000", "5000"
        ]
      },
      {
        id: 3,
        title: "最低价",
        options: [
          "100", "500", "2000", "5000", "20000", "50000"
        ]
      },
      {
        id: 4,
        title: "最高价",
        options: [
          "500", "2000", "5000", "20000", "50000", "100000"
        ]
      }
    ]
  }
};