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
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {

  var table = document.getElementById("aqi-chart-wrap");
  for(x in chartData){
      var div = document.createElement("div");
      div.style.height = chartData[x] + "px";
      div.style.width = "10px";
      div.style.border = "1px solid black";
      div.style.cssFloat = "left";
      table.appendChild(div);
  }

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(target) {
  // 确定是否选项发生了变化 
  if(target.value != pageState.nowGraTime){
    pageState.nowGraTime = target.value;
    chartData = aqiSourceData[pageState.nowSelectCity];
    renderChart();
  }

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(target) {
  // 确定是否选项发生了变化 
  if(target.value != pageState.nowSelectCity){
    pageState.nowSelectCity = target.value;
    chartData = aqiSourceData[pageState.nowSelectCity];
    renderChart();
  }
  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

  button = document.getElementById("form-gra-time");
  button.addEventListener("change",function(event){
    var target = event.target;
    graTimeChange(target);
  },false);


}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  citySelect = document.getElementById("city-select"); 
  for(x in aqiSourceData){
    var option += "<option>"+x+"</option>";
  }
  citySelect.innerHTML = option;

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.addEventListener("change",function(event){
    var target = event.target;
    citySelectChange(target);
  },false);

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
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();