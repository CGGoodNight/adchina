

export const getTypeValue = function(key) {
  switch (key) {
    case 1: {
      return "小摊";
    }
    case 2: {
      return "超市";
    }
    case 3: {
      return "学校社团";
    }
    case 4: {
      return "个体商户";
    }
    case 5: {
      return "企业";
    }
    case 6: {
      return "其他";
    }
  }
};

export const getTypeValueNum = function(key) {
  switch (key) {
    case "小摊": {
      return 1;
    }
    case "超市": {
      return 2;
    }
    case "学校社团": {
      return 3;
    }
    case "个体商户": {
      return 4;
    }
    case "企业": {
      return 5;
    }
    default: {
      return 6;
    }
  }
};