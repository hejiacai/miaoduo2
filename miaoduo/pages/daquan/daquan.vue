<template>
	<view class="content">
		<view class="uni-padding-wrap">
		    <view class="page-section swiper">
		        <view class="page-section-spacing">
		            <swiper class="swiper"  :indicator-dots="bannerDatas.indicatorDots" :autoplay="bannerDatas.autoplay" :interval="bannerDatas.interval" :duration="bannerDatas.duration" 
					:indicator-color="bannerDatas.indicatorColor" :indicator-active-color="bannerDatas.indicatorActivevColor" :circular="bannerDatas.circular" >
		                <swiper-item v-for="(item,index) in banner" :key="index">
		                    <view class="swiper-item">
								<image :src="item.bpath" @tap="turn_open(item.bhref)"></image>
							</view>
		                </swiper-item>
		            </swiper>
		        </view>
		    </view>
		</view>
		<view class="qian">
			<view class="qian_c" v-for="(item,index) in topList" @tap="aplly(item.id)">
				<image :src="item.logo" mode=""></image>
				<view class="qian_c_cen">
					<text class="qianduo">{{item.name}}</text>
					<text>额度:{{item.creditMin}}-{{item.creditMax}}</text>
					<text>期限{{item.dayRate}}天</text>
				</view>
			</view>
			<!-- <view class="qian_c">
				<image src="../../static/jinqian.png" mode=""></image>
				<view class="qian_c_cen">
					<text class="qianduo">钱多多</text>
					<text>额度:5000</text>
					<text>期限30天</text>
				</view>
			</view> -->
		</view>
		<view class="sect" v-for="(item,index) in productList" @tap="aplly(item.id,index)">
			<view class="sect_top">
				<image :src="item.logo" mode=""></image>
				<view class="xjfc">{{item.name}}</view>
				<view class="dlgd">低利率{{item.tag}}</view>
			</view>
			<view class="sect_bt">
				<view class="sect_bt_left">
					<view class="sect_bt_left_t">{{item.creditMin}}-{{item.creditMax}}</view>
					<text>额度范围(元)</text>
				</view>
				<view class="sect_bt_cen">期限{{item.dueMin}}-{{item.dueMax}}天</view>
				<view class="sect_bt_right">
					<button type="primary">立即拿钱</button>
				</view>
			</view>
		</view>
		<!-- <view class="sect">
			<view class="sect_top">
				<image src="../../static/daquan.png" mode=""></image>
				<view class="xjfc">现金飞船</view>
				<view class="dlgd">低利率</view>
				<view class="dlgd">额度高</view>
			</view>
			<view class="sect_bt">
				<view class="sect_bt_left">
					<view class="sect_bt_left_t">2000-8000</view>
					<text>额度范围(元)</text>
				</view>
				<view class="sect_bt_cen">期限15-90天</view>
				<view class="sect_bt_right">
					<button type="primary">立即拿钱</button>
				</view>
			</view>
		</view>
		<view class="sect">
			<view class="sect_top">
				<image src="../../static/daquan.png" mode=""></image>
				<view class="xjfc">现金飞船</view>
				<view class="dlgd">低利率</view>
				<view class="dlgd">额度高</view>
			</view>
			<view class="sect_bt">
				<view class="sect_bt_left">
					<view class="sect_bt_left_t">2000-8000</view>
					<text>额度范围(元)</text>
				</view>
				<view class="sect_bt_cen">期限15-90天</view>
				<view class="sect_bt_right">
					<button type="primary">立即拿钱</button>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {	
		data() {
			return {
				city: '',
				msg : [
					'uni-app行业峰会频频亮相，开发者反响热烈',
					'DCloud完成B2轮融资，uni-app震撼发布',
					'36氪热文榜推荐、CSDN公号推荐 DCloud CEO文章'
				],
				bannerDatas:{
					autoplay:true,
					indicatorDots:true,
					indicatorColor:'#CCCCCC',
					indicatorActivevColor:'#FFFFFF',
					circular:true,
					interval:5000
				},
				banner:[],
				topList:[],
				productList:[],
				visitList:[],
				user:{},
				card:[],
				tc:{},
				advert:{},
				goods:[],
				msg_num:''
			}
		},		
		methods: {
			turn_open(url){
				// #ifdef APP-PLUS
				plus.runtime.openWeb(url);
				// #endif
			},
			getBanner(){
				var token = uni.getStorageSync('token');
				/* console.info(token);
				console.info(typeof(token)); */
				uni.request({
					url:'http://api.xinmicredit.cn/banner/getSecondBanner',
					header:{'Authorization': token},										
					success: (res) => {
						console.info(res.data.data);
						// console.info(JSON.stringify(res.data.data));
						this.banner = res.data.data;
					},
					fail: (res) => {
						uni.showToast({
							title:'网络错误'
						})
					}
				})
			},
			getTop(){
				var token = uni.getStorageSync('token');
				/* console.info(token);
				console.info(typeof(token)); */
				uni.request({
					url:'http://api.xinmicredit.cn/product/getSecondTop',
					header:{'Authorization': token},										
					success: (res) => {
						// console.info(res);
						console.info(JSON.stringify(res.data.data));
						this.topList = res.data.data;
					},
					fail: (res) => {
						uni.showToast({
							title:'网络错误'
						})
					}
				})
			},
			getProduct(){
				var token = uni.getStorageSync('token');
				/* console.info(token);
				console.info(typeof(token)); */
				uni.request({
					url:'http://api.xinmicredit.cn/product/getSecondList',
					header:{'Authorization': token},										
					success: (res) => {
						console.info(res);
						// console.info(JSON.stringify(res.data.data));
						this.productList = res.data.data;
					},
					fail: (res) => {
						uni.showToast({
							title:'网络错误'
						})
					}
				})
			},
			/* aplly(id){
				// #ifdef APP-PLUS
				   var uuid = plus.device.imsi;
				   console.info(uuid);
				// #endif
				var token = uni.getStorageSync('token');
				var phone = uni.getStorageSync('phone');
				uni.request({
					url:'http://api.xinmicredit.cn/product/getThirdUrl',
					method:'POST',
					header:{
						"Authorization": token,
						"Content-Type": "application/x-www-form-urlencoded"
						},
					data:{
						productId:id,
						mobile:phone,
						cid:uuid,
					},
					success: (res) => {
						// console.info(res);
						var url = res.data.data;
						// #ifdef APP-PLUS
						plus.runtime.openWeb(url);
						// #endif
					}
				})
			}, */
			aplly(id,index){
				var newList = this.productList[index];
				this.visitList.push(newList);
				// console.info(this.visitList);
				uni.setStorageSync('visit',this.visitList);
				// #ifdef APP-PLUS
				   var uuid = plus.device.imsi;
				   // console.info(uuid);
				// #endif
				var token = uni.getStorageSync('token');
				var phone = uni.getStorageSync('phone');
				uni.request({
					url:'http://api.xinmicredit.cn/product/getThirdUrl',
					method:'POST',
					header:{
						"Authorization": token,
						"Content-Type": "application/x-www-form-urlencoded"
						},
					data:{
						productId:id,
						mobile:phone,
						cid:uuid,
					},
					success: (res) => {
						// console.info(res);
						console.info(JSON.stringify(res));
						if(res.data.code==3002){
							console.info('你好啊');
							uni.reLaunch({
								url:'../login/login'
							})
						}else{
							var url = res.data.data;
							// #ifdef APP-PLUS
							plus.runtime.openWeb(url);
							// #endif
						}
					},
					fail: (res) => {
						console.info('shibai');
						console.info(JSON.stringify(res));
					}
				})
			}
		},
		onLoad() {
			// this.check_login();
			this.getBanner();
			this.getTop();
			this.getProduct();
		},
		onPullDownRefresh: function() {
					//下拉刷新的时候请求一次数据
		    this.getBanner();
		    this.getTop();
		    this.getProduct();
			uni.stopPullDownRefresh();
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(false);
			// #endif
		}
	}
</script>

<style>
	button::after{ border: none;}
	.sect_bt_right button{
		width: 154upx;
		height: 54upx;
		border-radius: 27upx;
		background: #FFCA29;
		color: #FFFFFF;
		font-size: 24upx;
		text-align: center;
		line-height: 54upx;
	    padding: 0;
		box-shadow:0px 4px 10px rgba(184,130,0,0.21);
	}
	.sect_bt_cen{
		color: #8A8A8A;
		font-size: 24upx;
	}
	.sect_bt_left_t{
		color: #FAD00D;
		font-size: 36upx;
	}
	.sect_bt_left{
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.sect_bt_left text{
		color: #8A8A8A;
		font-size: 24upx;
	}
	.sect_bt{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.dlgd{
		width: 84upx;
		height: 27upx;
		background: #FFD041;
		color: #FFFFFF;
		font-size: 18upx;
		text-align: center;
		line-height: 27upx;
		margin-right: 10upx;
	}
	.xjfc{
		 color: #3B3B3B;
		 font-size: 34upx;
		 margin-right: 10upx;
	}
	.sect_top{
		display: flex;
		align-items: center;
		margin-bottom: 10upx;
	}
	.sect_top image{
		width: 64upx;
		height: 64upx;
		margin-right: 10upx;
	}
	.sect{
		box-sizing: border-box;
		width: 100%;
		min-height: 219upx;
		padding: 24upx 24upx 0 22upx;
		box-shadow:0px 3px 3px #EEEEEE;
	}
	.qian_c{
		display: flex;
		align-items: center;
	}
	.center{
		width: 3upx;
		height: 101upx;
		background: #F5F5F5;
	}
	.qian_c_cen text{
		margin-bottom: 10upx;
	}
	.qianduo{
		font-size: 30upx!important;
		color: #3B3B3B!important;
	}
	.qian_c_cen{
		display: flex;
		flex-direction: column;
		color: #A2A2A2;
		font-size: 22upx;
	}
	.qian_c image{
		width: 66upx;
		height: 66upx;
		margin-right: 23upx;
	}
	.qian{
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 37upx 50upx;
		justify-content: space-between;
		margin-bottom: 32upx;
		box-shadow:0px 3px 3px #EEEEEE;
	}
	/* 轮播图 */
	.uni-padding-wrap{
		width: 100%;
		height: 207upx;
		background-color: #E7E6EB;
		padding: 0;
		padding-top: 15upx;		
	}
	.swiper{
		height: 207upx;
	}
	.swiper-item{
		height: 166upx;
		width: 690upx;
		margin:0 auto;
	}
	.swiper-item image{
		width: 100%;
		/* height: 100%; */
		height: 196upx;
		border-radius: 5px;
	}
	/* end */
	
</style>
