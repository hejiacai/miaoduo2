<template>
	<view class="content"  @touchmove.stop.prevent="moveHandle">
		<view class="uni-textarea">
            <!-- <textarea @blur="bindTextAreaBlur" auto-height /> -->
            <!-- <view class="uni-title uni-common-pl">占位符字体是红色的textarea</view> -->
            <view class="uni-textarea">
                <textarea placeholder-style="color:#A3A3A3,font-size: 24upx;" placeholder="请输入您要反馈意见,我们会及时跟进" maxlength="-1" v-model="detail"/>
            </view>
        </view>
		<view class="jtx">请添加截图(选填)</view>
		<view class="pct">
			<!-- <image src="../../static/addpct.png" mode=""></image> -->
			<form action="">
				<div class="img_box">
					<div class="img" @tap="chooseImage">
					  <input type="file" name="" id="up" value="" multiple="multiple" capture="camera" accept="image/*"/>
					</div>
					<div class="img_list">
						<div class="img_list_c" v-for="(item,index) in imageList">
							<image :src="item" mode=""></image>
						</div>
					</div>
				</div>
			</form>
		</view>
		<view class="tjfk"><button @tap="fankui">提交反馈</button></view>		
	</view>
</template>

<script>
	export default {
    data() {
        return {
			imageList:[],
			appVersion: "",
			detail: "",
			deviceInfo: "",
			deviceType: "",
			deviceVersion: "",
			imgPath: "",
			userMobile: ""
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
    methods: {
        chooseImage(){
			var that = this
			var token = uni.getStorageSync('token');
			uni.chooseImage({
				count: 6, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: function (res) {
					console.log(res.tempFilePaths)
					const tempFilePaths = res.tempFilePaths;
					that.imageList = that.imageList.concat(res.tempFilePaths);
					uni.uploadFile({
						url: 'http://api.xinmicredit.cn/file/upLoad', //仅为示例，非真实的接口地址
						method:'POST',
						filePath: tempFilePaths[0],
						header:{'Authorization': token},
						name: 'multipartFile',
						/* formData: {
							multipartFile: that.imageList
						}, */
						success: (res) => {
							// console.info(res);
							// console.info(res.data);
							var list = JSON.parse(res.data);
							// console.info(list.data);
							that.imgPath = list.data;
							console.info(JSON.stringify(that.imgPath));
						}
					});
				}
			});
		},
		fankui(){			
			var that = this;
			console.info(JSON.stringify(that.imgPath));
			var token = uni.getStorageSync('token');
			var phone = uni.getStorageSync('phone');
			uni.getSystemInfo({
				success: (res) => {
					that.appVersion = res.platform;
					that.deviceVersion = res.system;
					that.deviceInfo = res.model;
					that.deviceType = res.brand;				
				}
			})
			uni.request({
				url:'http://api.xinmicredit.cn/feedback/add',
				method:'POST',
				header:{'Authorization': token},
				data:{
					"appVersion": that.appVersion,
					"detail": that.detail,
					"deviceInfo": that.deviceInfo,
					"deviceType": that.deviceType,
					"deviceVersion": that.deviceVersion,
					"imgPath": that.imgPath,
					"userMobile": phone
				},
				success: (res) => {
					console.info(res);
					uni.showToast({
						title:'感谢反馈。。'
					})
				}
			})
		}
    }
}
</script>

<style>
	button::after{ border: none;}
	.content{
		overflow: hidden;
		/* position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 999; */
		}
	.tjfk{
		width: 100%;
		height: 84upx;
	}
	.tjfk button{
		/* display: inline-block; */
		width: 507upx;
		height: 100%;
		background: #FEC426;
		font-size: 34upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 84upx;
		border-radius: 34upx;
		outline: none;
		padding: 0;
		border: 0;
		box-shadow:0px 3px 7px 0px rgba(15,15,15,0.21);
	}
	.img_box{
		display: flex;
		align-items: center;
	}
	.img_list{
		display: flex;
		align-items: center;
		margin-left:10upx;
	}
	.img_list_c{
		width: 100upx;
		height: 100upx;
		margin-right: 10upx;
		border-radius: 10upx;
	}
	input[type="file"]{
	    opacity: 0;
	    position:absolute;
	    width: 78upx;
	    height: 69upx;
	    border:none
	}
	.img{
	   width: 78upx;
	   height: 69upx;
	   margin-right: 15upx;
	   /* margin-bottom: 52upx; */
	   position: relative;
	   background: url(../../static/addpct.png) no-repeat;
	   background-size:78upx 69upx;
	   margin-right: 20upx;
	}
	textarea::-webkit-input-placeholder{
		font-size: 24upx;
		color: #A3A3A3;
	}
	.pct{
		display: flex;
		align-items: center;
		width: 100%;
		height: 150upx;
		padding-left: 38upx;
		box-shadow: 0 5px 5px #F0F0F0;
		margin-bottom: 73upx;
	}
	.pct image{
		width: 100%;
		height: 100%;
		margin-right: 15upx;
	}
	.jtx{
		width: 100%;
		height: 66upx;
		padding-left: 37upx;
		font-size: 24upx;
		color: #A3A3A3;
		box-shadow: inset 0 9upx 5upx #f0f0f0;
		line-height: 66upx;
		margin-bottom: 15upx;
	}
	.uni-textarea textarea{
		box-sizing: border-box;
		width: 100%;
		height: 508upx;
		padding: 36upx 34upx 0 34upx;
		/* text-indent: 34upx; */
		color: #A3A3A3;
		font-size: 24upx;
		box-shadow:inset 0 -5px 5px #f0f0f0;
		box-shadow:inset 0  5px 5px #f0f0f0;
	}
</style>
