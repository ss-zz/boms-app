/**
 * 字典服务
 */
app.service("DicService", function(){
  var nullValue = "";

  // 字典配置
  var GLOBAL_DICSMAP = {
    "STATECODE": {// 状态代码
      "200": "成功",
      "201": "失败",
      "202": "认证失败"
    },
    "ADVERSEREACTIONTYPE": {// 不良反应信息类别
      "00": "其它",
      "01": "发热",
      "02": "过敏",
      "03": "呼吸困难",
      "04": "腹泻",
      "05": "疲劳",
      "---": "待添加"
    },
    "GENDER": {// 性别类型
      "01": "男",
      "02": "女"
    },
    "IDENTTIME": {// 时间标识
      "EIGHTNUM": "8：00-9：00",
      "NINENUM": "9：00-10：00",
      "TENNUM": "10：00-11：00",
      "ELEVENNUM": "11：00-12：00",
      "THIRTEENNUM": "13：00-14：00",
      "FORTEENNUM": "14：00-15：00",
      "FIFTEENNUM": "15：00-16：00",
      "SIXTEENNUM": "16：00-17：00"
    },
    "CHILDSTATE": {// 宝宝年龄状态
      "01": "0-3岁",
      "02": "4-6岁",
      "03": "7-10岁",
      "04": "10岁以上"
    },
    "CHILDRELATION": {// 宝宝关系类别
      "01": "父亲",
      "02": "母亲",
      "03": "爷爷",
      "04": "奶奶",
      "05": "姥爷",
      "06": "姥姥",
      "07": "其他"
    },
    "VISTYPE": {// 就诊方式
      "01": "门诊",
      "02": "住院"
    },
    "ISVAC": {// 是否已接种
      "01": "已接种",
      "02": "未接种"
    },
    "BESPOKESTATE": {// 预约状态
      "01": "未预约",
      "02": "已预约",
      "03": "取消预约"
    },
    "USERNEWSTYPE": {// 用户消息状态
      "01": "未读",
      "02": "已读"
    },
    "MESSAGETYPE": {// 用户消息类型
      "01": "预约消息",
      "02": "接种消息"
    },
    "ADVERSERECTIONTYPE": {// 用户消息类型
      "00": "无异常",
      "01": "发热",
      "02": "过敏",
      "03": "呼吸困难",
      "04": "腹泻",
      "05": "疲劳",
      "06": "红肿",
      "07": "呕吐",
      "08": "化脓",
      "09": "神志不清",
      "---": "待添加"
    },
    "IS_FREE":{//是否免费
      "01": "免费",
      "02": "收费"
    },
    "IS_NECESSARY":{//是否必要
      "01": "必打",
      "02": "非必打"
    },
    "TIME_ZONE":{// 数据测量时段
      "01": "早餐前",
      "02": "早餐后",
      "03": "午餐前",
      "04": "午餐后",
      "05": "晚餐前",
      "06": "晚餐后"
    },
    "TEMPERATURE_PART":{// 体温测量部位
      "01": "腋下",
      "02": "口腔",
      "03": "直肠"
    },
    "TARGET_TYPE":{//健康朝阳指标类型
      "01": "门急诊人次数",
      "02": "预约就诊人次数"
	},
    "USER_AUTH_STATUS":{// 用户认证状态
      "01": "审核成功",
      "02": "审核失败",
      "03": "审核中"
    },
    "QUESTION_TYPE":{//互动大厅问题类型
      "01": "免疫接种",	
      "02": "再生育登记",
      "03": "卫生许可",
      "04": "医师执业",
      "05": "护士执业"
    }
  };

  return {
    // 获取某类型编码列表
    getDicsByType: function(type){
      return GLOBAL_DICSMAP[type];
    },
    // 根据编码获取描述
    getDescByCode: function(type, code){
      if(type === undefined || code === undefined){
        return nullValue;
      }
      var codeMap = GLOBAL_DICSMAP[type];
      return codeMap ? codeMap[code] : nullValue;
    }
  };

});