import Vue from 'vue'
import App from './App'
import api from '@/common/vmeitime-http/'

Vue.config.productionTip = false

Vue.prototype.$api = api

App.mpType = 'app'

Vue.prototype.check_login  = function(){
	/* var token = uni.getStorageSync('token');
	if(!token){
		uni.navigateTo({
			url:'/pages/login/login.vue'
		})
	} */
	uni.showToast({
		title:'你好啊'
	})
}
const app = new Vue({
    ...App
})
app.$mount()
