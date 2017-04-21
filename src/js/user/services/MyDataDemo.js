/**
 * Created by LC on 2017/4/10
 */
//用户信息测试数据
app.service('MyDataDemo',function(){
	return{
		//用户个人信息
		UserInfo:{
			"id": "1",
			"name": "周宁",
			"photo": "",
			"sex": "女",
			"birthday": "1961-03-28",
			"health_archNo": "110102193820480298",
			"phone": "136****8493",
			"domicile_address": "北京市朝阳区八里庄街道",
			"current_address": "北京市朝阳区八里庄街道"
		},
		MyFamily:[
			{
				"id": "1",
				"name": "章田利",
				"photo": "img/mine/family/father.png",
				"phone": "13794829308",
				"relation_ship": "父亲"
			},
			{
				"id": "2",
				"name": "张向丽",
				"photo": "img/mine/family/mother.png",
				"phone": "15193832439",
				"relation_ship": "母亲"
			},
			{
				"id": "3",
				"name": "刘茜茜",
				"photo": "img/mine/family/wife.png",
				"phone": "15372472949",
				"relation_ship": "老婆"
			}
		],
		health_recoder:[

		],
		clinic_recoder:[
		],
		hospital_recoder:[
		],
		text_recoder:[
		],
		physical_recoder:[
		],
		chronic_recoder:[
		]



	};
});