<template>
		<view class="box">
			<view class="uni-padding-wrap" :style="{width:Screen_width+'px',height:Screen_height+'px'}">
			    <view class="page-section swiper" :style="{width:Screen_width+'px',height:Screen_height+'px'}">
			        <view class="page-section-spacing" :style="{width:Screen_width+'px',height:Screen_height+'px'}">
			            <swiper class="swiper" :autoplay="bannerDatas.autoplay" :interval="bannerDatas.interval" :duration="bannerDatas.duration" 
						:indicator-color="bannerDatas.indicatorColor" :indicator-active-color="bannerDatas.indicatorActivevColor" :circular="bannerDatas.circular" :style="{width:Screen_width+'px',height:Screen_height+'px'}">
			                <swiper-item v-for="(item,index) in List" :key="index">
			                    <view class="swiper-item">
									<!-- <image :src="item.bpath"></image> -->
									<view class="tanzhao"></view>
									<view class="box_o">
										<view class="title">￥{{item.creditMin}}-{{item.creditMax}}</view>
										<view class="rll">日利率:{{item.dayRate}}%</view>
										<view class="qx">期限:{{item.dueMin}}-{{item.dueMax}}天</view>
										<view class="but">
											<text @tap="aplly(item.id)">立即拿钱</text>
										</view>
										<view class="scceeu">
											<text class="yso">{{item.loanCount}}</text>
											<text class="cg">成功拿钱</text>
										</view>
										<view class="nav_b">
											<view class="nav_b_left">
												<image :src="item.logo" mode=""></image>
												<view class="ljq">
													<view class="ljq_top">来借钱</view>
													<view class="ljq_bot">借款最快3分钟到账</view>
												</view>
											</view>
											<view class="nav_b_right">{{item.score}}</view>
										</view>
									</view>
								</view>
			                </swiper-item>
			            </swiper>
			        </view>
			    </view>
			</view>
			<!-- <view :style="{width:Screen_width+'px',height:Screen_height+'px'}">
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">					
					<view id="" class="scroll-view-item_H" v-for="(item,index) in List">
						<view class="box_o">
							<view class="title">￥{{item.creditMin}}-{{item.creditMax}}</view>
							<view class="rll">日利率:{{item.dayRate}}%</view>
							<view class="qx">期限:{{item.dueMin}}-{{item.dueMax}}天</view>
							<view class="but">
								<text @tap="aplly(item.id)">立即拿钱</text>
							</view>
							<view class="scceeu">
								<text class="yso">{{num}}</text>
								<text class="cg">成功拿钱</text>
							</view>
							<view class="nav_b">
								<view class="nav_b_left">
									<image :src="item.logo" mode=""></image>
									<view class="ljq">
										<view class="ljq_top">来借钱</view>
										<view class="ljq_bot">借款最快3分钟到账</view>
									</view>
								</view>
								<view class="nav_b_right">{{xin}}</view>
							</view>
						</view>
					</view> -->
					<!-- <view id="" class="scroll-view-item_H">
						<view class="box_o">
							<view class="title">￥1000-20000</view>
							<view class="rll">日利率:0.03%</view>
							<view class="qx">期限:1-50天</view>
							<view class="but">
								<text>立即拿钱</text>
							</view>
							<view class="scceeu">
								<text class="yso">4684</text>
								<text class="cg">成功拿钱</text>
							</view>
							<view class="nav_b">
								<view class="nav_b_left">
									<image src="../../static/timg.jpg" mode=""></image>
									<view class="ljq">
										<view class="ljq_top">来借钱</view>
										<view class="ljq_bot">借款最快3分钟到账</view>
									</view>
								</view>							
								<view class="nav_b_right">8.1</view>
							</view>
						</view>
					</view>
					<view id="" class="scroll-view-item_H">
						<view class="box_o">
							<view class="title">￥1000-20000</view>
							<view class="rll">日利率:0.03%</view>
							<view class="qx">期限:1-50天</view>
							<view class="but">
								<text>立即拿钱</text>
							</view>
							<view class="scceeu">
								<text class="yso">4684</text>
								<text class="cg">成功拿钱</text>
							</view>
							<view class="nav_b">
								<view class="nav_b_left">
									<image src="../../static/timg.jpg" mode=""></image>
									<view class="ljq">
										<view class="ljq_top">来借钱</view>
										<view class="ljq_bot">借款最快3分钟到账</view>
									</view>
								</view>							
								<view class="nav_b_right">8.1</view>
							</view>
						</view>
					</view> -->
				<!-- </scroll-view>
			</view> -->
		<!-- </view> -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'scroll-view',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				List:[],
				num:'',
				xin:'',
				bannerDatas:{
					// autoplay:true,
					/* indicatorDots:true,
					indicatorColor:'#CCCCCC',
					indicatorActivevColor:'#FFFFFF', */
					circular:true,
					interval:5000
				},
				banner:[
					{
					bpath:'../../static/lunbo.png'					
					},
					{
					bpath:'../../static/lunbo_o.png'					
					}
				]
			}
		},
		methods: {
			getList(){
				var token = uni.getStorageSync('token');
				/* console.info(token);
				console.info(typeof(token)); */
				uni.request({
					url:'http://api.xinmicredit.cn/product/getThirdList',
					header:{'Authorization': token},										
					success: (res) => {
						console.info(res.data.data);
						// console.info(JSON.stringify(res.data.data));
						this.List = res.data.data;
					},
					fail: (res) => {
						uni.showToast({
							title:'网络错误'
						})
					}
				})
			},
			aplly(id){
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
			},
			random(){
				var num="";
				for(var i=0;i<4;i++){
				num+=Math.floor(Math.random()*10)
			}
			this.num = num;
			},
			RandomNumBoth(min,max){
				var num = Math.random()*(max-min+1)+min;
				console.info(num)
				var n_num ='';
				if(num >= 10){
					n_num = 10.0
				}else{
					n_num = num.toFixed(1)
				}
				 console.info(n_num)
				 this.xin = n_num
			}
		},
		computed: {
		    Screen_width() {
		        return uni.getSystemInfoSync().windowWidth;
		    },
			Screen_height() {
			    return uni.getSystemInfoSync().windowHeight;
			}
		},
		onLoad() {
			this.random();
			this.getList();		
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
	.box_o{
		/* position: fixed;
		top: 50upx;
		left: 50upx;
		z-index: 999;
		width: 642upx;
		height: 680upx;
		box-shadow: 0upx 0upx 40upx rgba(255,205,53,0.21);
		margin: 0 auto;
		padding-top: 40upx; */		
		position:fixed;
		top:48px;
		left:88rpx;
		z-index:999;
		width:590rpx;
		height:573rpx;
		-webkit-box-shadow:0upx 0upx 40upx rgba(255,205,53,0.21);
		box-shadow:0upx -10upx 40upx rgba(255,205,53,0.21);
		margin:0 auto;
		padding-top:40rpx;
	}
	.tanzhao{
		width: 642upx;
		height: 590upx;
		position: fixed;
		top:330rpx;
		left:60rpx;
		z-index: 998;
		box-shadow: 0upx 10upx 40upx rgba(255,205,53,0.21);
	}
	swiper-item{
		background: #FFFFFF;
	}
	.swiper-item{
		position: relative;
		padding-top: 100upx;
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
	.content{
		background: url(../../static/beijing.png) no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 320upx;
	}
	.nav_b_right{
		color: #000000;
		font-size: 36upx;
	}
	.ljq_bot{
		color: #000000;
		font-size: 24upx;
	}
	.ljq{
		display: flex;
		flex-direction: column;
	}
	.ljq_top{
		color: #0F0F0F;
		font-size: 30upx;
	}
	.nav_b{
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 55upx;
		margin-top:105rpx;
	}
	.nav_b_left{
		display: flex;
		align-items: center;
	}
	.nav_b_left image{
		width: 98upx;
		height: 98upx;
		margin-right: 26upx;
	}
	.scceeu{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 50upx;
	}
	.yso{
		color: #FCC117;
		font-size: 20upx;
	}
	/* .dibu{
		width: 100%;
		height: 65upx;
		margin-bottom: 26upx;
	}
	.dibu button{
		width: 323upx;
		height: 100%;
		text-align: center;
		line-height: 65upx;
		padding: 0;
		background: #FFFFFF;
		color: #FBC930;
		font-size: 33upx;
		border-radius: 33upx;
	} */
	.but{
		width: 100%;
		height: 65upx;
		margin-bottom: 26upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.but text{
		display: inline-block;
		width: 323upx;
		height: 100%;
		line-height: 65upx;
		text-align: center;
		background: #FFFFFF;
		color:#FFC000 ;
		font-size: 33upx;
		padding: 0;
		border-radius: 33upx;
		border: 1px solid #EEEEEE;
	}
	.rll,.qx{
		color: #2A2A2A;
		font-size: 24upx;
		text-align: center;
		margin-bottom: 15upx;
	}
	.title{
		color: #FFCD35;
		font-size: 56upx;
		margin-bottom: 60upx;
		text-align: center;
		}
	/* #demo1{
		box-sizing: border-box;
		padding-top: 80upx;
	} */
	
	.scroll-Y {
		height: 300upx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		height: 100%;
		/* display: flex; */
		/* overflow-x: auto; */
	}

/* 	.scroll-view-item {
		height: 300upx;
		line-height: 300upx;
		text-align: center;
		font-size: 36upx;
	} */

	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		text-align: center;
		box-sizing: border-box;
		padding-top: 100upx;
		/* margin-top:-577rpx; */
	}
</style>