<template>
	<view class="content">
		<view class="item shadow">
			<view class="df df-r ai-c">
				<image :src="FILE_URL+'/'+myData.avatar" class="icon shadow" lazy-load></image>
				<view class="role df df-c">
					<text class="df fs_34">{{myData.name}}</text>
					<text class="df fs_28 mt_10">所属机构：{{myData.organization}}</text>
				</view>
			</view>
			<text class="df fs_28 mt_20">专业方向：{{myData.skill}}</text>
			<text class="df fs_28 mt_20" space="ensp">介    绍：{{myData.domain}}</text>
		</view>
		<view class="rect shadow mt_10">
			<view class="title fs_34 c_33">个人简介</view>
			<text class="df mt_20 fs_28 c_33 t-indent">{{myData.intro}}</text>
		</view>
		<view class="rect shadow mt_10">
			<view class="title fs_34 c_33">成果描述</view>
			<text class="df mt_20 fs_28 c_33 t-indent">{{myData.achievement}}</text>
		</view>
		<view class="rect shadow mt_10">
			<view class="title fs_34 c_33">研究描述</view>
			<text class="df mt_20 fs_28 c_33 t-indent">{{myData.research}}</text>
		</view>
	</view>
</template>

<script>
import {Request,FILE_URL} from "../../../api/request.js";
	
export default {
	data() {
		return {
			FILE_URL: "",
			id: null,
			myData: {
				name: "",
				organization: "",
				skill: "",
				domain: "",
				intro: "",
				achievement: "",
				research: ""
			}
		};
	},
	onLoad(option){
		this.FILE_URL = FILE_URL;
		this.id = option.id;
		Request({
			url: "/index/news/getZhikuById",
			data: {id: this.id},
			success: (data)=>{
				this.myData = data.data;
			}
		})
	}
}
</script>

<style scoped>
.content{box-sizing:border-box; padding:20upx 28upx;}
.item{margin-top:20upx; padding:24upx; display:flex; flex-direction: column; background: #FFFFFF; border-radius: 8upx; overflow: hidden;}
.icon{width:132upx; height:132upx; border-radius: 50%;}
.role{flex:1; margin-left:30upx;}
.rect{padding:26upx 34upx 34upx; background:#FFFFFF; border-radius:8upx;}
.rect .title{border-left:2px solid #8cc729; padding-left:20upx; line-height:1;}

</style>
