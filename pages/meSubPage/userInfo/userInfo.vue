<template>
	<view class="content">
		<view class="box">
			<view class="item df df-r ai-c just-c-bet">
				<text class="fs_34 c_33" decode space="ensp">头    像:</text>
				<view class="df df-r ai-c">
					<avatar
						selWidth="200px"
						selHeight="400upx"
						@upload="myUpload"
						:avatarSrc="info.avatar"
					></avatar>
				</view>
			</view>
			<view class="item df df-r ai-c just-c-bet">
				<text class="fs_34 c_33" decode space="ensp">姓    名:</text>
				<input type="text" class="ipt fs_28 c_33" v-model="info.nickname" placeholder="请输入姓名" />
			</view>
			<view class="item df df-r ai-c just-c-bet">
				<text class="fs_34 c_33" decode space="ensp">手 机 号:</text>
				<input type="number" class="ipt fs_28 c_33" v-model="info.tel" placeholder="请输入手机号" />
			</view>
			<view class="item df df-r ai-c just-c-bet">
				<text class="fs_34 c_33" decode space="ensp">公司名称:</text>
				<input type="text" class="ipt fs_28 c_33" v-model="info.company" placeholder="请输入公司名称" />
			</view>
			<view class="item df df-r ai-c just-c-bet">
				<text class="fs_34 c_33" decode space="ensp">所属行业:</text>
				<text v-if="industry" class="ipt fs_28 c_33" @tap="selectIndustry">{{industry}}</text>
				<input v-else type="text" class="ipt fs_28 c_33" placeholder="请选择所属行业" disabled @tap="selectIndustry" />
			</view>
		</view>
		<button class="com-btn btn mt_80" @tap="submit">保存信息</button>
	</view>
</template>

<script>
import {Request,UpFile,Alert,FILE_URL} from "../../../api/request.js";
import avatar from "../../../components/me/avatar.vue";

export default {
	data() {
		return {
			info:{},
			industry: "",
			industryId: null
		}
	},
	onLoad(){
		Request({
			url: "/index/user/getinfo",
			success: (data)=>{
				this.info = data.data;
				this.info.avatar = FILE_URL + "/" + data.data.avatar;
				this.industry = data.data.industry;
			}
		});
		uni.$on('userInfoIndustry',(data)=>{
			this.industry = data.name;
			this.industryId = data.id;
		});
	},
	methods: {
		submit(){
			if(this.info.tel && !/^1\d{10}$/.test(this.info.tel)){Alert("请输入正确的手机号");return false;}
			Request({
				url: "/index/user/modifyInfo",
				type: "post",
				data: {
					nickname: this.info.nickname,
					company: this.info.company,
					mobile: this.info.tel,
					industry: this.industryId
				},
				success: (data)=>{
					Alert("修改成功");
					uni.navigateBack();
					uni.$emit("getMeInfo",false);
				}
			});
		},
		myUpload(rsp) {
			this.iconUrl = rsp.path;
			UpFile({
				url: "/index/user/uploadAvatar",
				filePath: rsp.path,
				name: "file",
				success: (data)=>{
					Alert("上传头像成功");
					this.info.avatar = FILE_URL + "/" + data.data.key;
					uni.$emit("getMeInfo",false);
				}
			});
		},
		selectIndustry(){
			uni.navigateTo({url:"../../needsSubPage/selectIndustry/selectIndustry?name=userInfoIndustry"});
		},
	},
	components: {avatar}
}
</script>

<style scoped>
.content{box-sizing:border-box; padding-top:20upx;}
.box{padding:0 40upx; background:#FFFFFF;}
.item{height:100upx;}
.item+.item{border-top:1px solid #ECECEC;}

.icon{width:60upx; height:60upx; border-radius:50%;}
.ipt{flex:1; text-align:right; padding-right:16upx; padding-left:30upx;}
.btn{margin-left:30upx; margin-right:30upx;}
</style>
