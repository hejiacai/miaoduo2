(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/banner/banner"],{"0f99":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{s:3,settime:""}},methods:{ture_change:function(){clearTimeout(timer);var n=e.getStorageSync("token");null==n||""==n?e.reLaunch({url:"../login/login"}):e.request({url:"http://api.xinmicredit.cn/token/checkToken",method:"GET",header:{Authorization:n},success:function(n){console.info(n.data),console.info(n.data.code),3003==n.data.code?(console.info("youdu"),e.switchTab({url:"../index/index"})):(console.info("youdu2"),e.removeStorageSync("token"),e.reLaunch({url:"../login/login"})),console.info("zhenhao")}})}},computed:{Screen_width:function(){return e.getSystemInfoSync().windowWidth},Screen_height:function(){return e.getSystemInfoSync().windowHeight}},onLoad:function(){plus.navigator.setFullscreen(!0);var n=e.getStorageSync("token");if(null==n||""==n)setTimeout(function(){e.reLaunch({url:"../login/login"})},3e3);else e.request({url:"http://api.xinmicredit.cn/token/checkToken",method:"GET",header:{Authorization:n},success:function(n){3003==n.data.code?(console.info("youdu"),e.switchTab({url:"../index/index"})):(e.removeStorageSync("token"),e.reLaunch({url:"../login/login"})),console.info("zhenhao")}})}};n.default=t}).call(this,t("649d")["default"])},"1d01":function(e,n,t){"use strict";t.r(n);var o=t("0f99"),i=t.n(o);for(var c in o)"default"!==c&&function(e){t.d(n,e,function(){return o[e]})}(c);n["default"]=i.a},"41f5":function(e,n,t){"use strict";var o=t("c42b"),i=t.n(o);i.a},c42b:function(e,n,t){},ed13:function(e,n,t){"use strict";t.r(n);var o=t("f9e8"),i=t("1d01");for(var c in i)"default"!==c&&function(e){t.d(n,e,function(){return i[e]})}(c);t("41f5");var u=t("2877"),a=Object(u["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=a.exports},ed82:function(e,n,t){"use strict";t("3566");var o=c(t("b0ce")),i=c(t("ed13"));function c(e){return e&&e.__esModule?e:{default:e}}Page((0,o.default)(i.default))},f9e8:function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("view",{staticClass:"content",style:{width:e.Screen_width+"px",height:e.Screen_height+"px"}},[t("image",{attrs:{src:"../../static/yindao.jpg",mode:""}}),t("view",{staticClass:"tiao",attrs:{eventid:"3f5d7ce0-0"},on:{tap:e.ture_change}},[e._v("跳过")]),t("view",{staticClass:"dianji",attrs:{eventid:"3f5d7ce0-1"},on:{tap:e.ture_change}},[e._v("点击参与")])])},i=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return i})}},[["ed82","common/runtime","common/vendor"]]]);