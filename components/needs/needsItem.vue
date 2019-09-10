<template>
	<view class="item shadow">
		<view class="title df df-r just-c-bet c_ff fs_28" :style="{background:titleStyle}">
			<text>需求编号：{{myData.number}}</text>
			<text>{{titleTxt}}</text>
		</view>
		<view class="txt">
			<text class="one-hide fs_32">{{myData.title}}</text>
			<text class="two-hide fs_28 mt_20">{{myData.description}}</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	computed: {
		titleStyle() {
			if(!this.myData){return false;}
			switch(this.myData.status){
				case 1:return "#f5a623";
				case 2:return "#8cc729";
				case 3:return "#fb8988";
			}
		},
		titleTxt(){
			if(!this.myData){return false;}
			switch(this.myData.status){
				case 1:return "未审核";
				case 2:return "通过审核";
				case 3:return "未通过审核";
			}
		}
	},
	props:["myData"]
}
</script>

<style scoped>
.item{background:#FFFFFF; overflow:hidden;}
.item .title{padding:24upx 34upx;}
.item .title1{ background:#f5a623;}
.item .title2{ background:#fb8988;}
.item .title3{ background:#8cc729;}
.item .txt{padding:20upx 34upx;}
.item .two-hide{display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;overflow: hidden;}
</style>
