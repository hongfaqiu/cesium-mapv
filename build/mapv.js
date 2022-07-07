(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('cesium')) :
	typeof define === 'function' && define.amd ? define(['exports', 'cesium'], factory) :
	(factory((global.mapv = global.mapv || {}),global.cesium));
}(this, (function (exports,Cesium) { 'use strict';

function Event() {
  this._subscribers = {}; // event subscribers
}

/**
 * Subscribe to an event, add an event listener
 * @param {String} event        Event name. Available events: 'put', 'update',
 *                              'remove'
 * @param {function} callback   Callback method. Called with three parameters:
 *                                  {String} event
 *                                  {Object | null} params
 *                                  {String | Number} senderId
 */
Event.prototype.on = function (event, callback) {
  var subscribers = this._subscribers[event];
  if (!subscribers) {
    subscribers = [];
    this._subscribers[event] = subscribers;
  }

  subscribers.push({
    callback: callback
  });
};

/**
 * Unsubscribe from an event, remove an event listener
 * @param {String} event
 * @param {function} callback
 */
Event.prototype.off = function (event, callback) {
  var subscribers = this._subscribers[event];
  if (subscribers) {
    //this._subscribers[event] = subscribers.filter(listener => listener.callback != callback);
    for (var i = 0; i < subscribers.length; i++) {
      if (subscribers[i].callback == callback) {
        subscribers.splice(i, 1);
        i--;
      }
    }
  }
};

/**
 * Trigger an event
 * @param {String} event
 * @param {Object | null} params
 * @param {String} [senderId]       Optional id of the sender.
 * @private
 */
Event.prototype._trigger = function (event, params, senderId) {
  if (event == '*') {
    throw new Error('Cannot trigger event *');
  }

  var subscribers = [];
  if (event in this._subscribers) {
    subscribers = subscribers.concat(this._subscribers[event]);
  }
  if ('*' in this._subscribers) {
    subscribers = subscribers.concat(this._subscribers['*']);
  }

  for (var i = 0, len = subscribers.length; i < len; i++) {
    var subscriber = subscribers[i];
    if (subscriber.callback) {
      subscriber.callback(event, params, senderId || null);
    }
  }
};

/**
 * get the center by the city name
 * @author kyle / http://nikai.us/
 */

var citycenter = { municipalities: [{ n: "北京", g: "116.395645,39.929986|12" }, { n: "上海", g: "121.487899,31.249162|12" }, { n: "天津", g: "117.210813,39.14393|12" }, { n: "重庆", g: "106.530635,29.544606|12" }], provinces: [{ n: "安徽", g: "117.216005,31.859252|8", cities: [{ n: "合肥", g: "117.282699,31.866942|12" }, { n: "安庆", g: "117.058739,30.537898|13" }, { n: "蚌埠", g: "117.35708,32.929499|13" }, { n: "亳州", g: "115.787928,33.871211|13" }, { n: "巢湖", g: "117.88049,31.608733|13" }, { n: "池州", g: "117.494477,30.660019|14" }, { n: "滁州", g: "118.32457,32.317351|13" }, { n: "阜阳", g: "115.820932,32.901211|13" }, { n: "淮北", g: "116.791447,33.960023|13" }, { n: "淮南", g: "117.018639,32.642812|13" }, { n: "黄山", g: "118.29357,29.734435|13" }, { n: "六安", g: "116.505253,31.755558|13" }, { n: "马鞍山", g: "118.515882,31.688528|13" }, { n: "宿州", g: "116.988692,33.636772|13" }, { n: "铜陵", g: "117.819429,30.94093|14" }, { n: "芜湖", g: "118.384108,31.36602|12" }, { n: "宣城", g: "118.752096,30.951642|13" }] }, { n: "福建", g: "117.984943,26.050118|8", cities: [{ n: "福州", g: "119.330221,26.047125|12" }, { n: "龙岩", g: "117.017997,25.078685|13" }, { n: "南平", g: "118.181883,26.643626|13" }, { n: "宁德", g: "119.542082,26.656527|14" }, { n: "莆田", g: "119.077731,25.44845|13" }, { n: "泉州", g: "118.600362,24.901652|12" }, { n: "三明", g: "117.642194,26.270835|14" }, { n: "厦门", g: "118.103886,24.489231|12" }, { n: "漳州", g: "117.676205,24.517065|12" }] }, { n: "甘肃", g: "102.457625,38.103267|6", cities: [{ n: "兰州", g: "103.823305,36.064226|12" }, { n: "白银", g: "104.171241,36.546682|13" }, { n: "定西", g: "104.626638,35.586056|13" }, { n: "甘南州", g: "102.917442,34.992211|14" }, { n: "嘉峪关", g: "98.281635,39.802397|13" }, { n: "金昌", g: "102.208126,38.516072|13" }, { n: "酒泉", g: "98.508415,39.741474|13" }, { n: "临夏州", g: "103.215249,35.598514|13" }, { n: "陇南", g: "104.934573,33.39448|14" }, { n: "平凉", g: "106.688911,35.55011|13" }, { n: "庆阳", g: "107.644227,35.726801|13" }, { n: "天水", g: "105.736932,34.584319|13" }, { n: "武威", g: "102.640147,37.933172|13" }, { n: "张掖", g: "100.459892,38.93932|13" }] }, { n: "广东", g: "113.394818,23.408004|8", cities: [{ n: "广州", g: "113.30765,23.120049|12" }, { n: "潮州", g: "116.630076,23.661812|13" }, { n: "东莞", g: "113.763434,23.043024|12" }, { n: "佛山", g: "113.134026,23.035095|13" }, { n: "河源", g: "114.713721,23.757251|12" }, { n: "惠州", g: "114.410658,23.11354|12" }, { n: "江门", g: "113.078125,22.575117|13" }, { n: "揭阳", g: "116.379501,23.547999|13" }, { n: "茂名", g: "110.931245,21.668226|13" }, { n: "梅州", g: "116.126403,24.304571|13" }, { n: "清远", g: "113.040773,23.698469|13" }, { n: "汕头", g: "116.72865,23.383908|13" }, { n: "汕尾", g: "115.372924,22.778731|14" }, { n: "韶关", g: "113.594461,24.80296|13" }, { n: "深圳", g: "114.025974,22.546054|12" }, { n: "阳江", g: "111.97701,21.871517|14" }, { n: "云浮", g: "112.050946,22.937976|13" }, { n: "湛江", g: "110.365067,21.257463|13" }, { n: "肇庆", g: "112.479653,23.078663|13" }, { n: "中山", g: "113.42206,22.545178|12" }, { n: "珠海", g: "113.562447,22.256915|13" }] }, { n: "广西", g: "108.924274,23.552255|7", cities: [{ n: "南宁", g: "108.297234,22.806493|12" }, { n: "百色", g: "106.631821,23.901512|13" }, { n: "北海", g: "109.122628,21.472718|13" }, { n: "崇左", g: "107.357322,22.415455|14" }, { n: "防城港", g: "108.351791,21.617398|15" }, { n: "桂林", g: "110.26092,25.262901|12" }, { n: "贵港", g: "109.613708,23.103373|13" }, { n: "河池", g: "108.069948,24.699521|14" }, { n: "贺州", g: "111.552594,24.411054|14" }, { n: "来宾", g: "109.231817,23.741166|14" }, { n: "柳州", g: "109.422402,24.329053|12" }, { n: "钦州", g: "108.638798,21.97335|13" }, { n: "梧州", g: "111.305472,23.485395|13" }, { n: "玉林", g: "110.151676,22.643974|14" }] }, { n: "贵州", g: "106.734996,26.902826|8", cities: [{ n: "贵阳", g: "106.709177,26.629907|12" }, { n: "安顺", g: "105.92827,26.228595|13" }, { n: "毕节地区", g: "105.300492,27.302612|14" }, { n: "六盘水", g: "104.852087,26.591866|13" }, { n: "铜仁地区", g: "109.196161,27.726271|14" }, { n: "遵义", g: "106.93126,27.699961|13" }, { n: "黔西南州", g: "104.900558,25.095148|11" }, { n: "黔东南州", g: "107.985353,26.583992|11" }, { n: "黔南州", g: "107.523205,26.264536|11" }] }, { n: "海南", g: "109.733755,19.180501|9", cities: [{ n: "海口", g: "110.330802,20.022071|13" }, { n: "白沙", g: "109.358586,19.216056|12" }, { n: "保亭", g: "109.656113,18.597592|12" }, { n: "昌江", g: "109.0113,19.222483|12" }, { n: "儋州", g: "109.413973,19.571153|13" }, { n: "澄迈", g: "109.996736,19.693135|13" }, { n: "东方", g: "108.85101,18.998161|13" }, { n: "定安", g: "110.32009,19.490991|13" }, { n: "琼海", g: "110.414359,19.21483|13" }, { n: "琼中", g: "109.861849,19.039771|12" }, { n: "乐东", g: "109.062698,18.658614|12" }, { n: "临高", g: "109.724101,19.805922|13" }, { n: "陵水", g: "109.948661,18.575985|12" }, { n: "三亚", g: "109.522771,18.257776|12" }, { n: "屯昌", g: "110.063364,19.347749|13" }, { n: "万宁", g: "110.292505,18.839886|13" }, { n: "文昌", g: "110.780909,19.750947|13" }, { n: "五指山", g: "109.51775,18.831306|13" }] }, { n: "河北", g: "115.661434,38.61384|7", cities: [{ n: "石家庄", g: "114.522082,38.048958|12" }, { n: "保定", g: "115.49481,38.886565|13" }, { n: "沧州", g: "116.863806,38.297615|13" }, { n: "承德", g: "117.933822,40.992521|14" }, { n: "邯郸", g: "114.482694,36.609308|13" }, { n: "衡水", g: "115.686229,37.746929|13" }, { n: "廊坊", g: "116.703602,39.518611|13" }, { n: "秦皇岛", g: "119.604368,39.945462|12" }, { n: "唐山", g: "118.183451,39.650531|13" }, { n: "邢台", g: "114.520487,37.069531|13" }, { n: "张家口", g: "114.893782,40.811188|13" }] }, { n: "河南", g: "113.486804,34.157184|7", cities: [{ n: "郑州", g: "113.649644,34.75661|12" }, { n: "安阳", g: "114.351807,36.110267|12" }, { n: "鹤壁", g: "114.29777,35.755426|13" }, { n: "焦作", g: "113.211836,35.234608|13" }, { n: "开封", g: "114.351642,34.801854|13" }, { n: "洛阳", g: "112.447525,34.657368|12" }, { n: "漯河", g: "114.046061,33.576279|13" }, { n: "南阳", g: "112.542842,33.01142|13" }, { n: "平顶山", g: "113.300849,33.745301|13" }, { n: "濮阳", g: "115.026627,35.753298|12" }, { n: "三门峡", g: "111.181262,34.78332|13" }, { n: "商丘", g: "115.641886,34.438589|13" }, { n: "新乡", g: "113.91269,35.307258|13" }, { n: "信阳", g: "114.085491,32.128582|13" }, { n: "许昌", g: "113.835312,34.02674|13" }, { n: "周口", g: "114.654102,33.623741|13" }, { n: "驻马店", g: "114.049154,32.983158|13" }] }, { n: "黑龙江", g: "128.047414,47.356592|6", cities: [{ n: "哈尔滨", g: "126.657717,45.773225|12" }, { n: "大庆", g: "125.02184,46.596709|12" }, { n: "大兴安岭地区", g: "124.196104,51.991789|10" }, { n: "鹤岗", g: "130.292472,47.338666|13" }, { n: "黑河", g: "127.50083,50.25069|14" }, { n: "鸡西", g: "130.941767,45.32154|13" }, { n: "佳木斯", g: "130.284735,46.81378|12" }, { n: "牡丹江", g: "129.608035,44.588521|13" }, { n: "七台河", g: "131.019048,45.775005|14" }, { n: "齐齐哈尔", g: "123.987289,47.3477|13" }, { n: "双鸭山", g: "131.171402,46.655102|13" }, { n: "绥化", g: "126.989095,46.646064|13" }, { n: "伊春", g: "128.910766,47.734685|14" }] }, { n: "湖北", g: "112.410562,31.209316|8", cities: [{ n: "武汉", g: "114.3162,30.581084|12" }, { n: "鄂州", g: "114.895594,30.384439|14" }, { n: "恩施", g: "109.517433,30.308978|14" }, { n: "黄冈", g: "114.906618,30.446109|14" }, { n: "黄石", g: "115.050683,30.216127|13" }, { n: "荆门", g: "112.21733,31.042611|13" }, { n: "荆州", g: "112.241866,30.332591|12" }, { n: "潜江", g: "112.768768,30.343116|13" }, { n: "神农架林区", g: "110.487231,31.595768|13" }, { n: "十堰", g: "110.801229,32.636994|13" }, { n: "随州", g: "113.379358,31.717858|13" }, { n: "天门", g: "113.12623,30.649047|13" }, { n: "仙桃", g: "113.387448,30.293966|13" }, { n: "咸宁", g: "114.300061,29.880657|13" }, { n: "襄阳", g: "112.176326,32.094934|12" }, { n: "孝感", g: "113.935734,30.927955|13" }, { n: "宜昌", g: "111.310981,30.732758|13" }] }, { n: "湖南", g: "111.720664,27.695864|7", cities: [{ n: "长沙", g: "112.979353,28.213478|12" }, { n: "常德", g: "111.653718,29.012149|12" }, { n: "郴州", g: "113.037704,25.782264|13" }, { n: "衡阳", g: "112.583819,26.898164|13" }, { n: "怀化", g: "109.986959,27.557483|13" }, { n: "娄底", g: "111.996396,27.741073|13" }, { n: "邵阳", g: "111.461525,27.236811|13" }, { n: "湘潭", g: "112.935556,27.835095|13" }, { n: "湘西州", g: "109.745746,28.317951|14" }, { n: "益阳", g: "112.366547,28.588088|13" }, { n: "永州", g: "111.614648,26.435972|13" }, { n: "岳阳", g: "113.146196,29.378007|13" }, { n: "张家界", g: "110.48162,29.124889|13" }, { n: "株洲", g: "113.131695,27.827433|13" }] }, { n: "江苏", g: "119.368489,33.013797|8", cities: [{ n: "南京", g: "118.778074,32.057236|12" }, { n: "常州", g: "119.981861,31.771397|12" }, { n: "淮安", g: "119.030186,33.606513|12" }, { n: "连云港", g: "119.173872,34.601549|12" }, { n: "南通", g: "120.873801,32.014665|12" }, { n: "苏州", g: "120.619907,31.317987|12" }, { n: "宿迁", g: "118.296893,33.95205|13" }, { n: "泰州", g: "119.919606,32.476053|13" }, { n: "无锡", g: "120.305456,31.570037|12" }, { n: "徐州", g: "117.188107,34.271553|12" }, { n: "盐城", g: "120.148872,33.379862|12" }, { n: "扬州", g: "119.427778,32.408505|13" }, { n: "镇江", g: "119.455835,32.204409|13" }] }, { n: "江西", g: "115.676082,27.757258|7", cities: [{ n: "南昌", g: "115.893528,28.689578|12" }, { n: "抚州", g: "116.360919,27.954545|13" }, { n: "赣州", g: "114.935909,25.845296|13" }, { n: "吉安", g: "114.992039,27.113848|13" }, { n: "景德镇", g: "117.186523,29.303563|12" }, { n: "九江", g: "115.999848,29.71964|13" }, { n: "萍乡", g: "113.859917,27.639544|13" }, { n: "上饶", g: "117.955464,28.457623|13" }, { n: "新余", g: "114.947117,27.822322|13" }, { n: "宜春", g: "114.400039,27.81113|13" }, { n: "鹰潭", g: "117.03545,28.24131|13" }] }, { n: "吉林", g: "126.262876,43.678846|7", cities: [{ n: "长春", g: "125.313642,43.898338|12" }, { n: "白城", g: "122.840777,45.621086|13" }, { n: "白山", g: "126.435798,41.945859|13" }, { n: "吉林", g: "126.564544,43.871988|12" }, { n: "辽源", g: "125.133686,42.923303|13" }, { n: "四平", g: "124.391382,43.175525|12" }, { n: "松原", g: "124.832995,45.136049|13" }, { n: "通化", g: "125.94265,41.736397|13" }, { n: "延边", g: "129.485902,42.896414|13" }] }, { n: "辽宁", g: "122.753592,41.6216|8", cities: [{ n: "沈阳", g: "123.432791,41.808645|12" }, { n: "鞍山", g: "123.007763,41.118744|13" }, { n: "本溪", g: "123.778062,41.325838|12" }, { n: "朝阳", g: "120.446163,41.571828|13" }, { n: "大连", g: "121.593478,38.94871|12" }, { n: "丹东", g: "124.338543,40.129023|12" }, { n: "抚顺", g: "123.92982,41.877304|12" }, { n: "阜新", g: "121.660822,42.01925|14" }, { n: "葫芦岛", g: "120.860758,40.74303|13" }, { n: "锦州", g: "121.147749,41.130879|13" }, { n: "辽阳", g: "123.172451,41.273339|14" }, { n: "盘锦", g: "122.073228,41.141248|13" }, { n: "铁岭", g: "123.85485,42.299757|13" }, { n: "营口", g: "122.233391,40.668651|13" }] }, { n: "内蒙古", g: "114.415868,43.468238|5", cities: [{ n: "呼和浩特", g: "111.660351,40.828319|12" }, { n: "阿拉善盟", g: "105.695683,38.843075|14" }, { n: "包头", g: "109.846239,40.647119|12" }, { n: "巴彦淖尔", g: "107.423807,40.76918|12" }, { n: "赤峰", g: "118.930761,42.297112|12" }, { n: "鄂尔多斯", g: "109.993706,39.81649|12" }, { n: "呼伦贝尔", g: "119.760822,49.201636|12" }, { n: "通辽", g: "122.260363,43.633756|12" }, { n: "乌海", g: "106.831999,39.683177|13" }, { n: "乌兰察布", g: "113.112846,41.022363|12" }, { n: "锡林郭勒盟", g: "116.02734,43.939705|11" }, { n: "兴安盟", g: "122.048167,46.083757|11" }] }, { n: "宁夏", g: "106.155481,37.321323|8", cities: [{ n: "银川", g: "106.206479,38.502621|12" }, { n: "固原", g: "106.285268,36.021523|13" }, { n: "石嘴山", g: "106.379337,39.020223|13" }, { n: "吴忠", g: "106.208254,37.993561|14" }, { n: "中卫", g: "105.196754,37.521124|14" }] }, { n: "青海", g: "96.202544,35.499761|7", cities: [{ n: "西宁", g: "101.767921,36.640739|12" }, { n: "果洛州", g: "100.223723,34.480485|11" }, { n: "海东地区", g: "102.085207,36.51761|11" }, { n: "海北州", g: "100.879802,36.960654|11" }, { n: "海南州", g: "100.624066,36.284364|11" }, { n: "海西州", g: "97.342625,37.373799|11" }, { n: "黄南州", g: "102.0076,35.522852|11" }, { n: "玉树州", g: "97.013316,33.00624|14" }] }, { n: "山东", g: "118.527663,36.09929|8", cities: [{ n: "济南", g: "117.024967,36.682785|12" }, { n: "滨州", g: "117.968292,37.405314|12" }, { n: "东营", g: "118.583926,37.487121|12" }, { n: "德州", g: "116.328161,37.460826|12" }, { n: "菏泽", g: "115.46336,35.26244|13" }, { n: "济宁", g: "116.600798,35.402122|13" }, { n: "莱芜", g: "117.684667,36.233654|13" }, { n: "聊城", g: "115.986869,36.455829|12" }, { n: "临沂", g: "118.340768,35.072409|12" }, { n: "青岛", g: "120.384428,36.105215|12" }, { n: "日照", g: "119.50718,35.420225|12" }, { n: "泰安", g: "117.089415,36.188078|13" }, { n: "威海", g: "122.093958,37.528787|13" }, { n: "潍坊", g: "119.142634,36.716115|12" }, { n: "烟台", g: "121.309555,37.536562|12" }, { n: "枣庄", g: "117.279305,34.807883|13" }, { n: "淄博", g: "118.059134,36.804685|12" }] }, { n: "山西", g: "112.515496,37.866566|7", cities: [{ n: "太原", g: "112.550864,37.890277|12" }, { n: "长治", g: "113.120292,36.201664|12" }, { n: "大同", g: "113.290509,40.113744|12" }, { n: "晋城", g: "112.867333,35.499834|13" }, { n: "晋中", g: "112.738514,37.693362|13" }, { n: "临汾", g: "111.538788,36.099745|13" }, { n: "吕梁", g: "111.143157,37.527316|14" }, { n: "朔州", g: "112.479928,39.337672|13" }, { n: "忻州", g: "112.727939,38.461031|12" }, { n: "阳泉", g: "113.569238,37.869529|13" }, { n: "运城", g: "111.006854,35.038859|13" }] }, { n: "陕西", g: "109.503789,35.860026|7", cities: [{ n: "西安", g: "108.953098,34.2778|12" }, { n: "安康", g: "109.038045,32.70437|13" }, { n: "宝鸡", g: "107.170645,34.364081|12" }, { n: "汉中", g: "107.045478,33.081569|13" }, { n: "商洛", g: "109.934208,33.873907|13" }, { n: "铜川", g: "108.968067,34.908368|13" }, { n: "渭南", g: "109.483933,34.502358|13" }, { n: "咸阳", g: "108.707509,34.345373|13" }, { n: "延安", g: "109.50051,36.60332|13" }, { n: "榆林", g: "109.745926,38.279439|12" }] }, { n: "四川", g: "102.89916,30.367481|7", cities: [{ n: "成都", g: "104.067923,30.679943|12" }, { n: "阿坝州", g: "102.228565,31.905763|15" }, { n: "巴中", g: "106.757916,31.869189|14" }, { n: "达州", g: "107.494973,31.214199|14" }, { n: "德阳", g: "104.402398,31.13114|13" }, { n: "甘孜州", g: "101.969232,30.055144|15" }, { n: "广安", g: "106.63572,30.463984|13" }, { n: "广元", g: "105.819687,32.44104|13" }, { n: "乐山", g: "103.760824,29.600958|13" }, { n: "凉山州", g: "102.259591,27.892393|14" }, { n: "泸州", g: "105.44397,28.89593|14" }, { n: "南充", g: "106.105554,30.800965|13" }, { n: "眉山", g: "103.84143,30.061115|13" }, { n: "绵阳", g: "104.705519,31.504701|12" }, { n: "内江", g: "105.073056,29.599462|13" }, { n: "攀枝花", g: "101.722423,26.587571|14" }, { n: "遂宁", g: "105.564888,30.557491|12" }, { n: "雅安", g: "103.009356,29.999716|13" }, { n: "宜宾", g: "104.633019,28.769675|13" }, { n: "资阳", g: "104.63593,30.132191|13" }, { n: "自贡", g: "104.776071,29.359157|13" }] }, { n: "西藏", g: "89.137982,31.367315|6", cities: [{ n: "拉萨", g: "91.111891,29.662557|13" }, { n: "阿里地区", g: "81.107669,30.404557|11" }, { n: "昌都地区", g: "97.185582,31.140576|15" }, { n: "林芝地区", g: "94.349985,29.666941|11" }, { n: "那曲地区", g: "92.067018,31.48068|14" }, { n: "日喀则地区", g: "88.891486,29.269023|14" }, { n: "山南地区", g: "91.750644,29.229027|11" }] }, { n: "新疆", g: "85.614899,42.127001|6", cities: [{ n: "乌鲁木齐", g: "87.564988,43.84038|12" }, { n: "阿拉尔", g: "81.291737,40.61568|13" }, { n: "阿克苏地区", g: "80.269846,41.171731|12" }, { n: "阿勒泰地区", g: "88.137915,47.839744|13" }, { n: "巴音郭楞", g: "86.121688,41.771362|12" }, { n: "博尔塔拉州", g: "82.052436,44.913651|11" }, { n: "昌吉州", g: "87.296038,44.007058|13" }, { n: "哈密地区", g: "93.528355,42.858596|13" }, { n: "和田地区", g: "79.930239,37.116774|13" }, { n: "喀什地区", g: "75.992973,39.470627|12" }, { n: "克拉玛依", g: "84.88118,45.594331|13" }, { n: "克孜勒苏州", g: "76.137564,39.750346|11" }, { n: "石河子", g: "86.041865,44.308259|13" }, { n: "塔城地区", g: "82.974881,46.758684|12" }, { n: "图木舒克", g: "79.198155,39.889223|13" }, { n: "吐鲁番地区", g: "89.181595,42.96047|13" }, { n: "五家渠", g: "87.565449,44.368899|13" }, { n: "伊犁州", g: "81.297854,43.922248|11" }] }, { n: "云南", g: "101.592952,24.864213|7", cities: [{ n: "昆明", g: "102.714601,25.049153|12" }, { n: "保山", g: "99.177996,25.120489|13" }, { n: "楚雄州", g: "101.529382,25.066356|13" }, { n: "大理州", g: "100.223675,25.5969|14" }, { n: "德宏州", g: "98.589434,24.44124|14" }, { n: "迪庆州", g: "99.713682,27.831029|14" }, { n: "红河州", g: "103.384065,23.367718|11" }, { n: "丽江", g: "100.229628,26.875351|13" }, { n: "临沧", g: "100.092613,23.887806|14" }, { n: "怒江州", g: "98.859932,25.860677|14" }, { n: "普洱", g: "100.980058,22.788778|14" }, { n: "曲靖", g: "103.782539,25.520758|12" }, { n: "昭通", g: "103.725021,27.340633|13" }, { n: "文山", g: "104.089112,23.401781|14" }, { n: "西双版纳", g: "100.803038,22.009433|13" }, { n: "玉溪", g: "102.545068,24.370447|13" }] }, { n: "浙江", g: "119.957202,29.159494|8", cities: [{ n: "杭州", g: "120.219375,30.259244|12" }, { n: "湖州", g: "120.137243,30.877925|12" }, { n: "嘉兴", g: "120.760428,30.773992|13" }, { n: "金华", g: "119.652576,29.102899|12" }, { n: "丽水", g: "119.929576,28.4563|13" }, { n: "宁波", g: "121.579006,29.885259|12" }, { n: "衢州", g: "118.875842,28.95691|12" }, { n: "绍兴", g: "120.592467,30.002365|13" }, { n: "台州", g: "121.440613,28.668283|13" }, { n: "温州", g: "120.690635,28.002838|12" }, { n: "舟山", g: "122.169872,30.03601|13" }] }], other: [{ n: "香港", g: "114.186124,22.293586|11" }, { n: "澳门", g: "113.557519,22.204118|13" }, { n: "台湾", g: "120.961454,23.80406|8" }] };

function getCenter(g) {
    var item = g.split("|");
    item[0] = item[0].split(",");
    return {
        lng: parseFloat(item[0][0]),
        lat: parseFloat(item[0][1])
    };
}

var cityCenter = {
    getProvinceNameByCityName: function getProvinceNameByCityName(name) {
        var provinces = citycenter.provinces;
        for (var i = 0; i < provinces.length; i++) {
            var provinceName = provinces[i].n;
            var cities = provinces[i].cities;
            for (var j = 0; j < cities.length; j++) {
                if (cities[j].n == name) {
                    return provinceName;
                }
            }
        }
        return null;
    },
    getCenterByCityName: function getCenterByCityName(name) {
        name = name.replace('市', '');
        for (var i = 0; i < citycenter.municipalities.length; i++) {
            if (citycenter.municipalities[i].n == name) {
                return getCenter(citycenter.municipalities[i].g);
            }
        }

        for (var i = 0; i < citycenter.other.length; i++) {
            if (citycenter.other[i].n == name) {
                return getCenter(citycenter.other[i].g);
            }
        }

        var provinces = citycenter.provinces;
        for (var i = 0; i < provinces.length; i++) {
            if (provinces[i].n == name) {
                return getCenter(provinces[i].g);
            }
            var cities = provinces[i].cities;
            for (var j = 0; j < cities.length; j++) {
                if (cities[j].n == name) {
                    return getCenter(cities[j].g);
                }
            }
        }
        return null;
    }
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/**
 * @author kyle / http://nikai.us/
 */

/**
 * DataSet
 *
 * A data set can:
 * - add/remove/update data
 * - gives triggers upon changes in the data
 * - can  import/export data in various data formats
 * @param {Array} [data]    Optional array with initial data
 * the field geometry is like geojson, it can be:
 * {
 *     "type": "Point",
 *     "coordinates": [125.6, 10.1]
 * }
 * {
 *     "type": "LineString",
 *     "coordinates": [
 *         [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
 *     ]
 * }
 * {
 *     "type": "Polygon",
 *     "coordinates": [
 *         [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
 *           [100.0, 1.0], [100.0, 0.0] ]
 *     ]
 * }
 * @param {Object} [options]   Available options:
 * 
 */
function DataSet(data, options) {
    Event.bind(this)();

    this._options = options || {};
    this._data = []; // map with data indexed by id

    // add initial data when provided
    if (data) {
        this.add(data);
    }
}

DataSet.prototype = Object.create(Event.prototype);

/**
 * Add data.
 */
DataSet.prototype.add = function (data, senderId) {
    if (Array.isArray(data)) {
        // Array
        for (var i = 0, len = data.length; i < len; i++) {
            if (data[i]) {
                if (data[i].time && data[i].time.length == 14 && data[i].time.substr(0, 2) == '20') {
                    var time = data[i].time;
                    data[i].time = new Date(time.substr(0, 4) + '-' + time.substr(4, 2) + '-' + time.substr(6, 2) + ' ' + time.substr(8, 2) + ':' + time.substr(10, 2) + ':' + time.substr(12, 2)).getTime();
                }
                this._data.push(data[i]);
            }
        }
    } else if (data instanceof Object) {
        // Single item
        this._data.push(data);
    } else {
        throw new Error('Unknown dataType');
    }

    this._dataCache = JSON.parse(JSON.stringify(this._data));
};

DataSet.prototype.reset = function () {
    this._data = JSON.parse(JSON.stringify(this._dataCache));
};

/**
 * get data.
 */
DataSet.prototype.get = function (args) {
    args = args || {};

    //console.time('copy data time')
    var start = new Date();
    // TODO: 不修改原始数据，在数据上挂载新的名称，每次修改数据直接修改新名称下的数据，可以省去deepCopy
    // var data = deepCopy(this._data);
    var data = this._data;

    var start = new Date();

    if (args.filter) {
        var newData = [];
        for (var i = 0; i < data.length; i++) {
            if (args.filter(data[i])) {
                newData.push(data[i]);
            }
        }
        data = newData;
    }

    if (args.transferCoordinate) {
        data = this.transferCoordinate(data, args.transferCoordinate, args.fromColumn, args.toColumn);
    }

    // console.timeEnd('transferCoordinate time')

    return data;
};

/**
 * set data.
 */
DataSet.prototype.set = function (data) {
    this._set(data);
    this._trigger('change');
};

/**
 * set data.
 */
DataSet.prototype._set = function (data) {
    this.clear();
    this.add(data);
};

/**
 * clear data.
 */
DataSet.prototype.clear = function (args) {
    this._data = []; // map with data indexed by id
};

/**
 * remove data.
 */
DataSet.prototype.remove = function (args) {};

/**
 * update data.
 */
DataSet.prototype.update = function (cbk, condition) {

    var data = this._data;

    var item = null;
    for (var i = 0; i < data.length; i++) {
        if (condition) {
            var flag = true;
            for (var key in condition) {
                if (data[i][key] != condition[key]) {
                    flag = false;
                }
            }
            if (flag) {
                cbk && cbk(data[i]);
            }
        } else {
            cbk && cbk(data[i]);
        }
    }

    this._dataCache = JSON.parse(JSON.stringify(this._data));

    this._trigger('change');
};

/**
 * transfer coordinate.
 */
DataSet.prototype.transferCoordinate = function (data, transferFn, fromColumn, toColumnName) {

    toColumnName = toColumnName || '_coordinates';
    fromColumn = fromColumn || 'coordinates';

    for (var i = 0; i < data.length; i++) {

        var geometry = data[i].geometry;
        var coordinates = geometry[fromColumn];
        switch (geometry.type) {
            case 'Point':
                geometry[toColumnName] = transferFn(coordinates);
                break;
            case 'LineString':
                var newCoordinates = [];
                for (var j = 0; j < coordinates.length; j++) {
                    newCoordinates.push(transferFn(coordinates[j]));
                }
                geometry[toColumnName] = newCoordinates;
                break;
            case 'MultiLineString':
            case 'Polygon':
                var newCoordinates = getPolygon(coordinates);
                geometry[toColumnName] = newCoordinates;
                break;
            case 'MultiPolygon':
                var newCoordinates = [];
                for (var c = 0; c < coordinates.length; c++) {
                    var polygon = coordinates[c];
                    var polygon = getPolygon(polygon);
                    newCoordinates.push(polygon);
                }

                geometry[toColumnName] = newCoordinates;
                break;
        }
    }

    function getPolygon(coordinates) {
        var newCoordinates = [];
        for (var c = 0; c < coordinates.length; c++) {
            var coordinate = coordinates[c];
            var newcoordinate = [];
            for (var j = 0; j < coordinate.length; j++) {
                newcoordinate.push(transferFn(coordinate[j]));
            }
            newCoordinates.push(newcoordinate);
        }
        return newCoordinates;
    }

    return data;
};

DataSet.prototype.initGeometry = function (transferFn) {

    if (transferFn) {

        this._data.forEach(function (item) {
            item.geometry = transferFn(item);
        });
    } else {

        this._data.forEach(function (item) {
            if (!item.geometry) {
                if (item.lng && item.lat) {
                    item.geometry = {
                        type: 'Point',
                        coordinates: [item.lng, item.lat]
                    };
                } else if (item.city) {
                    var center = cityCenter.getCenterByCityName(item.city);
                    if (center) {
                        item.geometry = {
                            type: 'Point',
                            coordinates: [center.lng, center.lat]
                        };
                    }
                }
            }
        });
    }
};

/**
 * 获取当前列的最大值
 */
DataSet.prototype.getMax = function (columnName) {
    var data = this._data;

    if (!data || data.length <= 0) {
        return;
    }

    var max = parseFloat(data[0][columnName]);

    for (var i = 1; i < data.length; i++) {
        var value = parseFloat(data[i][columnName]);
        if (value > max) {
            max = value;
        }
    }

    return max;
};

/**
 * 获取当前列的总和
 */
DataSet.prototype.getSum = function (columnName) {
    var data = this._data;

    if (!data || data.length <= 0) {
        return;
    }

    var sum = 0;

    for (var i = 0; i < data.length; i++) {
        if (data[i][columnName]) {
            sum += parseFloat(data[i][columnName]);
        }
    }

    return sum;
};

/**
 * 获取当前列的最小值
 */
DataSet.prototype.getMin = function (columnName) {
    var data = this._data;

    if (!data || data.length <= 0) {
        return;
    }

    var min = parseFloat(data[0][columnName]);

    for (var i = 1; i < data.length; i++) {
        var value = parseFloat(data[i][columnName]);
        if (value < min) {
            min = value;
        }
    }

    return min;
};

/**
 * 获取去重的数据
 */
DataSet.prototype.getUnique = function (columnName) {
    var data = this._data;

    if (!data || data.length <= 0) {
        return;
    }

    var maps = {};

    for (var i = 1; i < data.length; i++) {
        maps[data[i][columnName]] = true;
    }

    var data = [];
    for (var key in maps) {
        data.push(key);
    }

    return data;
};

/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */

var TWEEN = TWEEN || function () {

        var _tweens = [];

        return {

                getAll: function getAll() {

                        return _tweens;
                },

                removeAll: function removeAll() {

                        _tweens = [];
                },

                add: function add(tween) {

                        _tweens.push(tween);
                },

                remove: function remove(tween) {

                        var i = _tweens.indexOf(tween);

                        if (i !== -1) {
                                _tweens.splice(i, 1);
                        }
                },

                update: function update(time, preserve) {

                        if (_tweens.length === 0) {
                                return false;
                        }

                        var i = 0;

                        time = time !== undefined ? time : TWEEN.now();

                        while (i < _tweens.length) {

                                if (_tweens[i].update(time) || preserve) {
                                        i++;
                                } else {
                                        _tweens.splice(i, 1);
                                }
                        }

                        return true;
                }
        };
}();

// Include a performance.now polyfill.
// In node.js, use process.hrtime.
if (typeof window === 'undefined' && typeof process !== 'undefined') {
        TWEEN.now = function () {
                var time = process.hrtime();

                // Convert [seconds, nanoseconds] to milliseconds.
                return time[0] * 1000 + time[1] / 1000000;
        };
}
// In a browser, use window.performance.now if it is available.
else if (typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined) {
                // This must be bound, because directly assigning this function
                // leads to an invocation exception in Chrome.
                TWEEN.now = window.performance.now.bind(window.performance);
        }
        // Use Date.now if it is available.
        else if (Date.now !== undefined) {
                        TWEEN.now = Date.now;
                }
                // Otherwise, use 'new Date().getTime()'.
                else {
                                TWEEN.now = function () {
                                        return new Date().getTime();
                                };
                        }

TWEEN.Tween = function (object) {

        var _object = object;
        var _valuesStart = {};
        var _valuesEnd = {};
        var _valuesStartRepeat = {};
        var _duration = 1000;
        var _repeat = 0;
        var _repeatDelayTime;
        var _yoyo = false;
        var _isPlaying = false;
        var _reversed = false;
        var _delayTime = 0;
        var _startTime = null;
        var _easingFunction = TWEEN.Easing.Linear.None;
        var _interpolationFunction = TWEEN.Interpolation.Linear;
        var _chainedTweens = [];
        var _onStartCallback = null;
        var _onStartCallbackFired = false;
        var _onUpdateCallback = null;
        var _onCompleteCallback = null;
        var _onStopCallback = null;

        this.to = function (properties, duration) {

                _valuesEnd = properties;

                if (duration !== undefined) {
                        _duration = duration;
                }

                return this;
        };

        this.start = function (time) {

                TWEEN.add(this);

                _isPlaying = true;

                _onStartCallbackFired = false;

                _startTime = time !== undefined ? time : TWEEN.now();
                _startTime += _delayTime;

                for (var property in _valuesEnd) {

                        // Check if an Array was provided as property value
                        if (_valuesEnd[property] instanceof Array) {

                                if (_valuesEnd[property].length === 0) {
                                        continue;
                                }

                                // Create a local copy of the Array with the start value at the front
                                _valuesEnd[property] = [_object[property]].concat(_valuesEnd[property]);
                        }

                        // If `to()` specifies a property that doesn't exist in the source object,
                        // we should not set that property in the object
                        if (_object[property] === undefined) {
                                continue;
                        }

                        // Save the starting value.
                        _valuesStart[property] = _object[property];

                        if (_valuesStart[property] instanceof Array === false) {
                                _valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
                        }

                        _valuesStartRepeat[property] = _valuesStart[property] || 0;
                }

                return this;
        };

        this.stop = function () {

                if (!_isPlaying) {
                        return this;
                }

                TWEEN.remove(this);
                _isPlaying = false;

                if (_onStopCallback !== null) {
                        _onStopCallback.call(_object, _object);
                }

                this.stopChainedTweens();
                return this;
        };

        this.end = function () {

                this.update(_startTime + _duration);
                return this;
        };

        this.stopChainedTweens = function () {

                for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
                        _chainedTweens[i].stop();
                }
        };

        this.delay = function (amount) {

                _delayTime = amount;
                return this;
        };

        this.repeat = function (times) {

                _repeat = times;
                return this;
        };

        this.repeatDelay = function (amount) {

                _repeatDelayTime = amount;
                return this;
        };

        this.yoyo = function (yoyo) {

                _yoyo = yoyo;
                return this;
        };

        this.easing = function (easing) {

                _easingFunction = easing;
                return this;
        };

        this.interpolation = function (interpolation) {

                _interpolationFunction = interpolation;
                return this;
        };

        this.chain = function () {

                _chainedTweens = arguments;
                return this;
        };

        this.onStart = function (callback) {

                _onStartCallback = callback;
                return this;
        };

        this.onUpdate = function (callback) {

                _onUpdateCallback = callback;
                return this;
        };

        this.onComplete = function (callback) {

                _onCompleteCallback = callback;
                return this;
        };

        this.onStop = function (callback) {

                _onStopCallback = callback;
                return this;
        };

        this.update = function (time) {

                var property;
                var elapsed;
                var value;

                if (time < _startTime) {
                        return true;
                }

                if (_onStartCallbackFired === false) {

                        if (_onStartCallback !== null) {
                                _onStartCallback.call(_object, _object);
                        }

                        _onStartCallbackFired = true;
                }

                elapsed = (time - _startTime) / _duration;
                elapsed = elapsed > 1 ? 1 : elapsed;

                value = _easingFunction(elapsed);

                for (property in _valuesEnd) {

                        // Don't update properties that do not exist in the source object
                        if (_valuesStart[property] === undefined) {
                                continue;
                        }

                        var start = _valuesStart[property] || 0;
                        var end = _valuesEnd[property];

                        if (end instanceof Array) {

                                _object[property] = _interpolationFunction(end, value);
                        } else {

                                // Parses relative end values with start as base (e.g.: +10, -3)
                                if (typeof end === 'string') {

                                        if (end.charAt(0) === '+' || end.charAt(0) === '-') {
                                                end = start + parseFloat(end);
                                        } else {
                                                end = parseFloat(end);
                                        }
                                }

                                // Protect against non numeric properties.
                                if (typeof end === 'number') {
                                        _object[property] = start + (end - start) * value;
                                }
                        }
                }

                if (_onUpdateCallback !== null) {
                        _onUpdateCallback.call(_object, value);
                }

                if (elapsed === 1) {

                        if (_repeat > 0) {

                                if (isFinite(_repeat)) {
                                        _repeat--;
                                }

                                // Reassign starting values, restart by making startTime = now
                                for (property in _valuesStartRepeat) {

                                        if (typeof _valuesEnd[property] === 'string') {
                                                _valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property]);
                                        }

                                        if (_yoyo) {
                                                var tmp = _valuesStartRepeat[property];

                                                _valuesStartRepeat[property] = _valuesEnd[property];
                                                _valuesEnd[property] = tmp;
                                        }

                                        _valuesStart[property] = _valuesStartRepeat[property];
                                }

                                if (_yoyo) {
                                        _reversed = !_reversed;
                                }

                                if (_repeatDelayTime !== undefined) {
                                        _startTime = time + _repeatDelayTime;
                                } else {
                                        _startTime = time + _delayTime;
                                }

                                return true;
                        } else {

                                if (_onCompleteCallback !== null) {

                                        _onCompleteCallback.call(_object, _object);
                                }

                                for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
                                        // Make the chained tweens start exactly at the time they should,
                                        // even if the `update()` method was called way past the duration of the tween
                                        _chainedTweens[i].start(_startTime + _duration);
                                }

                                return false;
                        }
                }

                return true;
        };
};

TWEEN.Easing = {

        Linear: {

                None: function None(k) {

                        return k;
                }

        },

        Quadratic: {

                In: function In(k) {

                        return k * k;
                },

                Out: function Out(k) {

                        return k * (2 - k);
                },

                InOut: function InOut(k) {

                        if ((k *= 2) < 1) {
                                return 0.5 * k * k;
                        }

                        return -0.5 * (--k * (k - 2) - 1);
                }

        },

        Cubic: {

                In: function In(k) {

                        return k * k * k;
                },

                Out: function Out(k) {

                        return --k * k * k + 1;
                },

                InOut: function InOut(k) {

                        if ((k *= 2) < 1) {
                                return 0.5 * k * k * k;
                        }

                        return 0.5 * ((k -= 2) * k * k + 2);
                }

        },

        Quartic: {

                In: function In(k) {

                        return k * k * k * k;
                },

                Out: function Out(k) {

                        return 1 - --k * k * k * k;
                },

                InOut: function InOut(k) {

                        if ((k *= 2) < 1) {
                                return 0.5 * k * k * k * k;
                        }

                        return -0.5 * ((k -= 2) * k * k * k - 2);
                }

        },

        Quintic: {

                In: function In(k) {

                        return k * k * k * k * k;
                },

                Out: function Out(k) {

                        return --k * k * k * k * k + 1;
                },

                InOut: function InOut(k) {

                        if ((k *= 2) < 1) {
                                return 0.5 * k * k * k * k * k;
                        }

                        return 0.5 * ((k -= 2) * k * k * k * k + 2);
                }

        },

        Sinusoidal: {

                In: function In(k) {

                        return 1 - Math.cos(k * Math.PI / 2);
                },

                Out: function Out(k) {

                        return Math.sin(k * Math.PI / 2);
                },

                InOut: function InOut(k) {

                        return 0.5 * (1 - Math.cos(Math.PI * k));
                }

        },

        Exponential: {

                In: function In(k) {

                        return k === 0 ? 0 : Math.pow(1024, k - 1);
                },

                Out: function Out(k) {

                        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
                },

                InOut: function InOut(k) {

                        if (k === 0) {
                                return 0;
                        }

                        if (k === 1) {
                                return 1;
                        }

                        if ((k *= 2) < 1) {
                                return 0.5 * Math.pow(1024, k - 1);
                        }

                        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
                }

        },

        Circular: {

                In: function In(k) {

                        return 1 - Math.sqrt(1 - k * k);
                },

                Out: function Out(k) {

                        return Math.sqrt(1 - --k * k);
                },

                InOut: function InOut(k) {

                        if ((k *= 2) < 1) {
                                return -0.5 * (Math.sqrt(1 - k * k) - 1);
                        }

                        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
                }

        },

        Elastic: {

                In: function In(k) {

                        if (k === 0) {
                                return 0;
                        }

                        if (k === 1) {
                                return 1;
                        }

                        return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
                },

                Out: function Out(k) {

                        if (k === 0) {
                                return 0;
                        }

                        if (k === 1) {
                                return 1;
                        }

                        return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
                },

                InOut: function InOut(k) {

                        if (k === 0) {
                                return 0;
                        }

                        if (k === 1) {
                                return 1;
                        }

                        k *= 2;

                        if (k < 1) {
                                return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
                        }

                        return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
                }

        },

        Back: {

                In: function In(k) {

                        var s = 1.70158;

                        return k * k * ((s + 1) * k - s);
                },

                Out: function Out(k) {

                        var s = 1.70158;

                        return --k * k * ((s + 1) * k + s) + 1;
                },

                InOut: function InOut(k) {

                        var s = 1.70158 * 1.525;

                        if ((k *= 2) < 1) {
                                return 0.5 * (k * k * ((s + 1) * k - s));
                        }

                        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
                }

        },

        Bounce: {

                In: function In(k) {

                        return 1 - TWEEN.Easing.Bounce.Out(1 - k);
                },

                Out: function Out(k) {

                        if (k < 1 / 2.75) {
                                return 7.5625 * k * k;
                        } else if (k < 2 / 2.75) {
                                return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
                        } else if (k < 2.5 / 2.75) {
                                return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
                        } else {
                                return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
                        }
                },

                InOut: function InOut(k) {

                        if (k < 0.5) {
                                return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
                        }

                        return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
                }

        }

};

TWEEN.Interpolation = {

        Linear: function Linear(v, k) {

                var m = v.length - 1;
                var f = m * k;
                var i = Math.floor(f);
                var fn = TWEEN.Interpolation.Utils.Linear;

                if (k < 0) {
                        return fn(v[0], v[1], f);
                }

                if (k > 1) {
                        return fn(v[m], v[m - 1], m - f);
                }

                return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
        },

        Bezier: function Bezier(v, k) {

                var b = 0;
                var n = v.length - 1;
                var pw = Math.pow;
                var bn = TWEEN.Interpolation.Utils.Bernstein;

                for (var i = 0; i <= n; i++) {
                        b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
                }

                return b;
        },

        CatmullRom: function CatmullRom(v, k) {

                var m = v.length - 1;
                var f = m * k;
                var i = Math.floor(f);
                var fn = TWEEN.Interpolation.Utils.CatmullRom;

                if (v[0] === v[m]) {

                        if (k < 0) {
                                i = Math.floor(f = m * (1 + k));
                        }

                        return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
                } else {

                        if (k < 0) {
                                return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
                        }

                        if (k > 1) {
                                return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
                        }

                        return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
                }
        },

        Utils: {

                Linear: function Linear(p0, p1, t) {

                        return (p1 - p0) * t + p0;
                },

                Bernstein: function Bernstein(n, i) {

                        var fc = TWEEN.Interpolation.Utils.Factorial;

                        return fc(n) / fc(i) / fc(n - i);
                },

                Factorial: function () {

                        var a = [1];

                        return function (n) {

                                var s = 1;

                                if (a[n]) {
                                        return a[n];
                                }

                                for (var i = n; i > 1; i--) {
                                        s *= i;
                                }

                                a[n] = s;
                                return s;
                        };
                }(),

                CatmullRom: function CatmullRom(p0, p1, p2, p3, t) {

                        var v0 = (p2 - p0) * 0.5;
                        var v1 = (p3 - p1) * 0.5;
                        var t2 = t * t;
                        var t3 = t * t2;

                        return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
                }

        }

};

function Canvas(width, height) {

    var canvas;

    if (typeof document === 'undefined') {

        // var Canvas = require('canvas');
        // canvas = new Canvas(width, height);

    } else {

        var canvas = document.createElement('canvas');

        if (width) {
            canvas.width = width;
        }

        if (height) {
            canvas.height = height;
        }
    }

    return canvas;
}

/**
 * @author kyle / http://nikai.us/
 */

/**
 * Category
 * @param {Object} [options]   Available options:
 *                             {Object} gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"}
 */
function Intensity(options) {

    options = options || {};
    this.gradient = options.gradient || {
        0.25: "rgba(0, 0, 255, 1)",
        0.55: "rgba(0, 255, 0, 1)",
        0.85: "rgba(255, 255, 0, 1)",
        1.0: "rgba(255, 0, 0, 1)"
    };
    this.maxSize = options.maxSize || 35;
    this.minSize = options.minSize || 0;
    this.max = options.max || 100;
    this.min = options.min || 0;
    this.initPalette();
}

Intensity.prototype.setMax = function (value) {
    this.max = value || 100;
};

Intensity.prototype.setMin = function (value) {
    this.min = value || 0;
};

Intensity.prototype.setMaxSize = function (maxSize) {
    this.maxSize = maxSize || 35;
};

Intensity.prototype.setMinSize = function (minSize) {
    this.minSize = minSize || 0;
};

Intensity.prototype.initPalette = function () {

    var gradient = this.gradient;

    var canvas = new Canvas(256, 1);

    var paletteCtx = this.paletteCtx = canvas.getContext('2d');

    var lineGradient = paletteCtx.createLinearGradient(0, 0, 256, 1);

    for (var key in gradient) {
        lineGradient.addColorStop(parseFloat(key), gradient[key]);
    }

    paletteCtx.fillStyle = lineGradient;
    paletteCtx.fillRect(0, 0, 256, 1);
};

Intensity.prototype.getColor = function (value) {

    var imageData = this.getImageData(value);

    return "rgba(" + imageData[0] + ", " + imageData[1] + ", " + imageData[2] + ", " + imageData[3] / 256 + ")";
};

Intensity.prototype.getImageData = function (value) {

    var imageData = this.paletteCtx.getImageData(0, 0, 256, 1).data;

    if (value === undefined) {
        return imageData;
    }

    var max = this.max;
    var min = this.min;

    if (value > max) {
        value = max;
    }

    if (value < min) {
        value = min;
    }

    var index = Math.floor((value - min) / (max - min) * (256 - 1)) * 4;

    return [imageData[index], imageData[index + 1], imageData[index + 2], imageData[index + 3]];
};

/**
 * @param Number value 
 * @param Number max of value
 * @param Number max of size
 * @param Object other options
 */
Intensity.prototype.getSize = function (value) {

    var size = 0;
    var max = this.max;
    var min = this.min;
    var maxSize = this.maxSize;
    var minSize = this.minSize;

    if (value > max) {
        value = max;
    }

    if (value < min) {
        value = min;
    }

    if (max > min) {
        size = minSize + (value - min) / (max - min) * (maxSize - minSize);
    } else {
        return maxSize;
    }

    return size;
};

Intensity.prototype.getLegend = function (options) {
    var gradient = this.gradient;

    var width = options.width || 20;
    var height = options.height || 180;

    var canvas = new Canvas(width, height);

    var paletteCtx = canvas.getContext('2d');

    var lineGradient = paletteCtx.createLinearGradient(0, height, 0, 0);

    for (var key in gradient) {
        lineGradient.addColorStop(parseFloat(key), gradient[key]);
    }

    paletteCtx.fillStyle = lineGradient;
    paletteCtx.fillRect(0, 0, width, height);

    return canvas;
};

/**
 * @author kyle / http://nikai.us/
 */

/**
 * Category
 * @param {Object} splitList:
 *   { 
 *       other: 1,
 *       1: 2,
 *       2: 3,
 *       3: 4,
 *       4: 5,
 *       5: 6,
 *       6: 7
 *   }
 */
function Category(splitList) {
    this.splitList = splitList || {
        other: 1
    };
}

Category.prototype.get = function (count) {

    var splitList = this.splitList;

    var value = splitList['other'];

    for (var i in splitList) {
        if (count == i) {
            value = splitList[i];
            break;
        }
    }

    return value;
};

/**
 * 根据DataSet自动生成对应的splitList
 */
Category.prototype.generateByDataSet = function (dataSet, color) {
    var colors = color || ['rgba(255, 255, 0, 0.8)', 'rgba(253, 98, 104, 0.8)', 'rgba(255, 146, 149, 0.8)', 'rgba(255, 241, 193, 0.8)', 'rgba(110, 176, 253, 0.8)', 'rgba(52, 139, 251, 0.8)', 'rgba(17, 102, 252, 0.8)'];
    var data = dataSet.get();
    this.splitList = {};
    var count = 0;
    for (var i = 0; i < data.length; i++) {
        if (this.splitList[data[i].count] === undefined) {
            this.splitList[data[i].count] = colors[count];
            count++;
        }
        if (count >= colors.length - 1) {
            break;
        }
    }

    this.splitList['other'] = colors[colors.length - 1];
};

Category.prototype.getLegend = function (options) {
    var splitList = this.splitList;
    var container = document.createElement('div');
    container.style.cssText = "background:#fff; padding: 5px; border: 1px solid #ccc;";
    var html = '';
    for (var key in splitList) {
        html += '<div style="line-height: 19px;" value="' + key + '"><span style="vertical-align: -2px; display: inline-block; width: 30px;height: 19px;background:' + splitList[key] + ';"></span><span style="margin-left: 3px;">' + key + '<span></div>';
    }
    container.innerHTML = html;
    return container;
};

/**
 * @author kyle / http://nikai.us/
 */

/**
 * Choropleth
 * @param {Object} splitList:
 *       [
 *           {
 *               start: 0,
 *               end: 2,
 *               value: randomColor()
 *           },{
 *               start: 2,
 *               end: 4,
 *               value: randomColor()
 *           },{
 *               start: 4,
 *               value: randomColor()
 *           }
 *       ];
 *
 */
function Choropleth(splitList) {
    this.splitList = splitList || [{
        start: 0,
        value: 'red'
    }];
}

Choropleth.prototype.get = function (count) {
    var splitList = this.splitList;

    var value = false;

    for (var i = 0; i < splitList.length; i++) {
        if ((splitList[i].start === undefined || splitList[i].start !== undefined && count >= splitList[i].start) && (splitList[i].end === undefined || splitList[i].end !== undefined && count < splitList[i].end)) {
            value = splitList[i].value;
            break;
        }
    }

    return value;
};

/**
 * 根据DataSet自动生成对应的splitList
 */
Choropleth.prototype.generateByDataSet = function (dataSet) {

    var min = dataSet.getMin('count');
    var max = dataSet.getMax('count');

    this.generateByMinMax(min, max);
};

/**
 * 根据DataSet自动生成对应的splitList
 */
Choropleth.prototype.generateByMinMax = function (min, max) {
    var colors = ['rgba(255, 255, 0, 0.8)', 'rgba(253, 98, 104, 0.8)', 'rgba(255, 146, 149, 0.8)', 'rgba(255, 241, 193, 0.8)', 'rgba(110, 176, 253, 0.8)', 'rgba(52, 139, 251, 0.8)', 'rgba(17, 102, 252, 0.8)'];
    var splitNum = Number((max - min) / 7);
    // console.log(splitNum)
    max = Number(max);
    var index = Number(min);
    this.splitList = [];
    var count = 0;

    while (index < max) {
        this.splitList.push({
            start: index,
            end: index + splitNum,
            value: colors[count]
        });
        count++;
        index += splitNum;
        // console.log(index, max)
    }
    // console.log('splitNum')
};

Choropleth.prototype.getLegend = function (options) {
    var splitList = this.splitList;
};

function hex_corner(center, size, i) {
    var angle_deg = 60 * i + 30;
    var angle_rad = Math.PI / 180 * angle_deg;
    return [center.x + size * Math.cos(angle_rad), center.y + size * Math.sin(angle_rad)];
}

function draw$1(context, x, y, size) {

    for (var j = 0; j < 6; j++) {

        var result = hex_corner({
            x: x,
            y: y
        }, size, j);

        context.lineTo(result[0], result[1]);
    }
}

/**
 * @author kyle / http://nikai.us/
 */

var pathSimple = {
    drawDataSet: function drawDataSet(context, dataSet, options) {

        var data = dataSet instanceof DataSet ? dataSet.get() : dataSet;

        for (var i = 0, len = data.length; i < len; i++) {
            var item = data[i];
            this.draw(context, item, options);
        }
    },
    draw: function draw$$1(context, data, options) {
        var type = data.geometry.type;
        var coordinates = data.geometry._coordinates || data.geometry.coordinates;
        var symbol = data.symbol || options.symbol || 'circle';
        switch (type) {
            case 'Point':
                var size = data._size || data.size || options._size || options.size || 5;
                if (symbol === 'circle') {
                    if (options.bigData === 'Point') {
                        context.moveTo(coordinates[0], coordinates[1]);
                    }
                    context.arc(coordinates[0], coordinates[1], size, 0, Math.PI * 2);
                } else if (symbol === 'rect') {
                    context.rect(coordinates[0] - size / 2, coordinates[1] - size / 2, size, size);
                } else if (symbol === 'honeycomb') {
                    draw$1(context, coordinates[0], coordinates[1], size);
                }
                break;
            case 'LineString':
                this.drawLineString(context, coordinates);
                break;
            case 'MultiLineString':
                for (var i = 0; i < coordinates.length; i++) {
                    var lineString = coordinates[i];
                    this.drawLineString(context, lineString);
                }
                break;
            case 'Polygon':
                this.drawPolygon(context, coordinates);
                break;
            case 'MultiPolygon':
                for (var i = 0; i < coordinates.length; i++) {
                    var polygon = coordinates[i];
                    this.drawPolygon(context, polygon);
                    if (options.multiPolygonDraw) {
                        var flag = options.multiPolygonDraw();
                        if (flag) {
                            return flag;
                        }
                    }
                }
                break;
            default:
                console.error('type' + type + 'is not support now!');
                break;
        }
    },

    drawLineString: function drawLineString(context, coordinates) {
        for (var j = 0; j < coordinates.length; j++) {
            var x = coordinates[j][0];
            var y = coordinates[j][1];
            if (j == 0) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
            }
        }
    },

    drawPolygon: function drawPolygon(context, coordinates) {
        context.beginPath();

        for (var i = 0; i < coordinates.length; i++) {
            var coordinate = coordinates[i];

            context.moveTo(coordinate[0][0], coordinate[0][1]);
            for (var j = 1; j < coordinate.length; j++) {
                context.lineTo(coordinate[j][0], coordinate[j][1]);
            }
            context.lineTo(coordinate[0][0], coordinate[0][1]);
            context.closePath();
        }
    }

};

var global$1 = typeof window === 'undefined' ? {} : window;

var devicePixelRatio = global$1.devicePixelRatio || 1;

/**
 * @author kyle / http://nikai.us/
 */

function createCircle(size) {

    var shadowBlur = size / 2;
    var r2 = size + shadowBlur;
    var offsetDistance = 10000;

    var circle = new Canvas(r2 * 2, r2 * 2);
    var context = circle.getContext('2d');

    context.shadowBlur = shadowBlur;
    context.shadowColor = 'black';
    context.shadowOffsetX = context.shadowOffsetY = offsetDistance;

    context.beginPath();
    context.arc(r2 - offsetDistance, r2 - offsetDistance, size, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    return circle;
}

function colorize(pixels, gradient, options) {
    var max = getMax(options);
    var min = getMin(options);
    var diff = max - min;
    var range = options.range || null;

    var jMin = 0;
    var jMax = 1024;
    if (range && range.length === 2) {
        jMin = (range[0] - min) / diff * 1024;
    }

    if (range && range.length === 2) {
        jMax = (range[1] - min) / diff * 1024;
    }

    var maxOpacity = options.maxOpacity || 0.8;
    var minOpacity = options.minOpacity || 0;
    var range = options.range;

    for (var i = 3, len = pixels.length, j; i < len; i += 4) {
        j = pixels[i] * 4; // get gradient color from opacity value

        if (pixels[i] / 256 > maxOpacity) {
            pixels[i] = 256 * maxOpacity;
        }
        if (pixels[i] / 256 < minOpacity) {
            pixels[i] = 256 * minOpacity;
        }

        if (j && j >= jMin && j <= jMax) {
            pixels[i - 3] = gradient[j];
            pixels[i - 2] = gradient[j + 1];
            pixels[i - 1] = gradient[j + 2];
        } else {
            pixels[i] = 0;
        }
    }
}

function getMax(options) {
    var max = options.max || 100;
    return max;
}

function getMin(options) {
    var min = options.min || 0;
    return min;
}

function drawGray(context, dataSet, options) {

    var max = getMax(options);
    var min = getMin(options);
    // console.log(max)
    var size = options._size;
    if (size == undefined) {
        size = options.size;
        if (size == undefined) {
            size = 13;
        }
    }

    var intensity = new Intensity({
        gradient: options.gradient,
        max: max,
        min: min
    });

    var circle = createCircle(size);
    var circleHalfWidth = circle.width / 2;
    var circleHalfHeight = circle.height / 2;

    var data = dataSet;

    var dataOrderByAlpha = {};

    data.forEach(function (item, index) {
        var count = item.count === undefined ? 1 : item.count;
        var alpha = Math.min(1, count / max).toFixed(2);
        dataOrderByAlpha[alpha] = dataOrderByAlpha[alpha] || [];
        dataOrderByAlpha[alpha].push(item);
    });

    for (var i in dataOrderByAlpha) {
        if (isNaN(i)) continue;
        var _data = dataOrderByAlpha[i];
        context.beginPath();
        if (!options.withoutAlpha) {
            context.globalAlpha = i;
        }
        context.strokeStyle = intensity.getColor(i * max);
        _data.forEach(function (item, index) {
            if (!item.geometry) {
                return;
            }

            var coordinates = item.geometry._coordinates || item.geometry.coordinates;
            var type = item.geometry.type;
            if (type === 'Point') {
                var count = item.count === undefined ? 1 : item.count;
                context.globalAlpha = count / max;
                context.drawImage(circle, coordinates[0] - circleHalfWidth, coordinates[1] - circleHalfHeight);
            } else if (type === 'LineString') {
                var count = item.count === undefined ? 1 : item.count;
                context.globalAlpha = count / max;
                context.beginPath();
                pathSimple.draw(context, item, options);
                context.stroke();
            } else if (type === 'Polygon') {}
        });
    }
}

function draw(context, dataSet, options) {
    if (context.canvas.width <= 0 || context.canvas.height <= 0) {
        return;
    }

    var strength = options.strength || 0.3;
    context.strokeStyle = 'rgba(0,0,0,' + strength + ')';

    var shadowCanvas = new Canvas(context.canvas.width, context.canvas.height);
    var shadowContext = shadowCanvas.getContext('2d');
    shadowContext.scale(devicePixelRatio, devicePixelRatio);

    options = options || {};

    var data = dataSet instanceof DataSet ? dataSet.get() : dataSet;

    context.save();

    var intensity = new Intensity({
        gradient: options.gradient
    });

    //console.time('drawGray')
    drawGray(shadowContext, data, options);

    //console.timeEnd('drawGray');
    // return false;
    if (!options.absolute) {
        //console.time('changeColor');
        var colored = shadowContext.getImageData(0, 0, context.canvas.width, context.canvas.height);
        colorize(colored.data, intensity.getImageData(), options);
        //console.timeEnd('changeColor');
        context.putImageData(colored, 0, 0);

        context.restore();
    }

    intensity = null;
    shadowCanvas = null;
}

var drawHeatmap = {
    draw: draw
};

/**
 * 根据2点获取角度
 * @param Array [123, 23] 点1
 * @param Array [123, 23] 点2
 * @return angle 角度,不是弧度
 */
function getAngle(start, end) {
    var diff_x = end[0] - start[0];
    var diff_y = end[1] - start[1];
    var deg = 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
    if (end[0] < start[0]) {
        deg = deg + 180;
    }
    return deg;
}

/**
 * 绘制沿线箭头
 * @author kyle / http://nikai.us/
 */

var imageCache = {};

var object = {
    draw: function draw(context, dataSet, options) {
        var imageCacheKey = 'http://huiyan.baidu.com/github/tools/gis-drawing/static/images/direction.png';
        if (options.arrow && options.arrow.url) {
            imageCacheKey = options.arrow.url;
        }

        if (!imageCache[imageCacheKey]) {
            imageCache[imageCacheKey] = null;
        }

        var directionImage = imageCache[imageCacheKey];

        if (!directionImage) {
            var args = Array.prototype.slice.call(arguments);
            var image = new Image();
            image.onload = function () {
                imageCache[imageCacheKey] = image;
                object.draw.apply(null, args);
            };
            image.src = imageCacheKey;
            return;
        }

        var data = dataSet instanceof DataSet ? dataSet.get() : dataSet;

        // console.log('xxxx',options)
        context.save();

        for (var key in options) {
            context[key] = options[key];
        }

        var points = [];
        var preCoordinate = null;
        for (var i = 0, len = data.length; i < len; i++) {

            var item = data[i];

            context.save();

            if (item.fillStyle || item._fillStyle) {
                context.fillStyle = item.fillStyle || item._fillStyle;
            }

            if (item.strokeStyle || item._strokeStyle) {
                context.strokeStyle = item.strokeStyle || item._strokeStyle;
            }

            var type = item.geometry.type;

            context.beginPath();
            if (type === 'LineString') {
                var coordinates = item.geometry._coordinates || item.geometry.coordinates;
                var interval = options.arrow.interval !== undefined ? options.arrow.interval : 1;
                for (var j = 0; j < coordinates.length; j += interval) {
                    if (coordinates[j] && coordinates[j + 1]) {
                        var coordinate = coordinates[j];

                        if (preCoordinate && getDistance(coordinate, preCoordinate) < 30) {
                            continue;
                        }

                        context.save();
                        var angle = getAngle(coordinates[j], coordinates[j + 1]);
                        context.translate(coordinate[0], coordinate[1]);
                        context.rotate(angle * Math.PI / 180);
                        context.drawImage(directionImage, -directionImage.width / 2 / 2, -directionImage.height / 2 / 2, directionImage.width / 2, directionImage.height / 2);
                        context.restore();

                        points.push(coordinate);
                        preCoordinate = coordinate;
                    }
                }
            }

            context.restore();
        }

        context.restore();
    }
};

function getDistance(coordinateA, coordinateB) {
    return Math.sqrt(Math.pow(coordinateA[0] - coordinateB[0], 2) + Math.pow(coordinateA[1] - coordinateB[1], 2));
}

/**
 * @author kyle / http://nikai.us/
 */

var drawSimple = {
    draw: function draw(context, dataSet, options) {

        var data = dataSet instanceof DataSet ? dataSet.get() : dataSet;

        // console.log('xxxx',options)
        context.save();

        for (var key in options) {
            context[key] = options[key];
        }

        // console.log(data);
        if (options.bigData) {
            context.save();
            context.beginPath();

            for (var i = 0, len = data.length; i < len; i++) {

                var item = data[i];

                pathSimple.draw(context, item, options);
            }

            var type = options.bigData;

            if (type == 'Point' || type == 'Polygon' || type == 'MultiPolygon') {

                context.fill();

                if (context.lineDash) {
                    context.setLineDash(context.lineDash);
                }

                if (item.lineDash) {
                    context.setLineDash(item.lineDash);
                }

                if ((item.strokeStyle || options.strokeStyle) && options.lineWidth) {
                    context.stroke();
                }
            } else if (type == 'LineString' || type == 'MultiLineString') {
                context.stroke();
            }

            context.restore();
        } else {

            for (var i = 0, len = data.length; i < len; i++) {

                var item = data[i];

                context.save();

                if (item.fillStyle || item._fillStyle) {
                    context.fillStyle = item.fillStyle || item._fillStyle;
                }

                if (item.strokeStyle || item._strokeStyle) {
                    context.strokeStyle = item.strokeStyle || item._strokeStyle;
                }

                if (context.lineDash) {
                    context.setLineDash(context.lineDash);
                }

                if (item.lineDash) {
                    context.setLineDash(item.lineDash);
                }

                var type = item.geometry.type;

                context.beginPath();

                options.multiPolygonDraw = function () {
                    context.fill();

                    if ((item.strokeStyle || options.strokeStyle) && options.lineWidth) {
                        context.stroke();
                    }
                };
                pathSimple.draw(context, item, options);

                if (type == 'Point' || type == 'Polygon' || type == 'MultiPolygon') {

                    context.fill();

                    if ((item.strokeStyle || options.strokeStyle) && options.lineWidth) {
                        context.stroke();
                    }
                } else if (type == 'LineString' || type == 'MultiLineString') {
                    if (item.lineWidth || item._lineWidth) {
                        context.lineWidth = item.lineWidth || item._lineWidth;
                    }
                    context.stroke();
                }

                context.restore();
            }
        }

        context.restore();
    }
};

/**
 * @author kyle / http://nikai.us/
 */

var clear = function (context) {
    context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //context.canvas.width = context.canvas.width;
    //context.canvas.height = context.canvas.height;
};

/**
 * @author Mofei Zhu<mapv@zhuwenlong.com>
 * This file is to draw text
 */

var drawClip = {
        draw: function draw(context, dataSet, options) {
                var data = dataSet instanceof DataSet ? dataSet.get() : dataSet;
                context.save();

                context.fillStyle = options.fillStyle || 'rgba(0, 0, 0, 0.5)';
                context.fillRect(0, 0, context.canvas.width, context.canvas.height);

                options.multiPolygonDraw = function () {
                        context.save();
                        context.clip();
                        clear(context);
                        context.restore();
                };

                for (var i = 0, len = data.length; i < len; i++) {

                        context.beginPath();

                        pathSimple.drawDataSet(context, [data[i]], options);
                        context.save();
                        context.clip();
                        clear(context);
                        context.restore();
                }

                context.restore();
        }
};

function createShader(gl, src, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    return shader;
}

function initShaders(gl, vs_source, fs_source) {

    var vertexShader = createShader(gl, vs_source, gl.VERTEX_SHADER);
    var fragmentShader = createShader(gl, fs_source, gl.FRAGMENT_SHADER);

    var glProgram = gl.createProgram();

    gl.attachShader(glProgram, vertexShader);
    gl.attachShader(glProgram, fragmentShader);
    gl.linkProgram(glProgram);

    gl.useProgram(glProgram);

    return glProgram;
}

function getColorData(color) {
    var tmpCanvas = document.createElement('canvas');
    var tmpCtx = tmpCanvas.getContext('2d');
    tmpCanvas.width = 1;
    tmpCanvas.height = 1;
    tmpCtx.fillStyle = color;
    tmpCtx.fillRect(0, 0, 1, 1);
    return tmpCtx.getImageData(0, 0, 1, 1).data;
}

var vs_s = ['attribute vec4 a_Position;', 'void main() {', 'gl_Position = a_Position;', 'gl_PointSize = 30.0;', '}'].join('');

var fs_s = ['precision mediump float;', 'uniform vec4 u_FragColor;', 'void main() {', 'gl_FragColor = u_FragColor;', '}'].join('');

function draw$2(gl, data, options) {

    if (!data) {
        return;
    }

    var program = initShaders(gl, vs_s, fs_s);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    //gl.clearColor(0.0, 0.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var halfCanvasWidth = gl.canvas.width / 2;
    var halfCanvasHeight = gl.canvas.height / 2;

    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    var a_Position = gl.getAttribLocation(program, 'a_Position');
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    var uFragColor = gl.getUniformLocation(program, 'u_FragColor');

    var colored = getColorData(options.strokeStyle || 'red');

    gl.uniform4f(uFragColor, colored[0] / 255, colored[1] / 255, colored[2] / 255, colored[3] / 255);

    gl.lineWidth(options.lineWidth || 1);

    for (var i = 0, len = data.length; i < len; i++) {
        var _geometry = data[i].geometry._coordinates;

        var verticesData = [];

        for (var j = 0; j < _geometry.length; j++) {
            var item = _geometry[j];

            var x = (item[0] - halfCanvasWidth) / halfCanvasWidth;
            var y = (halfCanvasHeight - item[1]) / halfCanvasHeight;
            verticesData.push(x, y);
        }

        var vertices = new Float32Array(verticesData);
        // Write date into the buffer object
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.drawArrays(gl.LINE_STRIP, 0, _geometry.length);
    }
}

var line = {
    draw: draw$2
};

var vs_s$1 = ['attribute vec4 a_Position;', 'attribute float a_PointSize;', 'void main() {', 'gl_Position = a_Position;', 'gl_PointSize = a_PointSize;', '}'].join('');

var fs_s$1 = ['precision mediump float;', 'uniform vec4 u_FragColor;', 'void main() {', 'gl_FragColor = u_FragColor;', '}'].join('');

function draw$3(gl, data, options) {

    if (!data) {
        return;
    }

    var program = initShaders(gl, vs_s$1, fs_s$1);

    var a_Position = gl.getAttribLocation(program, 'a_Position');

    var a_PointSize = gl.getAttribLocation(program, 'a_PointSize');

    var uFragColor = gl.getUniformLocation(program, 'u_FragColor');

    //gl.clearColor(0.0, 0.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var halfCanvasWidth = gl.canvas.width / 2;
    var halfCanvasHeight = gl.canvas.height / 2;

    var verticesData = [];
    var count = 0;
    for (var i = 0; i < data.length; i++) {
        var item = data[i].geometry._coordinates;

        var x = (item[0] - halfCanvasWidth) / halfCanvasWidth;
        var y = (halfCanvasHeight - item[1]) / halfCanvasHeight;

        if (x < -1 || x > 1 || y < -1 || y > 1) {
            continue;
        }
        verticesData.push(x, y);
        count++;
    }

    var vertices = new Float32Array(verticesData);
    var n = count; // The number of vertices

    // Create a buffer object
    var vertexBuffer = gl.createBuffer();

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    gl.vertexAttrib1f(a_PointSize, options._size);

    var colored = getColorData(options.fillStyle || 'red');

    gl.uniform4f(uFragColor, colored[0] / 255, colored[1] / 255, colored[2] / 255, colored[3] / 255);
    gl.drawArrays(gl.POINTS, 0, n);
}

var point = {
    draw: draw$3
};

function earcut(data, holeIndices, dim) {

    dim = dim || 2;

    var hasHoles = holeIndices && holeIndices.length,
        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
        outerNode = linkedList(data, 0, outerLen, dim, true),
        triangles = [];

    if (!outerNode) return triangles;

    var minX, minY, maxX, maxY, x, y, size;

    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);

    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
    if (data.length > 80 * dim) {
        minX = maxX = data[0];
        minY = maxY = data[1];

        for (var i = dim; i < outerLen; i += dim) {
            x = data[i];
            y = data[i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }

        // minX, minY and size are later used to transform coords into integers for z-order calculation
        size = Math.max(maxX - minX, maxY - minY);
    }

    earcutLinked(outerNode, triangles, dim, minX, minY, size);

    return triangles;
}

// create a circular doubly linked list from polygon points in the specified winding order
function linkedList(data, start, end, dim, clockwise) {
    var i, last;

    if (clockwise === signedArea(data, start, end, dim) > 0) {
        for (i = start; i < end; i += dim) {
            last = insertNode(i, data[i], data[i + 1], last);
        }
    } else {
        for (i = end - dim; i >= start; i -= dim) {
            last = insertNode(i, data[i], data[i + 1], last);
        }
    }

    if (last && equals(last, last.next)) {
        removeNode(last);
        last = last.next;
    }

    return last;
}

// eliminate colinear or duplicate points
function filterPoints(start, end) {
    if (!start) return start;
    if (!end) end = start;

    var p = start,
        again;
    do {
        again = false;

        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
            removeNode(p);
            p = end = p.prev;
            if (p === p.next) return null;
            again = true;
        } else {
            p = p.next;
        }
    } while (again || p !== end);

    return end;
}

// main ear slicing loop which triangulates a polygon (given as a linked list)
function earcutLinked(ear, triangles, dim, minX, minY, size, pass) {
    if (!ear) return;

    // interlink polygon nodes in z-order
    if (!pass && size) indexCurve(ear, minX, minY, size);

    var stop = ear,
        prev,
        next;

    // iterate through ears, slicing them one by one
    while (ear.prev !== ear.next) {
        prev = ear.prev;
        next = ear.next;

        if (size ? isEarHashed(ear, minX, minY, size) : isEar(ear)) {
            // cut off the triangle
            triangles.push(prev.i / dim);
            triangles.push(ear.i / dim);
            triangles.push(next.i / dim);

            removeNode(ear);

            // skipping the next vertice leads to less sliver triangles
            ear = next.next;
            stop = next.next;

            continue;
        }

        ear = next;

        // if we looped through the whole remaining polygon and can't find any more ears
        if (ear === stop) {
            // try filtering points and slicing again
            if (!pass) {
                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, size, 1);

                // if this didn't work, try curing all small self-intersections locally
            } else if (pass === 1) {
                ear = cureLocalIntersections(ear, triangles, dim);
                earcutLinked(ear, triangles, dim, minX, minY, size, 2);

                // as a last resort, try splitting the remaining polygon into two
            } else if (pass === 2) {
                splitEarcut(ear, triangles, dim, minX, minY, size);
            }

            break;
        }
    }
}

// check whether a polygon node forms a valid ear with adjacent nodes
function isEar(ear) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // now make sure we don't have other points inside the potential ear
    var p = ear.next.next;

    while (p !== ear.prev) {
        if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
    }

    return true;
}

function isEarHashed(ear, minX, minY, size) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // triangle bbox; min & max are calculated like this for speed
    var minTX = a.x < b.x ? a.x < c.x ? a.x : c.x : b.x < c.x ? b.x : c.x,
        minTY = a.y < b.y ? a.y < c.y ? a.y : c.y : b.y < c.y ? b.y : c.y,
        maxTX = a.x > b.x ? a.x > c.x ? a.x : c.x : b.x > c.x ? b.x : c.x,
        maxTY = a.y > b.y ? a.y > c.y ? a.y : c.y : b.y > c.y ? b.y : c.y;

    // z-order range for the current triangle bbox;
    var minZ = zOrder(minTX, minTY, minX, minY, size),
        maxZ = zOrder(maxTX, maxTY, minX, minY, size);

    // first look for points inside the triangle in increasing z-order
    var p = ear.nextZ;

    while (p && p.z <= maxZ) {
        if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
        p = p.nextZ;
    }

    // then look for points in decreasing z-order
    p = ear.prevZ;

    while (p && p.z >= minZ) {
        if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
    }

    return true;
}

// go through all polygon nodes and cure small local self-intersections
function cureLocalIntersections(start, triangles, dim) {
    var p = start;
    do {
        var a = p.prev,
            b = p.next.next;

        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {

            triangles.push(a.i / dim);
            triangles.push(p.i / dim);
            triangles.push(b.i / dim);

            // remove two nodes involved
            removeNode(p);
            removeNode(p.next);

            p = start = b;
        }
        p = p.next;
    } while (p !== start);

    return p;
}

// try splitting polygon into two and triangulate them independently
function splitEarcut(start, triangles, dim, minX, minY, size) {
    // look for a valid diagonal that divides the polygon into two
    var a = start;
    do {
        var b = a.next.next;
        while (b !== a.prev) {
            if (a.i !== b.i && isValidDiagonal(a, b)) {
                // split the polygon in two by the diagonal
                var c = splitPolygon(a, b);

                // filter colinear points around the cuts
                a = filterPoints(a, a.next);
                c = filterPoints(c, c.next);

                // run earcut on each half
                earcutLinked(a, triangles, dim, minX, minY, size);
                earcutLinked(c, triangles, dim, minX, minY, size);
                return;
            }
            b = b.next;
        }
        a = a.next;
    } while (a !== start);
}

// link every hole into the outer loop, producing a single-ring polygon without holes
function eliminateHoles(data, holeIndices, outerNode, dim) {
    var queue = [],
        i,
        len,
        start,
        end,
        list;

    for (i = 0, len = holeIndices.length; i < len; i++) {
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next) list.steiner = true;
        queue.push(getLeftmost(list));
    }

    queue.sort(compareX);

    // process holes from left to right
    for (i = 0; i < queue.length; i++) {
        eliminateHole(queue[i], outerNode);
        outerNode = filterPoints(outerNode, outerNode.next);
    }

    return outerNode;
}

function compareX(a, b) {
    return a.x - b.x;
}

// find a bridge between vertices that connects hole with an outer ring and and link it
function eliminateHole(hole, outerNode) {
    outerNode = findHoleBridge(hole, outerNode);
    if (outerNode) {
        var b = splitPolygon(outerNode, hole);
        filterPoints(b, b.next);
    }
}

// David Eberly's algorithm for finding a bridge between hole and outer polygon
function findHoleBridge(hole, outerNode) {
    var p = outerNode,
        hx = hole.x,
        hy = hole.y,
        qx = -Infinity,
        m;

    // find a segment intersected by a ray from the hole's leftmost point to the left;
    // segment's endpoint with lesser x will be potential connection point
    do {
        if (hy <= p.y && hy >= p.next.y) {
            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
            if (x <= hx && x > qx) {
                qx = x;
                if (x === hx) {
                    if (hy === p.y) return p;
                    if (hy === p.next.y) return p.next;
                }
                m = p.x < p.next.x ? p : p.next;
            }
        }
        p = p.next;
    } while (p !== outerNode);

    if (!m) return null;

    if (hx === qx) return m.prev; // hole touches outer segment; pick lower endpoint

    // look for points inside the triangle of hole point, segment intersection and endpoint;
    // if there are no points found, we have a valid connection;
    // otherwise choose the point of the minimum angle with the ray as connection point

    var stop = m,
        mx = m.x,
        my = m.y,
        tanMin = Infinity,
        tan;

    p = m.next;

    while (p !== stop) {
        if (hx >= p.x && p.x >= mx && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {

            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

            if ((tan < tanMin || tan === tanMin && p.x > m.x) && locallyInside(p, hole)) {
                m = p;
                tanMin = tan;
            }
        }

        p = p.next;
    }

    return m;
}

// interlink polygon nodes in z-order
function indexCurve(start, minX, minY, size) {
    var p = start;
    do {
        if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, size);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
    } while (p !== start);

    p.prevZ.nextZ = null;
    p.prevZ = null;

    sortLinked(p);
}

// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
function sortLinked(list) {
    var i,
        p,
        q,
        e,
        tail,
        numMerges,
        pSize,
        qSize,
        inSize = 1;

    do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;

        while (p) {
            numMerges++;
            q = p;
            pSize = 0;
            for (i = 0; i < inSize; i++) {
                pSize++;
                q = q.nextZ;
                if (!q) break;
            }

            qSize = inSize;

            while (pSize > 0 || qSize > 0 && q) {

                if (pSize === 0) {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                } else if (qSize === 0 || !q) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else if (p.z <= q.z) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                }

                if (tail) tail.nextZ = e;else list = e;

                e.prevZ = tail;
                tail = e;
            }

            p = q;
        }

        tail.nextZ = null;
        inSize *= 2;
    } while (numMerges > 1);

    return list;
}

// z-order of a point given coords and size of the data bounding box
function zOrder(x, y, minX, minY, size) {
    // coords are transformed into non-negative 15-bit integer range
    x = 32767 * (x - minX) / size;
    y = 32767 * (y - minY) / size;

    x = (x | x << 8) & 0x00FF00FF;
    x = (x | x << 4) & 0x0F0F0F0F;
    x = (x | x << 2) & 0x33333333;
    x = (x | x << 1) & 0x55555555;

    y = (y | y << 8) & 0x00FF00FF;
    y = (y | y << 4) & 0x0F0F0F0F;
    y = (y | y << 2) & 0x33333333;
    y = (y | y << 1) & 0x55555555;

    return x | y << 1;
}

// find the leftmost node of a polygon ring
function getLeftmost(start) {
    var p = start,
        leftmost = start;
    do {
        if (p.x < leftmost.x) leftmost = p;
        p = p.next;
    } while (p !== start);

    return leftmost;
}

// check if a point lies within a convex triangle
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 && (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 && (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
}

// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
function isValidDiagonal(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b);
}

// signed area of a triangle
function area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

// check if two points are equal
function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}

// check if two segments intersect
function intersects(p1, q1, p2, q2) {
    if (equals(p1, q1) && equals(p2, q2) || equals(p1, q2) && equals(p2, q1)) return true;
    return area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 && area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0;
}

// check if a polygon diagonal intersects any polygon segments
function intersectsPolygon(a, b) {
    var p = a;
    do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b)) return true;
        p = p.next;
    } while (p !== a);

    return false;
}

// check if a polygon diagonal is locally inside the polygon
function locallyInside(a, b) {
    return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}

// check if the middle point of a polygon diagonal is inside the polygon
function middleInside(a, b) {
    var p = a,
        inside = false,
        px = (a.x + b.x) / 2,
        py = (a.y + b.y) / 2;
    do {
        if (p.y > py !== p.next.y > py && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x) inside = !inside;
        p = p.next;
    } while (p !== a);

    return inside;
}

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function splitPolygon(a, b) {
    var a2 = new Node(a.i, a.x, a.y),
        b2 = new Node(b.i, b.x, b.y),
        an = a.next,
        bp = b.prev;

    a.next = b;
    b.prev = a;

    a2.next = an;
    an.prev = a2;

    b2.next = a2;
    a2.prev = b2;

    bp.next = b2;
    b2.prev = bp;

    return b2;
}

// create a node and optionally link it with previous one (in a circular doubly linked list)
function insertNode(i, x, y, last) {
    var p = new Node(i, x, y);

    if (!last) {
        p.prev = p;
        p.next = p;
    } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    }
    return p;
}

function removeNode(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;

    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}

function Node(i, x, y) {
    // vertice index in coordinates array
    this.i = i;

    // vertex coordinates
    this.x = x;
    this.y = y;

    // previous and next vertice nodes in a polygon ring
    this.prev = null;
    this.next = null;

    // z-order curve value
    this.z = null;

    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;

    // indicates whether this is a steiner point
    this.steiner = false;
}

// return a percentage difference between the polygon area and its triangulation area;
// used to verify correctness of triangulation
earcut.deviation = function (data, holeIndices, dim, triangles) {
    var hasHoles = holeIndices && holeIndices.length;
    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;

    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
    if (hasHoles) {
        for (var i = 0, len = holeIndices.length; i < len; i++) {
            var start = holeIndices[i] * dim;
            var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
            polygonArea -= Math.abs(signedArea(data, start, end, dim));
        }
    }

    var trianglesArea = 0;
    for (i = 0; i < triangles.length; i += 3) {
        var a = triangles[i] * dim;
        var b = triangles[i + 1] * dim;
        var c = triangles[i + 2] * dim;
        trianglesArea += Math.abs((data[a] - data[c]) * (data[b + 1] - data[a + 1]) - (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
    }

    return polygonArea === 0 && trianglesArea === 0 ? 0 : Math.abs((trianglesArea - polygonArea) / polygonArea);
};

function signedArea(data, start, end, dim) {
    var sum = 0;
    for (var i = start, j = end - dim; i < end; i += dim) {
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    }
    return sum;
}

// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
earcut.flatten = function (data) {
    var dim = data[0][0].length,
        result = { vertices: [], holes: [], dimensions: dim },
        holeIndex = 0;

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            for (var d = 0; d < dim; d++) {
                result.vertices.push(data[i][j][d]);
            }
        }
        if (i > 0) {
            holeIndex += data[i - 1].length;
            result.holes.push(holeIndex);
        }
    }
    return result;
};

var vs_s$2 = ['attribute vec4 a_Position;', 'void main() {', 'gl_Position = a_Position;', 'gl_PointSize = 30.0;', '}'].join('');

var fs_s$2 = ['precision mediump float;', 'uniform vec4 u_FragColor;', 'void main() {', 'gl_FragColor = u_FragColor;', '}'].join('');

function draw$4(gl, data, options) {

    if (!data) {
        return;
    }

    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    var program = initShaders(gl, vs_s$2, fs_s$2);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    var halfCanvasWidth = gl.canvas.width / 2;
    var halfCanvasHeight = gl.canvas.height / 2;

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());

    var a_Position = gl.getAttribLocation(program, 'a_Position');
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    var uFragColor = gl.getUniformLocation(program, 'u_FragColor');

    var colored = getColorData(options.fillStyle || 'red');

    gl.uniform4f(uFragColor, colored[0] / 255, colored[1] / 255, colored[2] / 255, colored[3] / 255);

    gl.lineWidth(options.lineWidth || 1);

    var verticesArr = [];
    var trianglesArr = [];

    var maxSize = 65536;
    var indexOffset = 0;

    for (var i = 0, len = data.length; i < len; i++) {

        var flatten = earcut.flatten(data[i].geometry._coordinates || data[i].geometry.coordinates);
        var vertices = flatten.vertices;
        indexOffset = verticesArr.length / 2;
        for (var j = 0; j < vertices.length; j += 2) {
            vertices[j] = (vertices[j] - halfCanvasWidth) / halfCanvasWidth;
            vertices[j + 1] = (halfCanvasHeight - vertices[j + 1]) / halfCanvasHeight;
        }

        if ((verticesArr.length + vertices.length) / 2 > maxSize) {
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesArr), gl.STATIC_DRAW);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(trianglesArr), gl.STATIC_DRAW);
            gl.drawElements(gl.TRIANGLES, trianglesArr.length, gl.UNSIGNED_SHORT, 0);
            verticesArr.length = 0;
            trianglesArr.length = 0;
            indexOffset = 0;
        }

        for (var j = 0; j < vertices.length; j++) {
            verticesArr.push(vertices[j]);
        }

        var triangles = earcut(vertices, flatten.holes, flatten.dimensions);
        for (var j = 0; j < triangles.length; j++) {
            trianglesArr.push(triangles[j] + indexOffset);
        }
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesArr), gl.STATIC_DRAW);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(trianglesArr), gl.STATIC_DRAW);
    gl.drawElements(gl.TRIANGLES, trianglesArr.length, gl.UNSIGNED_SHORT, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

var polygon = {
    draw: draw$4
};

/**
 * @author kyle / http://nikai.us/
 */
var webglDrawSimple = {
    draw: function draw(gl, dataSet, options) {
        var data = dataSet instanceof DataSet ? dataSet.get() : dataSet;
        if (data.length > 0) {
            if (data[0].geometry.type == "LineString") {
                line.draw(gl, data, options);
            } else if (data[0].geometry.type == "Polygon" || data[0].geometry.type == "MultiPolygon") {
                polygon.draw(gl, data, options);
            } else {
                point.draw(gl, data, options);
            }
        }
    }
};

/**
 * @author kyle / http://nikai.us/
 */

var drawGrid = {
    draw: function draw(context, dataSet, options) {

        context.save();

        var data = dataSet instanceof DataSet ? dataSet.get() : dataSet;

        var grids = {};

        var size = options._size || options.size || 50;

        // 后端传入数据为网格数据时，传入enableCluster为false，前端不进行删格化操作，直接画方格	
        var enableCluster = 'enableCluster' in options ? options.enableCluster : true;

        var offset = options.offset || {
            x: 0,
            y: 0
        };

        var intensity = new Intensity({
            min: options.min || 0,
            max: options.max || 100,
            gradient: options.gradient
        });

        if (!enableCluster) {
            for (var i = 0; i < data.length; i++) {
                var coordinates = data[i].geometry._coordinates || data[i].geometry.coordinates;
                var gridKey = coordinates.join(',');
                grids[gridKey] = data[i].count || 1;
            }
            for (var _gridKey in grids) {
                _gridKey = _gridKey.split(',');

                context.beginPath();
                context.rect(+_gridKey[0] - size / 2, +_gridKey[1] - size / 2, size, size);
                context.fillStyle = intensity.getColor(grids[_gridKey]);
                context.fill();
                if (options.strokeStyle && options.lineWidth) {
                    context.stroke();
                }
            }
        } else {
            for (var _i = 0; _i < data.length; _i++) {
                var coordinates = data[_i].geometry._coordinates || data[_i].geometry.coordinates;
                var gridKey = Math.floor((coordinates[0] - offset.x) / size) + ',' + Math.floor((coordinates[1] - offset.y) / size);
                if (!grids[gridKey]) {
                    grids[gridKey] = 0;
                }

                grids[gridKey] += ~~(data[_i].count || 1);
            }

            for (var _gridKey2 in grids) {
                _gridKey2 = _gridKey2.split(',');

                context.beginPath();
                context.rect(_gridKey2[0] * size + .5 + offset.x, _gridKey2[1] * size + .5 + offset.y, size, size);
                context.fillStyle = intensity.getColor(grids[_gridKey2]);
                context.fill();
                if (options.strokeStyle && options.lineWidth) {
                    context.stroke();
                }
            }
        }

        if (options.label && options.label.show !== false) {

            context.fillStyle = options.label.fillStyle || 'white';

            if (options.label.font) {
                context.font = options.label.font;
            }

            if (options.label.shadowColor) {
                context.shadowColor = options.label.shadowColor;
            }

            if (options.label.shadowBlur) {
                context.shadowBlur = options.label.shadowBlur;
            }

            for (var gridKey in grids) {
                gridKey = gridKey.split(',');
                var text = grids[gridKey];
                var textWidth = context.measureText(text).width;
                if (!enableCluster) {
                    context.fillText(text, +gridKey[0] - textWidth / 2, +gridKey[1] + 5);
                } else {
                    context.fillText(text, gridKey[0] * size + .5 + offset.x + size / 2 - textWidth / 2, gridKey[1] * size + .5 + offset.y + size / 2 + 5);
                }
            }
        }

        context.restore();
    }
};

/**
 * @author kyle / http://nikai.us/
 */

var imageMap = {};
var stacks = {};
var drawCluster = {
    draw: function draw(context, dataSet, options) {
        context.save();
        var data = dataSet instanceof DataSet ? dataSet.get() : dataSet;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var coordinates = item.geometry._coordinates || item.geometry.coordinates;
            context.beginPath();
            if (item.properties && item.properties.cluster) {
                context.arc(coordinates[0], coordinates[1], item.size, 0, Math.PI * 2);
                context.fillStyle = item.fillStyle;
                context.fill();

                if (options.label && options.label.show !== false) {
                    context.fillStyle = options.label.fillStyle || 'white';

                    if (options.label.font) {
                        context.font = options.label.font;
                    }

                    if (options.label.shadowColor) {
                        context.shadowColor = options.label.shadowColor;
                    }

                    if (options.label.shadowBlur) {
                        context.shadowBlur = options.label.shadowBlur;
                    }

                    var text = item.properties.point_count;
                    var textWidth = context.measureText(text).width;
                    context.fillText(text, coordinates[0] + 0.5 - textWidth / 2, coordinates[1] + 0.5 + 3);
                }
            } else {
                this.drawIcon(item, options, context);
            }
        }
        context.restore();
    },
    drawIcon: function drawIcon(item, options, context) {
        var _ref = item.geometry._coordinates || item.geometry.coordinates,
            _ref2 = slicedToArray(_ref, 2),
            x = _ref2[0],
            y = _ref2[1];

        var iconOptions = Object.assign({}, options.iconOptions, item.iconOptions);
        var drawPoint = function drawPoint() {
            context.beginPath();
            context.arc(x, y, options.size || 5, 0, Math.PI * 2);
            context.fillStyle = options.fillStyle || 'red';
            context.fill();
        };
        if (!iconOptions.url) {
            drawPoint();
            return;
        }
        var iconWidth = iconOptions.width;
        var iconHeight = iconOptions.height;
        var iconOffset = iconOptions.offset || { x: 0, y: 0 };
        x = x - ~~iconWidth / 2 + iconOffset.x;
        y = y - ~~iconHeight / 2 + iconOffset.y;
        var url = window.encodeURIComponent(iconOptions.url);
        var img = imageMap[url];
        if (img) {
            if (img === 'error') {
                drawPoint();
            } else if (iconWidth && iconHeight) {
                context.drawImage(img, x, y, iconWidth, iconHeight);
            } else {
                context.drawImage(img, x, y);
            }
        } else {
            if (!stacks[url]) {
                stacks[url] = [];
                getImage(url, function (img, src) {
                    stacks[src] && stacks[src].forEach(function (fun) {
                        return fun(img);
                    });
                    stacks[src] = null;
                    imageMap[src] = img;
                }, function (src) {
                    stacks[src] && stacks[src].forEach(function (fun) {
                        return fun('error', src);
                    });
                    stacks[src] = null;
                    imageMap[src] = 'error';
                    drawPoint();
                });
            }
            stacks[url].push(function (x, y, iconWidth, iconHeight) {
                return function (img) {
                    if (img === 'error') {
                        drawPoint();
                    } else if (iconWidth && iconHeight) {
                        context.drawImage(img, x, y, iconWidth, iconHeight);
                    } else {
                        context.drawImage(img, x, y);
                    }
                };
            }(x, y, iconWidth, iconHeight));
        }
    }
};

function getImage(url, callback, fallback) {
    var img = new Image();
    img.onload = function () {
        callback && callback(img, url);
    };
    img.onerror = function () {
        fallback && fallback(url);
    };
    img.src = window.decodeURIComponent(url);
}

/**
 * @author kyle / http://nikai.us/
 */

function hex_corner$1(center, size, i) {
    var angle_deg = 60 * i + 30;
    var angle_rad = Math.PI / 180 * angle_deg;
    return [center.x + size * Math.cos(angle_rad), center.y + size * Math.sin(angle_rad)];
}

var drawHoneycomb = {
    draw: function draw(context, dataSet, options) {

        context.save();

        var data = dataSet instanceof DataSet ? dataSet.get() : dataSet;

        for (var key in options) {
            context[key] = options[key];
        }

        var grids = {};

        var offset = options.offset || {
            x: 10,
            y: 10
        };

        var r = options._size || options.size || 40;
        r = r / 2 / Math.sin(Math.PI / 3);
        var dx = r * 2 * Math.sin(Math.PI / 3);
        var dy = r * 1.5;

        var binsById = {};

        for (var i = 0; i < data.length; i++) {
            var coordinates = data[i].geometry._coordinates || data[i].geometry.coordinates;
            var py = (coordinates[1] - offset.y) / dy,
                pj = Math.round(py),
                px = (coordinates[0] - offset.x) / dx - (pj & 1 ? .5 : 0),
                pi = Math.round(px),
                py1 = py - pj;

            if (Math.abs(py1) * 3 > 1) {
                var px1 = px - pi,
                    pi2 = pi + (px < pi ? -1 : 1) / 2,
                    pj2 = pj + (py < pj ? -1 : 1),
                    px2 = px - pi2,
                    py2 = py - pj2;
                if (px1 * px1 + py1 * py1 > px2 * px2 + py2 * py2) pi = pi2 + (pj & 1 ? 1 : -1) / 2, pj = pj2;
            }

            var id = pi + "-" + pj,
                bin = binsById[id];
            if (bin) {
                bin.push(data[i]);
            } else {
                bin = binsById[id] = [data[i]];
                bin.i = pi;
                bin.j = pj;
                bin.x = (pi + (pj & 1 ? 1 / 2 : 0)) * dx;
                bin.y = pj * dy;
            }
        }

        var intensity = new Intensity({
            max: options.max || 100,
            maxSize: r,
            gradient: options.gradient
        });

        for (var key in binsById) {

            var item = binsById[key];

            context.beginPath();

            for (var j = 0; j < 6; j++) {

                var result = hex_corner$1({
                    x: item.x + offset.x,
                    y: item.y + offset.y
                }, r, j);

                context.lineTo(result[0], result[1]);
            }

            context.closePath();

            var count = 0;
            for (var i = 0; i < item.length; i++) {
                count += item[i].count || 1;
            }
            item.count = count;

            context.fillStyle = intensity.getColor(count);
            context.fill();
            if (options.strokeStyle && options.lineWidth) {
                context.stroke();
            }
        }

        if (options.label && options.label.show !== false) {

            context.fillStyle = options.label.fillStyle || 'white';

            if (options.label.font) {
                context.font = options.label.font;
            }

            if (options.label.shadowColor) {
                context.shadowColor = options.label.shadowColor;
            }

            if (options.label.shadowBlur) {
                context.shadowBlur = options.label.shadowBlur;
            }

            for (var key in binsById) {
                var item = binsById[key];
                var text = item.count;
                if (text < 0) {
                    text = text.toFixed(2);
                } else {
                    text = ~~text;
                }
                var textWidth = context.measureText(text).width;
                context.fillText(text, item.x + offset.x - textWidth / 2, item.y + offset.y + 5);
            }
        }

        context.restore();
    }
};

/**
 * @author Mofei Zhu<mapv@zhuwenlong.com>
 * This file is to draw text
 */

var drawText = {
    draw: function draw(context, dataSet, options) {

        var data = dataSet instanceof DataSet ? dataSet.get() : dataSet;
        context.save();

        // set from options
        for (var key in options) {
            context[key] = options[key];
        }

        var rects = [];

        var size = options._size || options.size;
        if (size) {
            context.font = "bold " + size + "px Arial";
        } else {
            size = 12;
        }

        var textKey = options.textKey || 'text';

        if (!options.textAlign) {
            context.textAlign = 'center';
        }

        if (!options.textBaseline) {
            context.textBaseline = 'middle';
        }

        if (options.avoid) {
            // 标注避让
            for (var i = 0, len = data.length; i < len; i++) {

                var offset = data[i].offset || options.offset || {
                    x: 0,
                    y: 0
                };

                var coordinates = data[i].geometry._coordinates || data[i].geometry.coordinates;
                var x = coordinates[0] + offset.x;
                var y = coordinates[1] + offset.y;
                var text = data[i][textKey];
                var textWidth = context.measureText(text).width;

                // 根据文本宽度和高度调整x，y位置，使得绘制文本时候坐标点在文本中心点，这个计算出的是左上角坐标
                var px = x - textWidth / 2;
                var py = y - size / 2;

                var rect = {
                    sw: {
                        x: px,
                        y: py + size
                    },
                    ne: {
                        x: px + textWidth,
                        y: py
                    }
                };

                if (!hasOverlay(rects, rect)) {
                    rects.push(rect);
                    px = px + textWidth / 2;
                    py = py + size / 2;
                    context.fillText(text, px, py);
                }
            }
        } else {
            for (var i = 0, len = data.length; i < len; i++) {
                var offset = data[i].offset || options.offset || {
                    x: 0,
                    y: 0
                };
                var coordinates = data[i].geometry._coordinates || data[i].geometry.coordinates;
                var x = coordinates[0] + offset.x;
                var y = coordinates[1] + offset.y;
                var text = data[i][textKey];
                context.fillText(text, x, y);
            }
        }

        context.restore();
    }

    /*
     *  当前文字区域和已有的文字区域是否有重叠部分
     */
};function hasOverlay(rects, overlay) {
    for (var i = 0; i < rects.length; i++) {
        if (isRectOverlay(rects[i], overlay)) {
            return true;
        }
    }
    return false;
}

//判断2个矩形是否有重叠部分
function isRectOverlay(rect1, rect2) {
    //minx、miny 2个矩形右下角最小的x和y
    //maxx、maxy 2个矩形左上角最大的x和y
    var minx = Math.min(rect1.ne.x, rect2.ne.x);
    var miny = Math.min(rect1.sw.y, rect2.sw.y);
    var maxx = Math.max(rect1.sw.x, rect2.sw.x);
    var maxy = Math.max(rect1.ne.y, rect2.ne.y);
    if (minx > maxx && miny > maxy) {
        return true;
    }
    return false;
}

/**
 * @author wanghyper
 * This file is to draw icon
 */

var imageMap$1 = {};
var stacks$1 = {};
var drawIcon = {
    draw: function draw(context, dataSet, options) {
        var data = dataSet instanceof DataSet ? dataSet.get() : dataSet;

        var _loop = function _loop() {
            var item = data[i];
            if (item.geometry) {
                icon = item.icon || options.icon;

                if (typeof icon === 'string') {
                    var url = window.encodeURIComponent(icon);
                    var img = imageMap$1[url];
                    if (img) {
                        drawItem(img, options, context, item);
                    } else {
                        if (!stacks$1[url]) {
                            stacks$1[url] = [];
                            getImage$1(url, function (img, src) {
                                stacks$1[src] && stacks$1[src].forEach(function (fun) {
                                    return fun(img);
                                });
                                stacks$1[src] = null;
                                imageMap$1[src] = img;
                            }, function (src) {
                                stacks$1[src] && stacks$1[src].forEach(function (fun) {
                                    return fun('error');
                                });
                                stacks$1[src] = null;
                                imageMap$1[src] = 'error';
                            });
                        }
                        stacks$1[url].push(function (img) {
                            drawItem(img, options, context, item);
                        });
                    }
                } else {
                    drawItem(icon, options, context, item);
                }
            }
        };

        for (var i = 0, len = data.length; i < len; i++) {
            var icon;

            _loop();
        }
    }
};
function drawItem(img, options, context, item) {
    context.save();
    var coordinates = item.geometry._coordinates || item.geometry.coordinates;
    var x = coordinates[0];
    var y = coordinates[1];
    var offset = options.offset || { x: 0, y: 0 };
    var width = item.width || options._width || options.width;
    var height = item.height || options._height || options.height;
    x = x - ~~width / 2 + offset.x;
    y = y - ~~height / 2 + offset.y;
    if (typeof img === 'string') {
        context.beginPath();
        context.arc(x, y, options.size || 5, 0, Math.PI * 2);
        context.fillStyle = options.fillStyle || 'red';
        context.fill();
        return;
    }
    var deg = item.deg || options.deg;
    if (deg) {
        context.translate(x, y);
        context.rotate(deg * Math.PI / 180);
        context.translate(-x, -y);
    }

    if (options.sx && options.sy && options.swidth && options.sheight && options.width && options.height) {
        context.drawImage(img, options.sx, options.sy, options.swidth, options.sheight, x, y, width, height);
    } else if (width && height) {
        context.drawImage(img, x, y, width, height);
    } else {
        context.drawImage(img, x, y);
    }
    context.restore();
}

function getImage$1(url, callback, fallback) {
    var img = new Image();
    img.onload = function () {
        callback && callback(img, url);
    };
    img.onerror = function () {
        fallback && fallback(url);
    };
    img.src = window.decodeURIComponent(url);
}

function sortKD(ids, coords, nodeSize, left, right, depth) {
    if (right - left <= nodeSize) {
        return;
    }

    var m = left + right >> 1;

    select(ids, coords, m, left, right, depth % 2);

    sortKD(ids, coords, nodeSize, left, m - 1, depth + 1);
    sortKD(ids, coords, nodeSize, m + 1, right, depth + 1);
}

function select(ids, coords, k, left, right, inc) {

    while (right > left) {
        if (right - left > 600) {
            var n = right - left + 1;
            var m = k - left + 1;
            var z = Math.log(n);
            var s = 0.5 * Math.exp(2 * z / 3);
            var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            select(ids, coords, k, newLeft, newRight, inc);
        }

        var t = coords[2 * k + inc];
        var i = left;
        var j = right;

        swapItem(ids, coords, left, k);
        if (coords[2 * right + inc] > t) {
            swapItem(ids, coords, left, right);
        }

        while (i < j) {
            swapItem(ids, coords, i, j);
            i++;
            j--;
            while (coords[2 * i + inc] < t) {
                i++;
            }
            while (coords[2 * j + inc] > t) {
                j--;
            }
        }

        if (coords[2 * left + inc] === t) {
            swapItem(ids, coords, left, j);
        } else {
            j++;
            swapItem(ids, coords, j, right);
        }

        if (j <= k) {
            left = j + 1;
        }
        if (k <= j) {
            right = j - 1;
        }
    }
}

function swapItem(ids, coords, i, j) {
    swap(ids, i, j);
    swap(coords, 2 * i, 2 * j);
    swap(coords, 2 * i + 1, 2 * j + 1);
}

function swap(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function range(ids, coords, minX, minY, maxX, maxY, nodeSize) {
    var stack = [0, ids.length - 1, 0];
    var result = [];
    var x, y;

    while (stack.length) {
        var axis = stack.pop();
        var right = stack.pop();
        var left = stack.pop();

        if (right - left <= nodeSize) {
            for (var i = left; i <= right; i++) {
                x = coords[2 * i];
                y = coords[2 * i + 1];
                if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
                    result.push(ids[i]);
                }
            }
            continue;
        }

        var m = Math.floor((left + right) / 2);

        x = coords[2 * m];
        y = coords[2 * m + 1];

        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            result.push(ids[m]);
        }

        var nextAxis = (axis + 1) % 2;

        if (axis === 0 ? minX <= x : minY <= y) {
            stack.push(left);
            stack.push(m - 1);
            stack.push(nextAxis);
        }
        if (axis === 0 ? maxX >= x : maxY >= y) {
            stack.push(m + 1);
            stack.push(right);
            stack.push(nextAxis);
        }
    }

    return result;
}

function within(ids, coords, qx, qy, r, nodeSize) {
    var stack = [0, ids.length - 1, 0];
    var result = [];
    var r2 = r * r;

    while (stack.length) {
        var axis = stack.pop();
        var right = stack.pop();
        var left = stack.pop();

        if (right - left <= nodeSize) {
            for (var i = left; i <= right; i++) {
                if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) {
                    result.push(ids[i]);
                }
            }
            continue;
        }

        var m = Math.floor((left + right) / 2);

        var x = coords[2 * m];
        var y = coords[2 * m + 1];

        if (sqDist(x, y, qx, qy) <= r2) {
            result.push(ids[m]);
        }

        var nextAxis = (axis + 1) % 2;

        if (axis === 0 ? qx - r <= x : qy - r <= y) {
            stack.push(left);
            stack.push(m - 1);
            stack.push(nextAxis);
        }
        if (axis === 0 ? qx + r >= x : qy + r >= y) {
            stack.push(m + 1);
            stack.push(right);
            stack.push(nextAxis);
        }
    }

    return result;
}

function sqDist(ax, ay, bx, by) {
    var dx = ax - bx;
    var dy = ay - by;
    return dx * dx + dy * dy;
}

var defaultGetX = function defaultGetX(p) {
    return p[0];
};
var defaultGetY = function defaultGetY(p) {
    return p[1];
};

var KDBush = function KDBush(points, getX, getY, nodeSize, ArrayType) {
    if (getX === void 0) getX = defaultGetX;
    if (getY === void 0) getY = defaultGetY;
    if (nodeSize === void 0) nodeSize = 64;
    if (ArrayType === void 0) ArrayType = Float64Array;

    this.nodeSize = nodeSize;
    this.points = points;

    var IndexArrayType = points.length < 65536 ? Uint16Array : Uint32Array;

    var ids = this.ids = new IndexArrayType(points.length);
    var coords = this.coords = new ArrayType(points.length * 2);

    for (var i = 0; i < points.length; i++) {
        ids[i] = i;
        coords[2 * i] = getX(points[i]);
        coords[2 * i + 1] = getY(points[i]);
    }

    sortKD(ids, coords, nodeSize, 0, ids.length - 1, 0);
};

KDBush.prototype.range = function range$1(minX, minY, maxX, maxY) {
    return range(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
};

KDBush.prototype.within = function within$1(x, y, r) {
    return within(this.ids, this.coords, x, y, r, this.nodeSize);
};

var defaultOptions = {
    minZoom: 0, // min zoom to generate clusters on
    maxZoom: 16, // max zoom level to cluster the points on
    minPoints: 2, // minimum points to form a cluster
    radius: 40, // cluster radius in pixels
    extent: 512, // tile extent (radius is calculated relative to it)
    nodeSize: 64, // size of the KD-tree leaf node, affects performance
    log: false, // whether to log timing info

    // whether to generate numeric ids for input features (in vector tiles)
    generateId: false,

    // a reduce function for calculating custom cluster properties
    reduce: null, // (accumulated, props) => { accumulated.sum += props.sum; }

    // properties to use for individual points when running the reducer
    map: function map(props) {
        return props;
    } // props => ({sum: props.my_value})
};

var Supercluster = function Supercluster(options) {
    this.options = extend(Object.create(defaultOptions), options);
    this.trees = new Array(this.options.maxZoom + 1);
};

Supercluster.prototype.load = function load(points) {
    var ref = this.options;
    var log = ref.log;
    var minZoom = ref.minZoom;
    var maxZoom = ref.maxZoom;
    var nodeSize = ref.nodeSize;

    if (log) {}

    var timerId = "prepare " + points.length + " points";
    if (log) {}

    this.points = points;

    // generate a cluster object for each point and index input points into a KD-tree
    var clusters = [];
    for (var i = 0; i < points.length; i++) {
        if (!points[i].geometry) {
            continue;
        }
        clusters.push(createPointCluster(points[i], i));
    }
    this.trees[maxZoom + 1] = new KDBush(clusters, getX, getY, nodeSize, Float32Array);

    if (log) {}

    // cluster points on max zoom, then cluster the results on previous zoom, etc.;
    // results in a cluster hierarchy across zoom levels
    for (var z = maxZoom; z >= minZoom; z--) {
        var now = +Date.now();

        // create a new set of clusters for the zoom and index them with a KD-tree
        clusters = this._cluster(clusters, z);
        this.trees[z] = new KDBush(clusters, getX, getY, nodeSize, Float32Array);

        if (log) {}
    }

    if (log) {}

    return this;
};

Supercluster.prototype.getClusters = function getClusters(bbox, zoom) {
    var minLng = ((bbox[0] + 180) % 360 + 360) % 360 - 180;
    var minLat = Math.max(-90, Math.min(90, bbox[1]));
    var maxLng = bbox[2] === 180 ? 180 : ((bbox[2] + 180) % 360 + 360) % 360 - 180;
    var maxLat = Math.max(-90, Math.min(90, bbox[3]));

    if (bbox[2] - bbox[0] >= 360) {
        minLng = -180;
        maxLng = 180;
    } else if (minLng > maxLng) {
        var easternHem = this.getClusters([minLng, minLat, 180, maxLat], zoom);
        var westernHem = this.getClusters([-180, minLat, maxLng, maxLat], zoom);
        return easternHem.concat(westernHem);
    }

    var tree = this.trees[this._limitZoom(zoom)];
    var ids = tree.range(lngX(minLng), latY(maxLat), lngX(maxLng), latY(minLat));
    var clusters = [];
    for (var i = 0, list = ids; i < list.length; i += 1) {
        var id = list[i];

        var c = tree.points[id];
        clusters.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
    }
    return clusters;
};

Supercluster.prototype.getChildren = function getChildren(clusterId) {
    var originId = this._getOriginId(clusterId);
    var originZoom = this._getOriginZoom(clusterId);
    var errorMsg = 'No cluster with the specified id.';

    var index = this.trees[originZoom];
    if (!index) {
        throw new Error(errorMsg);
    }

    var origin = index.points[originId];
    if (!origin) {
        throw new Error(errorMsg);
    }

    var r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
    var ids = index.within(origin.x, origin.y, r);
    var children = [];
    for (var i = 0, list = ids; i < list.length; i += 1) {
        var id = list[i];

        var c = index.points[id];
        if (c.parentId === clusterId) {
            children.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
        }
    }

    if (children.length === 0) {
        throw new Error(errorMsg);
    }

    return children;
};

Supercluster.prototype.getLeaves = function getLeaves(clusterId, limit, offset) {
    limit = limit || 10;
    offset = offset || 0;

    var leaves = [];
    this._appendLeaves(leaves, clusterId, limit, offset, 0);

    return leaves;
};

Supercluster.prototype.getTile = function getTile(z, x, y) {
    var tree = this.trees[this._limitZoom(z)];
    var z2 = Math.pow(2, z);
    var ref = this.options;
    var extent = ref.extent;
    var radius = ref.radius;
    var p = radius / extent;
    var top = (y - p) / z2;
    var bottom = (y + 1 + p) / z2;

    var tile = {
        features: []
    };

    this._addTileFeatures(tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom), tree.points, x, y, z2, tile);

    if (x === 0) {
        this._addTileFeatures(tree.range(1 - p / z2, top, 1, bottom), tree.points, z2, y, z2, tile);
    }
    if (x === z2 - 1) {
        this._addTileFeatures(tree.range(0, top, p / z2, bottom), tree.points, -1, y, z2, tile);
    }

    return tile.features.length ? tile : null;
};

Supercluster.prototype.getClusterExpansionZoom = function getClusterExpansionZoom(clusterId) {
    var expansionZoom = this._getOriginZoom(clusterId) - 1;
    while (expansionZoom <= this.options.maxZoom) {
        var children = this.getChildren(clusterId);
        expansionZoom++;
        if (children.length !== 1) {
            break;
        }
        clusterId = children[0].properties.cluster_id;
    }
    return expansionZoom;
};

Supercluster.prototype._appendLeaves = function _appendLeaves(result, clusterId, limit, offset, skipped) {
    var children = this.getChildren(clusterId);

    for (var i = 0, list = children; i < list.length; i += 1) {
        var child = list[i];

        var props = child.properties;

        if (props && props.cluster) {
            if (skipped + props.point_count <= offset) {
                // skip the whole cluster
                skipped += props.point_count;
            } else {
                // enter the cluster
                skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped);
                // exit the cluster
            }
        } else if (skipped < offset) {
            // skip a single point
            skipped++;
        } else {
            // add a single point
            result.push(child);
        }
        if (result.length === limit) {
            break;
        }
    }

    return skipped;
};

Supercluster.prototype._addTileFeatures = function _addTileFeatures(ids, points, x, y, z2, tile) {
    for (var i$1 = 0, list = ids; i$1 < list.length; i$1 += 1) {
        var i = list[i$1];

        var c = points[i];
        var isCluster = c.numPoints;
        var f = {
            type: 1,
            geometry: [[Math.round(this.options.extent * (c.x * z2 - x)), Math.round(this.options.extent * (c.y * z2 - y))]],
            tags: isCluster ? getClusterProperties(c) : this.points[c.index].properties
        };

        // assign id
        var id = void 0;
        if (isCluster) {
            id = c.id;
        } else if (this.options.generateId) {
            // optionally generate id
            id = c.index;
        } else if (this.points[c.index].id) {
            // keep id if already assigned
            id = this.points[c.index].id;
        }

        if (id !== undefined) {
            f.id = id;
        }

        tile.features.push(f);
    }
};

Supercluster.prototype._limitZoom = function _limitZoom(z) {
    return Math.max(this.options.minZoom, Math.min(+z, this.options.maxZoom + 1));
};

Supercluster.prototype._cluster = function _cluster(points, zoom) {
    var clusters = [];
    var ref = this.options;
    var radius = ref.radius;
    var extent = ref.extent;
    var reduce = ref.reduce;
    var minPoints = ref.minPoints;
    var r = radius / (extent * Math.pow(2, zoom));

    // loop through each point
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        // if we've already visited the point at this zoom level, skip it
        if (p.zoom <= zoom) {
            continue;
        }
        p.zoom = zoom;

        // find all nearby points
        var tree = this.trees[zoom + 1];
        var neighborIds = tree.within(p.x, p.y, r);

        var numPointsOrigin = p.numPoints || 1;
        var numPoints = numPointsOrigin;

        // count the number of points in a potential cluster
        for (var i$1 = 0, list = neighborIds; i$1 < list.length; i$1 += 1) {
            var neighborId = list[i$1];

            var b = tree.points[neighborId];
            // filter out neighbors that are already processed
            if (b.zoom > zoom) {
                numPoints += b.numPoints || 1;
            }
        }

        if (numPoints >= minPoints) {
            // enough points to form a cluster
            var wx = p.x * numPointsOrigin;
            var wy = p.y * numPointsOrigin;

            var clusterProperties = reduce && numPointsOrigin > 1 ? this._map(p, true) : null;

            // encode both zoom and point index on which the cluster originated -- offset by total length of features
            var id = (i << 5) + (zoom + 1) + this.points.length;

            for (var i$2 = 0, list$1 = neighborIds; i$2 < list$1.length; i$2 += 1) {
                var neighborId$1 = list$1[i$2];

                var b$1 = tree.points[neighborId$1];

                if (b$1.zoom <= zoom) {
                    continue;
                }
                b$1.zoom = zoom; // save the zoom (so it doesn't get processed twice)

                var numPoints2 = b$1.numPoints || 1;
                wx += b$1.x * numPoints2; // accumulate coordinates for calculating weighted center
                wy += b$1.y * numPoints2;

                b$1.parentId = id;

                if (reduce) {
                    if (!clusterProperties) {
                        clusterProperties = this._map(p, true);
                    }
                    reduce(clusterProperties, this._map(b$1));
                }
            }

            p.parentId = id;
            clusters.push(createCluster(wx / numPoints, wy / numPoints, id, numPoints, clusterProperties));
        } else {
            // left points as unclustered
            clusters.push(p);

            if (numPoints > 1) {
                for (var i$3 = 0, list$2 = neighborIds; i$3 < list$2.length; i$3 += 1) {
                    var neighborId$2 = list$2[i$3];

                    var b$2 = tree.points[neighborId$2];
                    if (b$2.zoom <= zoom) {
                        continue;
                    }
                    b$2.zoom = zoom;
                    clusters.push(b$2);
                }
            }
        }
    }

    return clusters;
};

// get index of the point from which the cluster originated
Supercluster.prototype._getOriginId = function _getOriginId(clusterId) {
    return clusterId - this.points.length >> 5;
};

// get zoom of the point from which the cluster originated
Supercluster.prototype._getOriginZoom = function _getOriginZoom(clusterId) {
    return (clusterId - this.points.length) % 32;
};

Supercluster.prototype._map = function _map(point, clone) {
    if (point.numPoints) {
        return clone ? extend({}, point.properties) : point.properties;
    }
    var original = this.points[point.index].properties;
    var result = this.options.map(original);
    return clone && result === original ? extend({}, result) : result;
};

function createCluster(x, y, id, numPoints, properties) {
    return {
        x: x, // weighted cluster center
        y: y,
        zoom: Infinity, // the last zoom the cluster was processed at
        id: id, // encodes index of the first child of the cluster and its zoom level
        parentId: -1, // parent cluster id
        numPoints: numPoints,
        properties: properties
    };
}

function createPointCluster(p, id) {
    var ref = p.geometry.coordinates;
    var x = ref[0];
    var y = ref[1];
    return {
        x: lngX(x), // projected point coordinates
        y: latY(y),
        zoom: Infinity, // the last zoom the point was processed at
        index: id, // index of the source feature in the original input array,
        parentId: -1 // parent cluster id
    };
}

function getClusterJSON(cluster) {
    return {
        type: 'Feature',
        id: cluster.id,
        properties: getClusterProperties(cluster),
        geometry: {
            type: 'Point',
            coordinates: [xLng(cluster.x), yLat(cluster.y)]
        }
    };
}

function getClusterProperties(cluster) {
    var count = cluster.numPoints;
    var abbrev = count >= 10000 ? Math.round(count / 1000) + "k" : count >= 1000 ? Math.round(count / 100) / 10 + "k" : count;
    return extend(extend({}, cluster.properties), {
        cluster: true,
        cluster_id: cluster.id,
        point_count: count,
        point_count_abbreviated: abbrev
    });
}

// longitude/latitude to spherical mercator in [0..1] range
function lngX(lng) {
    return lng / 360 + 0.5;
}
function latY(lat) {
    var sin = Math.sin(lat * Math.PI / 180);
    var y = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;
    return y < 0 ? 0 : y > 1 ? 1 : y;
}

// spherical mercator to longitude/latitude
function xLng(x) {
    return (x - 0.5) * 360;
}
function yLat(y) {
    var y2 = (180 - y * 360) * Math.PI / 180;
    return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
}

function extend(dest, src) {
    for (var id in src) {
        dest[id] = src[id];
    }
    return dest;
}

function getX(p) {
    return p.x;
}
function getY(p) {
    return p.y;
}

/**
 * @author kyle / http://nikai.us/
 */

if (typeof window !== 'undefined') {
    requestAnimationFrame(animate);
}

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}

var BaseLayer = function () {
    function BaseLayer(map, dataSet, options) {
        classCallCheck(this, BaseLayer);

        if (!(dataSet instanceof DataSet)) {
            dataSet = new DataSet(dataSet);
        }

        this.dataSet = dataSet;
        this.map = map;
        if (options.draw === 'cluster') {
            this.refreshCluster(options);
        }
    }

    createClass(BaseLayer, [{
        key: 'refreshCluster',
        value: function refreshCluster(options) {
            options = options || this.options;
            this.supercluster = new Supercluster({
                maxZoom: options.maxZoom || 19,
                radius: options.clusterRadius || 100,
                minPoints: options.minPoints || 2,
                extent: options.extent || 512
            });

            this.supercluster.load(this.dataSet.get());
            // 拿到每个级别下的最大值最小值
            this.supercluster.trees.forEach(function (item) {
                var max = 0;
                var min = Infinity;
                item.points.forEach(function (point) {
                    max = Math.max(point.numPoints || 0, max);
                    min = Math.min(point.numPoints || Infinity, min);
                });
                item.max = max;
                item.min = min;
            });
            this.clusterDataSet = new DataSet();
        }
    }, {
        key: 'getDefaultContextConfig',
        value: function getDefaultContextConfig() {
            return {
                globalAlpha: 1,
                globalCompositeOperation: 'source-over',
                imageSmoothingEnabled: true,
                strokeStyle: '#000000',
                fillStyle: '#000000',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 0,
                shadowColor: 'rgba(0, 0, 0, 0)',
                lineWidth: 1,
                lineCap: 'butt',
                lineJoin: 'miter',
                miterLimit: 10,
                lineDashOffset: 0,
                font: '10px sans-serif',
                textAlign: 'start',
                textBaseline: 'alphabetic'
            };
        }
    }, {
        key: 'initDataRange',
        value: function initDataRange(options) {
            var self = this;
            self.intensity = new Intensity({
                maxSize: self.options.maxSize,
                minSize: self.options.minSize,
                gradient: self.options.gradient,
                max: self.options.max || this.dataSet.getMax('count')
            });
            self.category = new Category(self.options.splitList);
            self.choropleth = new Choropleth(self.options.splitList);
            if (self.options.splitList === undefined) {
                self.category.generateByDataSet(this.dataSet, self.options.color);
            }
            if (self.options.splitList === undefined) {
                var min = self.options.min || this.dataSet.getMin('count');
                var max = self.options.max || this.dataSet.getMax('count');
                self.choropleth.generateByMinMax(min, max);
            }
        }
    }, {
        key: 'getLegend',
        value: function getLegend(options) {
            var draw = this.options.draw;
            var legend = null;
            var self = this;
            if (self.options.draw == 'intensity' || self.options.draw == 'heatmap') {
                return this.intensity.getLegend(options);
            } else if (self.options.draw == 'category') {
                return this.category.getLegend(options);
            }
        }
    }, {
        key: 'processData',
        value: function processData(data) {
            var self = this;
            var draw = self.options.draw;
            if (draw == 'bubble' || draw == 'intensity' || draw == 'category' || draw == 'choropleth' || draw == 'simple') {
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];

                    if (self.options.draw == 'bubble') {
                        data[i]._size = self.intensity.getSize(item.count);
                    } else {
                        data[i]._size = undefined;
                    }

                    var styleType = '_fillStyle';

                    if (data[i].geometry.type === 'LineString' || self.options.styleType === 'stroke') {
                        styleType = '_strokeStyle';
                    }

                    if (self.options.draw == 'intensity') {
                        data[i][styleType] = self.intensity.getColor(item.count);
                    } else if (self.options.draw == 'category') {
                        data[i][styleType] = self.category.get(item.count);
                    } else if (self.options.draw == 'choropleth') {
                        data[i][styleType] = self.choropleth.get(item.count);
                    }
                }
            }
        }
    }, {
        key: 'isEnabledTime',
        value: function isEnabledTime() {
            var animationOptions = this.options.animation;

            var flag = animationOptions && !(animationOptions.enabled === false);

            return flag;
        }
    }, {
        key: 'argCheck',
        value: function argCheck(options) {
            if (options.draw == 'heatmap') {
                if (options.strokeStyle) {
                    console.warn('[heatmap] options.strokeStyle is discard, pleause use options.strength [eg: options.strength = 0.1]');
                }
            }
        }
    }, {
        key: 'drawContext',
        value: function drawContext(context, dataSet, options, nwPixel) {
            var self = this;
            switch (self.options.draw) {
                case 'heatmap':
                    drawHeatmap.draw(context, dataSet, self.options);
                    break;
                case 'grid':
                case 'cluster':
                case 'honeycomb':
                    self.options.offset = {
                        x: nwPixel.x,
                        y: nwPixel.y
                    };
                    if (self.options.draw === 'grid') {
                        drawGrid.draw(context, dataSet, self.options);
                    } else if (self.options.draw === 'cluster') {
                        drawCluster.draw(context, dataSet, self.options);
                    } else {
                        drawHoneycomb.draw(context, dataSet, self.options);
                    }
                    break;
                case 'text':
                    drawText.draw(context, dataSet, self.options);
                    break;
                case 'icon':
                    drawIcon.draw(context, dataSet, self.options);
                    break;
                case 'clip':
                    drawClip.draw(context, dataSet, self.options);
                    break;
                default:
                    if (self.options.context == 'webgl') {
                        webglDrawSimple.draw(self.canvasLayer.canvas.getContext('webgl'), dataSet, self.options);
                    } else {
                        drawSimple.draw(context, dataSet, self.options);
                    }
            }

            if (self.options.arrow && self.options.arrow.show !== false) {
                object.draw(context, dataSet, self.options);
            }
        }
    }, {
        key: 'isPointInPath',
        value: function isPointInPath(context, pixel) {
            var context = this.canvasLayer.canvas.getContext(this.context);
            var data;
            if (this.options.draw === 'cluster' && (!this.options.maxClusterZoom || this.options.maxClusterZoom >= this.getZoom())) {
                data = this.clusterDataSet.get();
            } else {
                data = this.dataSet.get();
            }
            for (var i = 0; i < data.length; i++) {
                context.beginPath();
                var options = this.options;
                var x = pixel.x * this.canvasLayer.devicePixelRatio;
                var y = pixel.y * this.canvasLayer.devicePixelRatio;

                options.multiPolygonDraw = function () {
                    if (context.isPointInPath(x, y)) {
                        return data[i];
                    }
                };

                pathSimple.draw(context, data[i], options);

                var geoType = data[i].geometry && data[i].geometry.type;
                if (geoType.indexOf('LineString') > -1) {
                    if (context.isPointInStroke && context.isPointInStroke(x, y)) {
                        return data[i];
                    }
                } else {
                    if (context.isPointInPath(x, y)) {
                        return data[i];
                    }
                }
            }
        }
        // 递归获取聚合点下的所有原始点数据

    }, {
        key: 'getClusterPoints',
        value: function getClusterPoints(cluster) {
            var _this = this;

            if (cluster.type !== 'Feature') {
                return [];
            }
            var children = this.supercluster.getChildren(cluster.id);
            return children.map(function (item) {
                if (item.type === 'Feature') {
                    return _this.getClusterPoints(item);
                } else {
                    return item;
                }
            }).flat();
        }
    }, {
        key: 'clickEvent',
        value: function clickEvent(pixel, e) {
            if (!this.options.methods) {
                return;
            }
            var dataItem = this.isPointInPath(this.getContext(), pixel);

            if (dataItem) {
                if (this.options.draw === 'cluster') {
                    var children = this.getClusterPoints(dataItem);
                    dataItem.children = children;
                }
                this.options.methods.click(dataItem, e);
            } else {
                this.options.methods.click(null, e);
            }
        }
    }, {
        key: 'mousemoveEvent',
        value: function mousemoveEvent(pixel, e) {
            if (!this.options.methods) {
                return;
            }
            var dataItem = this.isPointInPath(this.getContext(), pixel);
            if (dataItem) {
                if (this.options.draw === 'cluster') {
                    var children = this.getClusterPoints(dataItem);
                    dataItem.children = children;
                }
                this.options.methods.mousemove(dataItem, e);
            } else {
                this.options.methods.mousemove(null, e);
            }
        }
    }, {
        key: 'tapEvent',
        value: function tapEvent(pixel, e) {
            if (!this.options.methods) {
                return;
            }
            var dataItem = this.isPointInPath(this.getContext(), pixel);
            if (dataItem) {
                if (this.options.draw === 'cluster') {
                    var children = this.getClusterPoints(dataItem);
                    dataItem.children = children;
                }
                this.options.methods.tap(dataItem, e);
            } else {
                this.options.methods.tap(null, e);
            }
        }

        /**
         * obj.options
         */

    }, {
        key: 'update',
        value: function update(obj, isDraw) {
            var self = this;
            var _options = obj.options;
            var options = self.options;
            for (var i in _options) {
                options[i] = _options[i];
            }
            self.init(options);
            if (isDraw !== false) {
                self.draw();
            }
        }
    }, {
        key: 'setOptions',
        value: function setOptions(options) {
            var self = this;
            self.dataSet.reset();
            // console.log('xxx1')
            self.init(options);
            // console.log('xxx')
            self.draw();
        }
    }, {
        key: 'set',
        value: function set$$1(obj) {
            var self = this;
            var ctx = this.getContext();
            var conf = this.getDefaultContextConfig();
            for (var i in conf) {
                ctx[i] = conf[i];
            }
            self.init(obj.options);
            self.draw();
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.unbindEvent();
            this.hide();
        }
    }, {
        key: 'initAnimator',
        value: function initAnimator() {
            var self = this;
            var animationOptions = self.options.animation;

            if (self.options.draw == 'time' || self.isEnabledTime()) {
                if (!animationOptions.stepsRange) {
                    animationOptions.stepsRange = {
                        start: this.dataSet.getMin('time') || 0,
                        end: this.dataSet.getMax('time') || 0
                    };
                }

                this.steps = { step: animationOptions.stepsRange.start };
                self.animator = new TWEEN.Tween(this.steps).onUpdate(function () {
                    self._canvasUpdate(this.step);
                }).repeat(Infinity);

                this.addAnimatorEvent();

                var duration = animationOptions.duration * 1000 || 5000;

                self.animator.to({ step: animationOptions.stepsRange.end }, duration);
                self.animator.start();
            } else {
                self.animator && self.animator.stop();
            }
        }
    }, {
        key: 'addAnimatorEvent',
        value: function addAnimatorEvent() {}
    }, {
        key: 'animatorMovestartEvent',
        value: function animatorMovestartEvent() {
            var animationOptions = this.options.animation;
            if (this.isEnabledTime() && this.animator) {
                this.steps.step = animationOptions.stepsRange.start;
                this.animator.stop();
            }
        }
    }, {
        key: 'animatorMoveendEvent',
        value: function animatorMoveendEvent() {
            if (this.isEnabledTime() && this.animator) {
                this.animator.start();
            }
        }
    }]);
    return BaseLayer;
}();

var MapVRenderer = function (_BaseLayer) {
    inherits(MapVRenderer, _BaseLayer);

    /**
     * Creates an instance of MapVRenderer.
     * @param {*} viewer cesium viewer
     * @param {*} dataset mapv dataset
     * @param {*} option mapvOptions
     * @param {*} mapVLayer
     * @memberof MapVRenderer
     */
    function MapVRenderer(viewer, dataset, option, mapVLayer) {
        classCallCheck(this, MapVRenderer);

        var _this = possibleConstructorReturn(this, (MapVRenderer.__proto__ || Object.getPrototypeOf(MapVRenderer)).call(this, viewer, dataset, option));

        if (!BaseLayer) {
            return possibleConstructorReturn(_this);
        }
        _this.map = viewer, _this.scene = viewer.scene, _this.dataSet = dataset;
        option = option || {}, _this.init(option), _this.argCheck(option), _this.initDevicePixelRatio(), _this.canvasLayer = mapVLayer, _this.stopAniamation = !1, _this.animation = option.animation, _this.clickEvent = _this.clickEvent.bind(_this), _this.mousemoveEvent = _this.mousemoveEvent.bind(_this), _this.bindEvent();
        return _this;
    }

    createClass(MapVRenderer, [{
        key: "initDevicePixelRatio",
        value: function initDevicePixelRatio() {
            this.devicePixelRatio = window.devicePixelRatio || 1;
        }
    }, {
        key: "clickEvent",
        value: function clickEvent(t) {
            var e = t.point;
            get(MapVRenderer.prototype.__proto__ || Object.getPrototypeOf(MapVRenderer.prototype), "clickEvent", this).call(this, e, t);
        }
    }, {
        key: "mousemoveEvent",
        value: function mousemoveEvent(t) {
            var e = t.point;
            get(MapVRenderer.prototype.__proto__ || Object.getPrototypeOf(MapVRenderer.prototype), "mousemoveEvent", this).call(this, e, t);
        }
    }, {
        key: "addAnimatorEvent",
        value: function addAnimatorEvent() {}
    }, {
        key: "animatorMovestartEvent",
        value: function animatorMovestartEvent() {
            var t = this.options.animation;
            this.isEnabledTime() && this.animator && (this.steps.step = t.stepsRange.start);
        }
    }, {
        key: "animatorMoveendEvent",
        value: function animatorMoveendEvent() {
            this.isEnabledTime() && this.animator;
        }
    }, {
        key: "bindEvent",
        value: function bindEvent() {
            this.map;
            this.options.methods && (this.options.methods.click, this.options.methods.mousemove);
        }
    }, {
        key: "unbindEvent",
        value: function unbindEvent() {
            var t = this.map;
            this.options.methods && (this.options.methods.click && t.off("click", this.clickEvent), this.options.methods.mousemove && t.off("mousemove", this.mousemoveEvent));
        }
    }, {
        key: "getContext",
        value: function getContext() {
            return this.canvasLayer.canvas.getContext(this.context);
        }
    }, {
        key: "init",
        value: function init(t) {
            this.options = t, this.initDataRange(t), this.context = this.options.context || "2d", this.options.zIndex && this.canvasLayer && this.canvasLayer.setZIndex(this.options.zIndex), this.initAnimator();
        }
    }, {
        key: "_canvasUpdate",
        value: function _canvasUpdate(t) {
            this.map;
            var e = this.scene;
            if (this.canvasLayer && !this.stopAniamation) {
                var i = this.options.animation,
                    n = this.getContext();
                if (this.isEnabledTime()) {
                    if (void 0 === t) return void this.clear(n);
                    "2d" === this.context && (n.save(), n.globalCompositeOperation = "destination-out", n.fillStyle = "rgba(0, 0, 0, .1)", n.fillRect(0, 0, n.canvas.width, n.canvas.height), n.restore());
                } else this.clear(n);
                if ("2d" === this.context) for (var o in this.options) {
                    n[o] = this.options[o];
                } else n.clear(n.COLOR_BUFFER_BIT);
                var a = {
                    transferCoordinate: function transferCoordinate(t) {
                        var i = Cesium.Cartesian3.fromDegrees(t[0], t[1]),
                            n = Cesium.SceneTransforms.wgs84ToWindowCoordinates(e, i);
                        return void 0 == n ? [-1, -1] : [n.x, n.y];
                    }
                };
                void 0 !== t && (a.filter = function (e) {
                    var n = i.trails || 10;
                    return !!(t && e.time > t - n && e.time < t);
                });
                var c = this.dataSet.get(a);
                this.processData(c), "m" == this.options.unit && this.options.size, this.options._size = this.options.size;
                var h = Cesium.SceneTransforms.wgs84ToWindowCoordinates(e, Cesium.Cartesian3.fromDegrees(0, 0));
                this.drawContext(n, new DataSet(c), this.options, h), this.options.updateCallback && this.options.updateCallback(t);
            }
        }
    }, {
        key: "updateData",
        value: function updateData(t, e) {
            var i = t;
            i && i.get && (i = i.get()), void 0 != i && this.dataSet.set(i), get(MapVRenderer.prototype.__proto__ || Object.getPrototypeOf(MapVRenderer.prototype), "update", this).call(this, {
                options: e
            });
        }
    }, {
        key: "addData",
        value: function addData(t, e) {
            var i = t;
            t && t.get && (i = t.get()), this.dataSet.add(i), this.update({
                options: e
            });
        }
    }, {
        key: "getData",
        value: function getData() {
            return this.dataSet;
        }
    }, {
        key: "removeData",
        value: function removeData(t) {
            if (this.dataSet) {
                var e = this.dataSet.get({
                    filter: function filter(e) {
                        return null == t || "function" != typeof t || !t(e);
                    }
                });
                this.dataSet.set(e), this.update({
                    options: null
                });
            }
        }
    }, {
        key: "clearData",
        value: function clearData() {
            this.dataSet && this.dataSet.clear(), this.update({
                options: null
            });
        }
    }, {
        key: "draw",
        value: function draw() {
            this.canvasLayer.draw();
        }
    }, {
        key: "clear",
        value: function clear(t) {
            t && t.clearRect && t.clearRect(0, 0, t.canvas.width, t.canvas.height);
        }
    }]);
    return MapVRenderer;
}(BaseLayer);

var defIndex = 0;

var CesiumMapLayer = function () {
    /**
     *Creates an instance of CesiumMapLayer.
     * @param {*} viewer
     * @param {*} dataset
     * @param {*} options
     * @param {*} container default viewer.container
     * @memberof CesiumMapLayer
     */
    function CesiumMapLayer(viewer, dataset, options) {
        var container = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
        classCallCheck(this, CesiumMapLayer);

        this.map = viewer, this.scene = viewer.scene, this.mapvBaseLayer = new MapVRenderer(viewer, dataset, options, this), this.mapVOptions = options, this.initDevicePixelRatio(), this.canvas = this._createCanvas(), this.render = this.render.bind(this);
        if (container) {
            this.container = container;
        } else {
            var inner = viewer.container.querySelector('.cesium-viewer-cesiumWidgetContainer');
            this.container = inner ? inner : viewer.container;
        }
        this.addInnerContainer();

        // void 0 != container ? (this.container = container,
        //     container.appendChild(this.canvas)) : (this.container = viewer.container,
        //         this.addInnerContainer()),
        this.bindEvent();
        this._reset();
    }

    createClass(CesiumMapLayer, [{
        key: 'initDevicePixelRatio',
        value: function initDevicePixelRatio() {
            this.devicePixelRatio = window.devicePixelRatio || 1;
        }
    }, {
        key: 'addInnerContainer',
        value: function addInnerContainer() {
            this.container.appendChild(this.canvas);
        }
    }, {
        key: 'bindEvent',
        value: function bindEvent() {
            var that = this;

            this.innerMoveStart = this.moveStartEvent.bind(this);
            this.innerMoveEnd = this.moveEndEvent.bind(this);
            this.scene.camera.moveStart.addEventListener(this.innerMoveStart, this);
            this.scene.camera.moveEnd.addEventListener(this.innerMoveEnd, this);

            var t = new Cesium.ScreenSpaceEventHandler(this.scene.canvas);

            t.setInputAction(function (t) {
                that.innerMoveEnd();
            }, Cesium.ScreenSpaceEventType.LEFT_UP);
            t.setInputAction(function (t) {
                that.innerMoveEnd();
            }, Cesium.ScreenSpaceEventType.MIDDLE_UP);
            this.handler = t;
        }
    }, {
        key: 'unbindEvent',
        value: function unbindEvent() {
            this.scene.camera.moveStart.removeEventListener(this.innerMoveStart, this);
            this.scene.camera.moveEnd.removeEventListener(this.innerMoveEnd, this);
            this.scene.postRender.removeEventListener(this._reset, this);
            this.handler && (this.handler.destroy(), this.handler = null);
        }
    }, {
        key: 'moveStartEvent',
        value: function moveStartEvent() {
            if (this.mapvBaseLayer) {
                this.mapvBaseLayer.animatorMovestartEvent();
                this.scene.postRender.addEventListener(this._reset, this);
            }
        }
    }, {
        key: 'moveEndEvent',
        value: function moveEndEvent() {
            if (this.mapvBaseLayer) {
                this.scene.postRender.removeEventListener(this._reset, this), this.mapvBaseLayer.animatorMoveendEvent();
                this._reset();
            }
        }
    }, {
        key: 'zoomStartEvent',
        value: function zoomStartEvent() {
            this._unvisiable();
        }
    }, {
        key: 'zoomEndEvent',
        value: function zoomEndEvent() {
            this._unvisiable();
        }
    }, {
        key: 'addData',
        value: function addData(t, e) {
            void 0 != this.mapvBaseLayer && this.mapvBaseLayer.addData(t, e);
        }
    }, {
        key: 'updateData',
        value: function updateData(t, e) {
            void 0 != this.mapvBaseLayer && this.mapvBaseLayer.updateData(t, e);
        }
    }, {
        key: 'getData',
        value: function getData() {
            return this.mapvBaseLayer && (this.dataSet = this.mapvBaseLayer.getData()), this.dataSet;
        }
    }, {
        key: 'removeData',
        value: function removeData(t) {
            void 0 != this.mapvBaseLayer && this.mapvBaseLayer && this.mapvBaseLayer.removeData(t);
        }
    }, {
        key: 'removeAllData',
        value: function removeAllData() {
            void 0 != this.mapvBaseLayer && this.mapvBaseLayer.clearData();
        }
    }, {
        key: '_visiable',
        value: function _visiable() {
            return this.canvas.style.display = "block", this;
        }
    }, {
        key: '_unvisiable',
        value: function _unvisiable() {
            return this.canvas.style.display = "none", this;
        }
    }, {
        key: '_createCanvas',
        value: function _createCanvas() {
            var t = document.createElement("canvas");
            t.id = this.mapVOptions.layerid || "mapv" + defIndex++, t.style.position = "absolute", t.style.top = "0px", t.style.left = "0px", t.style.pointerEvents = "none", t.style.zIndex = this.mapVOptions.zIndex || 0, t.width = parseInt(this.map.canvas.width), t.height = parseInt(this.map.canvas.height), t.style.width = this.map.canvas.style.width, t.style.height = this.map.canvas.style.height;
            var e = this.devicePixelRatio;
            return "2d" == this.mapVOptions.context && t.getContext(this.mapVOptions.context).scale(e, e), t;
        }
    }, {
        key: '_reset',
        value: function _reset() {
            this.resizeCanvas();
            this.fixPosition();
            this.onResize();
            this.render();
        }
    }, {
        key: 'draw',
        value: function draw() {
            this._reset();
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.remove();
            this.unbindEvent();
        }
    }, {
        key: 'remove',
        value: function remove() {
            void 0 != this.mapvBaseLayer && (this.removeAllData(), this.mapvBaseLayer.clear(this.mapvBaseLayer.getContext()), this.mapvBaseLayer = void 0, this.canvas.parentElement.removeChild(this.canvas));
        }
    }, {
        key: 'update',
        value: function update(t) {
            void 0 != t && this.updateData(t.data, t.options);
        }
    }, {
        key: 'resizeCanvas',
        value: function resizeCanvas() {
            if (void 0 != this.canvas && null != this.canvas) {
                var t = this.canvas;
                t.style.position = "absolute", t.style.top = "0px", t.style.left = "0px", t.width = parseInt(this.map.canvas.width), t.height = parseInt(this.map.canvas.height), t.style.width = this.map.canvas.style.width, t.style.height = this.map.canvas.style.height;
            }
        }
    }, {
        key: 'fixPosition',
        value: function fixPosition() {}
    }, {
        key: 'onResize',
        value: function onResize() {}
    }, {
        key: 'render',
        value: function render() {
            void 0 != this.mapvBaseLayer && this.mapvBaseLayer._canvasUpdate();
        }
    }, {
        key: 'show',
        get: function get$$1() {
            return this.canvas.style.display === "block";
        },
        set: function set$$1(val) {
            if (val) this._visiable();else this._unvisiable();
        }
    }]);
    return CesiumMapLayer;
}();

/**
 * @author kyle / http://nikai.us/
 */

function getDataSet(geoJson) {

    var data = [];
    var features = geoJson.features;
    if (features) {
        for (var i = 0; i < features.length; i++) {
            var feature = features[i];
            var geometry = feature.geometry;
            var properties = feature.properties;
            var item = {};
            for (var key in properties) {
                item[key] = properties[key];
            }
            item.geometry = geometry;
            data.push(item);
        }
    }
    return new DataSet(data);
}

exports.CesiumMapLayer = CesiumMapLayer;
exports.MapVRenderer = MapVRenderer;
exports.BaseLayer = BaseLayer;
exports.DataSet = DataSet;
exports.getDataSet = getDataSet;

Object.defineProperty(exports, '__esModule', { value: true });

})));
