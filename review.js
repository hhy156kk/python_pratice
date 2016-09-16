var handlerUtil = {
	addListener : function(elem,type,fn){
		if(elem.addEventListener){
			elem.addEventListener(type,fn);
		}else if(elem.attchEvent){
			elem.addEventListener('on'+type,fn,false)
		}else{
			elem['on'+type]=fn;
		}
	},
	getMonth : function(time){
		var newDay = new Date(time);
		return newDay.getMonth()+1;
	},
	getDay : function(time){
	  var newDay = new Date(time);
	  return newDay.getDay();
	}
}
// 模拟数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(350),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(450),
  "厦门": randomBuildData(280),
  "沈阳": randomBuildData(500),
  "绵阳": randomBuildData(400),
  "重庆": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
	var city = document.querySelector("#city-select"),
			showdata = document.querySelector(".aqi-chart-wrap"),
			data = chartData[pageState.nowGraTime],
      title = "";
      showdata.innerHTML = "";
		for(var i=0;i<data.length;i++){
			var adata = document.createElement("div");
			adata.className = "show-data";
			adata.style.height = Math.ceil((data[i].value/500)*100) + "%";
			adata.style.width = 100/data.length+"%";
      if(pageState.nowGraTime =="day"){
        title = data[i].key+":污染指数"+data[i].value;
      }else if(pageState.nowGraTime == "week"){
        title=data[i].key+":共"+data[i].number+"天-"+"平均污染指数:"+data[i].value;
      }else{
        title =data[i].key+":共"+data[i].number+"天-"+"平均污染指数:"+data[i].value;
      }
      adata.setAttribute("title",title)
      showdata.appendChild(adata);
		}
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
	
  // 确定是否选项发生了变化 
		var value = this.value;
		if(value!=pageState.nowGraTime){
			pageState.nowGraTime = value;
			initAqiChartData();
			renderChart();
		}
  // 设置对应数据
  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
		var value = this.value;
		if(value != pageState.nowSelectCity){
			pageState.nowSelectCity = value;
			initAqiChartData();
			renderChart();
		}
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var input = document.getElementsByTagName("input");
	for(var i in input){
	  handlerUtil.addListener(input[i],"click",graTimeChange)
	}
}
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
	var select = document.querySelector("#city-select");
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	for(var i in aqiSourceData){
		var option = document.createElement("option");
		option.innerText=i;
		select.appendChild(option);
	}
	handlerUtil.addListener(select,"click",citySelectChange);
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
/*
在chartData对象中增加一个以当前选中时间节点为名的空数组。用来该城市的
以day。week month 分类的数据。。。
*/
  chartData[pageState.nowGraTime] = [];
  var adata = {},adataTotal = 0,flag = 0;
  if(pageState.nowGraTime == "day"){
/*
	变量adata以key 和 value的形式存储一天的数据。
*/
    for(var i in aqiSourceData[pageState.nowSelectCity]){
      adata["key"]=i;
      adata["value"]= aqiSourceData[pageState.nowSelectCity][i];
      chartData[pageState.nowGraTime].push(adata);
      adata={};
    }
    /*
			当前选中项为week的时候。初始化当前城市的周的数据。。
    */
}else if(pageState.nowGraTime == "week"){
	/*
		变量adata用来存储一个断点周的数据。。。
		adataTotal用来将每个断点周的所有数据汇总，
		flag用来判断在一个断点周的循环中，到底进行了几次数据的更新，
		这样flag变量可以直接作为当前周的天数，也正好匹配不是刚好满一周的情况。
	*/
  for(var j in aqiSourceData[pageState.nowSelectCity]){
    var weekFlag = handlerUtil.getDay(j);
    adata["key"] = "";
    adataTotal += aqiSourceData[pageState.nowSelectCity][j];
    /*如果这两个参数都为0的话，表示刚开始进入断点。或者已经完成
    一个断点的循环。这样是为了匹配当前时间的开始周不为周一的情况。
    */
    if(weekFlag == 0 || flag == 0){
    	 var time = j;
    }
/*
	如果weekFlag的值为6，表示为一个星期的断点。在这个断点的时候将
	aWeek的数据push到chartData的名为当前选中的城市名的数组内。。。
*/   
    flag++;
    if(weekFlag == 6){
    	time = time+"至"+j;
      adata["key"]=time;
      adata["value"]= Math.ceil(adataTotal/flag);
      adata["number"] = flag;
      chartData[pageState.nowGraTime].push(adata);
      adataTotal = 0;
      flag = 0;
      adata = {};
    }
  }
  /** 如果for语句运行完成后，adataTotal的值没有被重置为0，
  		表示后面还有未到一周的数据没有push进数组。。
**/
  if(adataTotal != 0){
    adata["key"]=time+"至"+j;
    adata["value"]= Math.ceil(adataTotal/flag);
    adata["number"] = flag;
    chartData[pageState.nowGraTime].push(adata);
    }
}else{
	   // var aMonth = {},aMonthTotal = 0,flag = 0;
  for(var k in aqiSourceData[pageState.nowSelectCity]){
  		var monthFlag = handlerUtil.getMonth(k),
  				nowData = new Date(k),
  				nextData = nowData.setDate(nowData.getDate()+1),
  				nextTime = handlerUtil.getMonth(nextData);
  		adataTotal += aqiSourceData[pageState.nowSelectCity][k];
  		flag++;
  			if(nextTime != monthFlag){
		      adata["key"]=monthFlag+"月";
		      adata["value"]= Math.ceil(adataTotal/flag);
		      adata["number"] = flag;
		      chartData[pageState.nowGraTime].push(adata);
		      adataTotal = 0;
		      flag = 0;
		      adata = {};
  			}
  	}
  }
}
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();