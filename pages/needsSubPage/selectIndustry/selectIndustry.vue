<template>
	<view class="content df df-r">
		<view class="cbox">
			<view
				v-for="(item1,index1) in list1"
				:key="index1"
				:class="['item',{sel:selArr[0]===index1}]"
				@tap="changeItem(0,index1)"
			>
				<text class="txt fs_28 c_66">{{item1.name}}</text>
			</view>
		</view>
		<view class="cbox">
			<view
				v-for="(item2,index2) in list2"
				:key="index2"
				:class="['item',{sel:selArr[1]===index2}]"
				@tap="changeItem(1,index2)"
			>
				<text class="txt fs_28 c_66">{{item2.name}}</text>
			</view>
		</view>
		<view class="cbox">
			<view
				v-for="(item3,index3) in list3"
				:key="index3"
				:class="['item',{sel:selArr[2]===index3}]"
				@tap="changeItem(2,index3)"
			>
				<text class="txt fs_28 c_66">{{item3.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
import {Request,Alert} from "../../../api/request.js";
import {uniIcon} from "@dcloudio/uni-ui";

export default {
	data() {
		return {
			eventName: "",
			selArr: [0,0,0],
			sel: null,
			list1: [],
			list2: [],
			list3: []
		}
	},
	onLoad(option){
		this.eventName = option.name;
		this.requestItem(0);
	},
	// 导航栏按钮
	onNavigationBarButtonTap(e){
		if(e.index !== 0){return false;}
		if(!this.sel){
			Alert("未选择行业类型");
			return false;
		}
		uni.$emit(this.eventName,this.sel);
		uni.navigateBack();
	},
	methods: {
		requestItem(r,industry_id){
			Request({
				url: "/index/needs/getIndustrytype",
				data: r?{industry_id:industry_id}:{},
				success: (data)=>{
					this['list'+(r+1)] = data.data.info;
					this.sel = this.list3[this.selArr[2]];
					if(r>=2){return false;}
					this.requestItem(r+1,data.data.info[0].industry_id);
				}
			});
		},
		changeItem(r,id){
			if(r<1){this.$set(this.selArr, 1, 0)}
			if(r<2){this.$set(this.selArr, 2, 0)}
			this.$set(this.selArr, r, id);
			this.sel = this.list3[this.selArr[2]];
			if(r>=2){return false;}
			this.requestItem(r+1,this['list'+(r+1)][id].industry_id);
		}
	},
	components: {uniIcon}
}
</script>

<style scoped>
.cbox{flex:1; height:100vh; overflow-y:auto;}
.cbox+.cbox{border-left:1px solid #CCCCCC;}
.item{padding:20upx 10upx;border-bottom:1px solid #CCCCCC; line-height:1;}
.item .txt{display:flex;}
.sel{background-color:#67C23A;}
</style>
