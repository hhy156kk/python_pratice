/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
var EventUtil = {
  addHandler:function(element,type,handler){
    if(element.addEventListener){
      element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
      element.attachEvent("on" + type,handler);
    }else{
      element["on"+type] = handler;
    }
  }
}

// 以下两个函数用于随机模拟生成测试数据
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
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
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
  if(pageState.nowSelectCity == -1){
    return;
  }

  var result = "";
  var tablediv = document.querySelector(".aqi-chart-wrap");
  var length = 0;
  var color = ["red","orange","yellow","green","black","blue","grey"];
  var data = {};
  var sum = 0,num = 0,week = 0;
  var sumMonth1 = 0;sumMonth2 = 0;sumMonth3 = 0;
  if(pageState.nowGraTime == "day"){
    chartData = aqiSourceData[pageState.nowSelectCity];
    for(var x in chartData){
       result += "<div title='"+x.toString()+":"+chartData[x].toString()+"' "+"style='height:"+chartData[x].toString()+"px;width:10px;position:absolute;bottom:0px;left:"+length*10+"px;background:"+color[length%7]+";'></div>"; 
       length++;
    }

    tablediv.innerHTML = result;
    chartData = {};
    length= 0;
  }
  else if(pageState.nowGraTime == "week"){
    data = aqiSourceData[pageState.nowSelectCity];
    for(x in data){
      num ++;
      sum += data[x];
      if(num == 7){
        num = 0;
        week ++;
        chartData[week+"week"] = Math.round(sum/7);
        sum = 0;
      }
    }
    if(num>0){
      week ++;
      chartData[week+"week"] = Math.round(sum/num);
      sum = 0;
    }
    for(x in chartData){
       result += "<div title='"+x.toString()+":"+chartData[x].toString()+"' "+"style='height:"+chartData[x].toString()+"px;width:30px;position:absolute;bottom:0px;left:"+length*30+"px;background:"+color[length%7]+";'></div>"; 
       length++;
    }

    tablediv.innerHTML = result;
    chartData = {};
    data = {};
    length= 0;
    num = 0;
  }
  else if(pageState.nowGraTime == "month"){
    data = aqiSourceData[pageState.nowSelectCity];
    for(x in data){
      if(x.split('-')[1] == "01" ){
        sumMonth1 += data[x];
      }else if(x.split('-')[1] == "02"){
        sumMonth2 += data[x];
      }else if(x.split('-')[1] == "03"){
        sumMonth3 += data[x];
      }
    }
    chartData["January"] = Math.round(sumMonth1/31);
    chartData["February"] = Math.round(sumMonth2/29);
    chartData["March"] = Math.round(sumMonth3/31);

    for(x in chartData){
       result += "<div title='"+x.toString()+":"+chartData[x].toString()+"' "+"style='height:"+chartData[x].toString()+"px;width:50px;position:absolute;bottom:0px;left:"+length*50+"px;background:"+color[length%7]+";'></div>"; 
       length++;
    }

    tablediv.innerHTML = result;
    chartData = {};
    data = {};
    length= 0;
  }

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(target) {
  // 确定是否选项发生了变化 
  if(target.value == pageState.nowGraTime){
    return;
  }

  pageState.nowGraTime = target.value;
  // 设置对应数据

  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(target) {
  // 确定是否选项发生了变化 
  if(target.value == pageState.nowSelectCity){
    return;
  }

  pageState.nowSelectCity = target.value;


  // 设置对应数据

  // 调用图表渲染函数
  renderChart();
  var tablediv = document.querySelector(".aqi-chart-wrap");
}
  
/**   alert(tablediv.innerHTML);
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

  var table = document.getElementById("form-gra-time");
  EventUtil.addHandler(table,"change",function(event){
    graTimeChange(event.target);
  });
  //table.addEventListener("change",function(event){
  //  graTimeChange(event.target);
  //},false);

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.getElementById("city-select");
  for(var x in aqiSourceData){
    if(x == "北京"){
      continue;
    }
    var option = document.createElement("option");
    var text = document.createTextNode(x);
    option.appendChild(text);
    citySelect.appendChild(option);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  EventUtil.addHandler(citySelect,"change",function(event){
    citySelectChange(event.target);
  });

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();