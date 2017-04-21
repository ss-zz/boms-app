// 本地sqlite数据库初始化脚本
app.service('SqlInit', function(){

	return {
		// 数据库名-若想修改表字段，需要修改数据库名，否则字段不会更新
		dbname: 'health_app_main2.db',
		sqls: [
		//持久化存储数据表，key-唯一标识，value-存储内容，user_id-登录用户唯一标识
		"CREATE TABLE IF NOT EXISTS spedata (key, value, user_id);",

		// 列表查询-列表数据本地存储
		// id-数据主键，item-数据内容，order_time-排序时间，module-模块
		"CREATE TABLE IF NOT EXISTS listdata_local (id, item, order_time, module, user_id);",
		// 列表查询-上次更新时间本地存储
		// module-模块，last_time上次获取时间
		"CREATE TABLE IF NOT EXISTS listdata_lasttime_local (module, last_time, user_id);",


		// 健康日历-健康数据
		// module-模块：pressure-血压、bloodsugar-血糖、weight-体重、sleep-睡眠、drug-服药、temperature-体温
		// systolic_pressure 收缩压-血压
		// diastolic_pressure 舒张压-血压
		// rhythm 心律-血压
		// time_zone 时间段-血糖
		// sleep_time 入睡时间-睡眠
		// wake_time 醒来时间-睡眠
		// total 睡眠时长-睡眠
		// drug_name 药物名称-服药
		// use_way 服用方式-服药
		// use_time 服用说明-服药
		// use_amount 服用剂量-服药
		// part 测量部位-体温
		// user_flag 用户标识
		// status 数据状态：01-正常、02-异常
		"CREATE TABLE IF NOT EXISTS health_cal_data (id, module, value, in_date, systolic_pressure, diastolic_pressure, rhythm, time_zone, sleep_time, wake_time, total, drug_name, use_way, use_time, use_amount, part, user_flag, status);",

		]};

})

;