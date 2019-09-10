<template>
	<view class="content">
		<view class="item mt_20 shadow">
			<view class="title df df-r just-c-bet c_ff fs_28" :style="{background:titleStyle}">
				<text>需求编号：{{data.number || "--"}}</text>
				<text>{{titleTxt || "--"}}</text>
			</view>
			<view class="txt">
				<text class="one-hide fs_34">{{data.title || "--"}}</text>
				<view class="fs_28 c_66">
					<text class="df mt_10">解决截止时间：{{data.end_time || "--"}}</text>
					<text class="df mt_10">需求类型：{{data.needs_type || "--"}}</text>
					<text class="df mt_10">行业领域：{{data.industry || "--"}}</text>
				</view>
			</view>
			<view class="detail">
				<text class="df fs_28 c_66">{{data.description}}</text>
			</view>
		</view>
		<view v-if="search.type==2" class="callback mt_60 shadow">
			<text class="title fs_34 c_33" :style="{borderColor:titleStyle}">审核结果</text>
			<text class="df mt_20 fs_28 c_66">{{data.reply || "暂无结果"}}</text>
		</view>
	</view>
</template>

<script>
import {Request} from "../../../api/request.js";

export default {
	data() {
		return {
			search: {},
			data: {status:0}
		};
	},
	onLoad(option){
		this.search = option;
		Request({
			url: "/index/user/readNeeds",
			data: this.search,
			success: (data)=>{
				this.data = data.data;
			}
		});
	},
	methods: {
	},
	computed: {
		titleStyle() {
			if(!this.data.status){return false;}
			switch(this.data.status){
				case 1:return "#f5a623";
				case 2:return "#8cc729";
				case 3:return "#fb8988";
			}
		},
		titleTxt(){
			if(!this.data.status){return false;}
			switch(this.data.status){
				case 1:return "未审核";
				case 2:return "通过审核";
				case 3:return "未通过审核";
				default:return "";
			}
		}
	}
}
</script>

<style scoped>
.content{box-sizing:border-box; padding:20upx;}
.item{background:#FFFFFF; border-radius:8upx; overflow:hidden;}
.item .title{padding:24upx 34upx; background:#f5a623;}
.item .txt{padding:20upx 34upx;}
.item .two-hide{display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;overflow: hidden;}
.item .detail{border-top:1px solid #ECECEC; padding:50upx 34upx;}
.callback{padding:26upx 34upx; background:#FFFFFF; border-radius:8upx;}
.callback .title{border-left:2px solid #f5a623; padding-left:20upx;}
</style>
