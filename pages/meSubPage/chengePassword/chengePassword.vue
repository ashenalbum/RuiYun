<template>
	<view class="content">
		<view class="box">
			<view class="item df df-r ai-c">
				<view class="iconfont icon-pwd fs_34 c_66"></view>
				<input class="ipt fs_30 c_66" v-model="pwd1" type="password" placeholder="请输入新密码"/>
			</view>
			<view class="item df df-r ai-c">
				<view class="iconfont icon-pwd fs_34 c_66"></view>
				<input class="ipt fs_30 c_66" v-model="pwd2" type="password" placeholder="请再次确认密码"/>
			</view>
			<text class="alert fs_24 c_99">注：密码长度至少8位，最多16个字符，数字与字母混合。</text>
		</view>
		<button class="com-btn btn mt_80" @tap="submit">修改密码</button>
	</view>
</template>

<script>
import {Request,Alert} from "../../../api/request.js";
import {uniIcon} from '@dcloudio/uni-ui';

export default {
	data() {
		return {
			pwd1: "",
			pwd2: ""
		}
	},
	methods: {
		submit(){
			if(!this.pwd1){Alert("请输入8-16位数字与字母组合密码");return false;}
			if(!/^[0-9a-zA-Z]{8,16}$/.test(this.pwd1) || !/\d/.test(this.pwd1) || !/[a-zA-Z]/.test(this.pwd1)){Alert("请输入8-16位数字与字母组合密码");return false;}
			if(this.pwd1 != this.pwd2){Alert("两次密码不一致");return false;}
			Request({
				url: "/index/user/modifyPwd",
				type: "post",
				data: {
					pwd1: this.pwd1,
					pwd2: this.pwd2
				},
				success: (data)=>{
					Alert("修改密码成功，请重新登录");
					uni.redirectTo({url:"../../sign/login/login"});
				}
			});
		}
	},
	components: {uniIcon}
}
</script>

<style scoped>
.content{box-sizing:border-box; padding-top:20upx;}
.box{padding:0 40upx; background:#FFFFFF;}
.item{padding:20upx 0 16upx; border-bottom:1px solid #ECECEC;}

.ipt{flex:1; line-height:68upx; height:68upx; padding-right:10upx; padding-left:20upx;}
.alert{line-height:80upx;}
.btn{margin-left:30upx; margin-right:30upx;}
</style>
