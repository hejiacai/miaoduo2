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
	   	<view class="uni-swiper-msg">
	   		<view class="img">
	   			<image src="../../static/laba.png" mode="widthFix"></image>
	   		</view>
	   		<swiper vertical="true" autoplay="true" circular="true" interval="3000">
	   			<swiper-item v-for="(item, index) in msg" :key="index">
	   				<navigator>{{item}}</navigator>
	   			</swiper-item>
	   		</swiper>
	   	</view>
		<view class="center"></view>
		<view class="lijidai">
			<view class="dai_title">
				<image :src="topList.logo" mode=""></image>
				<view class="dai_title_b">{{topList.name}}</view>
				<view class="dai_title_o">限期{{topList.dueMin}}-{{topList.dueMax}}天</view>
				<view class="dai_title_t">日利率{{topList.dayRate}}%</view>
			</view>
			<view class="dangqain">当前信用额度</view>
			<view class="bjg">￥{{topList.creditMin}}~{{topList.creditMax}}</view>
			<view class="but">
				<button type="primary" @tap="aplly(topList.id)">立即拿钱</button>
			</view>
		</view>
	    <view class="center"></view>
		<view class="box_t">
			<view class="box_t_title" @tap="jump_jing">
				<view class="">热门平台</view>
				<image src="../../static/righttou.png" mode=""></image>
			</view>
			<view class="sect" v-for="(item,index) in hotList" :key="index" @tap="aplly(item.id,index)" :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" :key="index">
				<view class="sect_top">
					<view class="sect_top_left">
						<image :src="item.logo" mode=""></image>
						<view class="li_dai">
							<view class="tgl" v-if="item.tag">{{item.tag}}</view>
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="sect_top_right">
						<text class="yuan">{{item.creditMin}}-{{item.creditMax}}</text>
						<button type="primary">立即申请</button>
					</view>										
				</view>
				<view class="sect_bottom">
					<view class="sect_bottom_top">
						<view class="top_left">贷款期限:{{item.dueMin}}-{{item.dueMax}}天</view>
						<view class="top_right">日利率:{{item.dayRate}}%</view>
					</view>
					<view class="sect_bottom_t">贷款简介:{{item.pdesc}}</view>
				</view>
			</view>
		</view>
		<view class="center"></view>
		<view class="box_tr">
			<view class="box_tr_title box_t_title" @tap="jump_jing">
				<view class="">急速放款</view>
				<image src="../../static/righttou.png" mode=""></image>
			</view>
			<view class="jisu_box">
				<view class="jisu_box_c" v-for="(item,index) in fanList" @tap="aplly_o(item.id)">
					<view class="jisu_box_c_t">
						<image :src="item.logo" mode=""></image>
						<text>{{item.name}}</text>
					</view>
					<view class="jisu_box_c_con">
						{{item.tag}}
					</view>
				</view>
				<!-- <view class="jisu_box_c">
					<view class="jisu_box_c_t">
						<image src="../../static/timg_t.jpg" mode=""></image>
						<text>立即贷款</text>
					</view>
					<view class="jisu_box_c_con">
						流程简单,通过率高
					</view>
				</view>
				<view class="jisu_box_c">
					<view class="jisu_box_c_t">
						<image src="../../static/timg_t.jpg" mode=""></image>
						<text>立即贷款</text>
					</view>
					<view class="jisu_box_c_con">
						流程简单,通过率高
					</view>
				</view>
				<view class="jisu_box_c">
					<view class="jisu_box_c_t">
						<image src="../../static/timg_t.jpg" mode=""></image>
						<text>立即贷款</text>
					</view>
					<view class="jisu_box_c_con">
						流程简单,通过率高
					</view>
				</view> -->
			</view>
		</view>
		<view class="but_t"><button type="primary" @tap="jump_jing">查看更多</button></view>		
	</view>
</template>

<script>
	export default {	
		data() {
			return {
				city: '',
				msg : [
					
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
				hotList:[],
				fanList:[],
				infoList:[],
				visitList:[],
				user:{},
				card:[],
				tc:{},
				advert:{},
				goods:[],
				msg_num:'',
				topList:''
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
					url:'http://api.xinmicredit.cn/banner/getIndexBanner',
					header:{'Authorization': token},										
					success: (res) => {
						// console.info(res.data.data);
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
			getHot(){
				var token = uni.getStorageSync('token');
				uni.request({
					url:'http://api.xinmicredit.cn/product/getGsList',
					header:{'Authorization': token},										
					success: (res) => {
						// console.info(res);
						// console.info(JSON.stringify(res));
						this.hotList = res.data.data;
					},
					fail: (res) => {
						uni.showToast({
							title:'网络错误'
						})
					}
				})
			},
			aplly(id,index){
				uni.showLoading({
					title: '加载中。。。',
					mask: false
				});
				setTimeout(function(){
					uni.hideLoading();
				},1000)
				var newList = this.hotList[index];
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
			},
			getLi(){
				var token = uni.getStorageSync('token');
				uni.request({
					url:'http://api.xinmicredit.cn/product/getIndexTop',
					header:{
						"Authorization": token
						},
					success: (res) => {
						// console.info(JSON.stringify(res));
						// console.info(JSON.stringify(res));
						this.topList = res.data.data;
					}
				})
			},
			getFan(){
				var token = uni.getStorageSync('token');
				uni.request({
					url:'http://api.xinmicredit.cn/product/getYzList',
					header:{
						"Authorization": token
						},
					success: (res) => {
						// console.info(res);
						// console.info(JSON.stringify(res));
						this.fanList = res.data.data;
						// console.info(this.fanList);
					}
				})
			},
			jump_jing(){
				uni.switchTab({
					url:'../daquan/daquan'
				})
			},
			aplly_o(id){
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
						
						var url = res.data.data;
						// #ifdef APP-PLUS
						plus.runtime.openWeb(url);
						// #endif
					},
					fail: (res) => {
						console.info('shibai');
						console.info(JSON.stringify(res));
					}
				})
			},
			info(){
				var token = uni.getStorageSync('token');
				uni.request({
					url:'http://api.xinmicredit.cn/notice/getNotice',
					header:{
						"Authorization": token
						},
					success: (res) => {
						// console.info(res);
						// console.info(JSON.stringify(res));
						this.msg = res.data.data;
						// console.info(this.msg);
					}
				})
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中。。。',
				mask: false
			});
			this.getBanner();
			this.getHot();
			this.getLi();
			this.getFan();
			this.info();
			setTimeout(function(){
				uni.hideLoading();
			},1000)
		},
		onPullDownRefresh: function() {
					//下拉刷新的时候请求一次数据
		    this.getBanner();
		    this.getHot();
		    this.getLi();
		    this.getFan();
		    this.info();
			uni.stopPullDownRefresh();
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(true);
			// #endif
		}
	}
</script>

<style>
	.uni-swiper-msg{
		display: flex;
		align-items: center;
	}
	button::after{ border: none;}
	/* page{
		overflow: hidden;
	} */
	.content{
		overflow: hidden;
	}
	.sect_top_left,.sect_top_right{
		display: flex;
		align-items: center;
	}
	.but_t{
		width: 100%;
		height: 44upx;
		margin-bottom: 20upx;
	}
	.but_t button{
		width: 130upx;
		height: 100%;
		text-align: center;
		line-height: 44upx;
		padding: 0;
		background: #FFC000;
		font-size: 22upx;
		border-radius: 28upx;
		color: #FFFFFF;
		box-shadow:0px 4px 10px rgba(184,130,0,0.21);
	}
	/* .but_t button:hover{
		
	} */
	.box_tr{
		margin-bottom: 20upx;
	}
	.jisu_box_c_con{
		color: #A3A3A3;
		font-size: 30upx;
		text-align: left;
		width: 150upx;
		word-wrap: break-word;
		
	}
	.jisu_box_c_t{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 37upx;
	}
	.jisu_box_c_t image{
		width: 32upx;
		height: 32upx;
		margin-right: 11upx;
	}
	.jisu_box_c_t text{
		color: #3C3C3C;
		font-size: 32upx;
	}
	.jisu_box_c{
		height: auto;
		width: 328upx;
		min-height: 198upx;
		padding-top: 28upx;
		margin-right: 20upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		/* box-shadow: 0upx 0upx 20upx #ffc0001f; */
		box-shadow:0rpx 0rpx 20rpx rgba(255,205,53,0.21);
		margin-bottom: 30upx;
	}
	.jisu_box{
		padding-top: 26upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.box_tr_title{
		width: 100%;
		height: 79upx;
		color: #929292;
		font-size: 24upx;
		border-bottom: 1px solid #EEEEEE;
		/* text-align: center; */
		padding-left: 20upx;
		line-height: 79upx;
	}
	.box_tr_title image{
		margin-right: 40upx;
	}
	.top_left{
		margin-right: 174upx;
	}
	.sect_bottom_top{
		display: flex;
		align-items: center;
		margin-bottom: 19upx;
	}
	.sect_bottom{
		width: 673upx;
		min-height: 93upx;
		background: #fafafa;
		padding: 13upx;
		font-size: 24upx;
		color: #B6B6B6;
		margin-bottom: 25upx;
	}
	.yuan{
		color: #FFC000;
		font-size: 36upx;
		margin-right: 67upx;
	}
	.tgl{
		/* width: auto; */
		/* display: inline-block; */
		height: 27upx;
		text-align: center;
		line-height: 27upx;
		background: #FFD041;
		color: #FFFFFF;
		font-size: 18upx;
		box-sizing: border-box;
		padding: 15upx;
		display: flex;
		align-items:center;
		justify-content: center;
		width:fit-content;
		width:-webkit-fit-content;
		width:-moz-fit-content;
	}
	.li_dai text{
		color: #0C0C0C;
		font-size: 34upx;
		/* margin-right: 59upx; */
	}
	.li_dai{
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.li_dai text{
		
	}
	.sect_top{
		display: flex;
		align-items: center;
		margin-bottom: 20upx;
		justify-content: space-between;
	}
	.sect_top image{
		width: 88upx;
		height: 88upx;
		margin-right: 18upx;
	}
	.sect_top button{
		width: 132upx;
		height: 55upx;
		border-radius: 28upx;
		background: #FFC000;
		color: #FFFFFF;
		font-size: 22upx;
		text-align: center;
		line-height: 55upx;
		padding: 0;
		border:none !important;
		box-shadow:0px 4px 10px rgba(184,130,0,0.21);
	}
	.sect{
		box-sizing: border-box;
		/* padding-top: 21upx; */
		border-bottom: 1px solid #EEEEEE;
		padding: 21upx 10upx 0 0upx;
	}
	.box_t{
		box-sizing: border-box;
		padding: 25upx;
		width: 100%;
		/* height: 600upx; */
		min-height: 599upx;
	}
	.box_t_title{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20upx;
	}
	.box_t_title view{
		color: #0C0C0C;
		font-size: 24upx;	
	}
	.box_t_title image{
		width: 24upx;
		height: 24upx;
	}
	.but{
		width: 100%;
		height: 62upx;
	}
	.but button{
		width: 316upx;
		height: 100%;
		line-height: 62upx;
		text-align: center;
		background: #FFC000;
		color:#FFFFFF ;
		border-radius: 28upx;
		font-size: 30upx;
		padding: 0;	
		/* box-shadow:0px 3px 7px 0px rgba(15,15,15,0.21); */
		box-shadow:0px 4px 10px rgba(184,130,0,0.21);
	}
	.bjg{
		color: #FFBA14;
		font-size: 48upx;
		font-weight: bold;
		margin-bottom: 4upx;
		text-align: center;
	}
	.dangqain{
		width: 100;
		padding-left: 33upx;
		margin-bottom: 10upx;
		margin-top: 15upx;
		color: #D3D3D3;
		font-size: 24upx;
		}
	.dai_title{
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20upx 0 0 33upx;
	}
	.dai_title_b{
		color:#0C0C0C;
		font-size: 22upx;
		font-weight: bold;
		margin-right: 19upx;
	}
	.dai_title_o{
		margin-right: 10upx;
	}
	.dai_title_o,.dai_title_t{
		color: #D3D3D3;
		font-size: 24upx;
	}		
	.dai_title image{
		width: 40upx;
		height: 40upx;
		margin-right: 13upx;
	}	
	.lijidai{
		width: 100%;
		height: 330upx;
	}
	.center{
		width: 100%;
		height: 20upx;
		background: #F5F5F5;
	}
	.img image{
		width: 24upx;
		height: 24upx;
		margin-right: 20upx;
	}
	.uni-swiper-msg{
		width: 100%;
		height: 60upx;
		color: #4F4F4F;
		font-size: 26upx;
		line-height: 60upx;
		/* text-align: center; */
		padding-left: 41upx;
	}
	/* 轮播图 */
	.uni-padding-wrap{
		width: 100%;
		height: 350upx;
		background-color: #E7E6EB;
		padding: 0;
		/* padding-top: 15upx;		 */
	}
	.swiper{
		height: 350upx;
	}
	.swiper-item{
		height: 100%;
		width: 100%;
		margin:0 auto;
	}
	.swiper-item image{
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}
	/* end */
</style>
