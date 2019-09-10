<template>
	<view class="content">
		<view class="top ai-c bd-btm">
			<image :src="info.avatar" class="img shadow"></image>
			<view class="txt df df-c c_33">
				<view v-if="info.nickname" class="df ai-c mb_20">
					<text class="username fs_34 one-hide">{{info.nickname}}</text>
					<text v-if="!company" class="company c_66">企业认证</text>
				</view>
				<text class="fs_30 one-hide">{{info.account}}</text>
			</view>
		</view>
		
		<navigator url="../meSubPage/auth/auth">
			<view v-if="company" class="item df df-r just-c-bet mt_20 bd-btm">
				<view class="df ai-c">
					<view class="iconfont icon-qiye fs_32 c_66"></view>
					<text class="pl-20">认证为企业用户</text>
				</view>
				<uni-icon type="arrowright" size="26" color="#666666"></uni-icon>
			</view>
		</navigator>
		<navigator url="../meSubPage/userInfo/userInfo">
			<view class="item df df-r just-c-bet mt_20">
				<view class="df ai-c">
					<view class="iconfont icon-info fs_32 c_66"></view>
					<text class="pl-20">个人信息</text>
				</view>
				<uni-icon type="arrowright" size="26" color="#666666"></uni-icon>
			</view>
		</navigator>
		<navigator url="../meSubPage/chengePassword/chengePassword">
			<view class="item df df-r just-c-bet bd-btm">
				<view class="df ai-c">
					<view class="iconfont icon-pwd fs_32 c_66"></view>
					<text class="pl-20">密码修改</text>
				</view>
				<uni-icon type="arrowright" size="26" color="#666666"></uni-icon>
			</view>
		</navigator>
		<navigator url="../meSubPage/myNeeds/myNeeds">
			<view class="item df df-r just-c-bet mt_20">
				<view class="df ai-c">
					<view class="iconfont icon-needs fs_32 c_66"></view>
					<text class="pl-20">我的历史需求</text>
				</view>
				<uni-icon type="arrowright" size="26" color="#666666"></uni-icon>
			</view>
		</navigator>
		<navigator url="../meSubPage/mySave/mySave">
			<view class="item df df-r just-c-bet bd-btm">
				<view class="df ai-c">
					<view class="iconfont icon-star fs_32 c_66"></view>
					<text class="pl-20">我的收藏</text>
				</view>
				<uni-icon type="arrowright" size="26" color="#666666"></uni-icon>
			</view>
		</navigator>
		<view class="mt_80">
			<button class="btn com-btn" @tap="outSign">退出登录</button>
		</view>
	</view>
</template>

<script>
import {Request,outLogin,FILE_URL} from "../../api/request.js";
import {uniIcon} from "@dcloudio/uni-ui";

export default {
	data() {
		return {
			info: {},
			company: true,
			companyData: {}
		}
	},
	onShow(){
		this.getMessage();
		this.isCompany();
	},
	onLoad(){
		this.getInfo();
		uni.$on('getMeInfo',()=>{this.getInfo()});
	},
	// 导航栏按钮
	onNavigationBarButtonTap(e){
		if(e.index == 0){uni.navigateTo({url:"../common/message/message"})}
	},
	methods: {
		getInfo(){
			Request({
				url: "/index/user/getinfo",
				showLoad: false,
				success: (data)=>{
					this.info = data.data;
					this.info.avatar = FILE_URL + "/" + data.data.avatar;
					this.industry = data.data.industry;
				}
			});
		},
		isCompany(){
			Request({
				url: "/index/user/iscompany",
				showLoad: false,
				success: (data)=>{
					if(data.data && data.data.info && data.data.info.status==1){
						this.company = false;
						this.companyData = data.data.info;
					}else{
						this.company = true;
						this.companyData = data.data.info;
					}
				}
			})
		},
		outSign(){
			uni.showModal({
				title: '提示',
				content: '确定要退出登录吗',
				success: (res) => {
					if (res.confirm) {outLogin(false)}
				}
			});
		},
		getMessage(){
			Request({
				url: "/index/user/newReply",
				showLoad: false,
				success: (data)=>{
					let webView = this.$mp.page.$getAppWebview();
					webView.setTitleNViewButtonBadge({index: 0, text: (data.data && data.data.count) || ""});
				}
			});
		}
	},
	components: {uniIcon}
}
</script>

<style scoped>
.mb_20{margin-bottom:20upx;}
.top{display:flex; padding:60upx 40upx; background: #FFFFFF;}
.top .img{width:132upx; height:132upx; border-radius: 50%;}
.txt{flex:1; padding-left:30upx;}
.icon{width:40upx; height:40upx;}
.right{width:20upx; height:36upx;}

.item{padding:24upx 10upx 24upx 30upx; background:#FFFFFF; }
.pl-20{padding-left:24upx;}
.btn{width:690upx;}
.bd-btm{border-bottom:1px solid #d8d8d8;}
.company{margin-left:30upx; padding:5upx; line-height:20upx; font-size:20upx; border:1px solid; border-radius:10upx; color: #efd50e;}
.username{max-width:360upx; overflow:hidden; text-overflow:ellipsis; display: -webkit-box;}
</style>
