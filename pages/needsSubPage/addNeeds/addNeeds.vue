<template>
	<view class="content" ref="abc">
		<view class="bg_ff shadow bd-r padding">
			<input class="ipt fs_28 c_33" placeholder="请输入需求标题" v-model="formData.title" />
			<input class="ipt fs_28 c_33" placeholder="请输入期望解决截止时间" v-model="formData.inputDate" disabled @tap="clickInput"/>
			<picker
				:value="formData.needTypeVal"
				:range="needType"
				range-key="value"
				@change="selectNeedType"
			>
				<view v-if="needType[formData.needTypeVal]" class="ipt fs_28 c_33">{{needType[formData.needTypeVal].value}}</view>
				<input v-else placeholder="请选择需求类型" disabled class="ipt fs_28 c_33" />
			</picker>
			<input class="ipt nobd fs_28 c_33" placeholder="请选择行业类型" v-model="formData.industryName" disabled @tap="selectIndustry" />
		</view>
		<textarea
			placeholder="请输入需求描述（500字内）"
			maxlength="500"
			v-model="formData.text"
			class="textarea shadow bd-r bg_ff fs_28 c_66 mt_60"
		></textarea>
		<button class="com-btn mt_60" @tap="submit">
			<uni-icon type="paperplane" size="30"></uni-icon>
			确认发布
		</button>
	</view>
</template>

<script>
import {uniIcon} from '@dcloudio/uni-ui';
import {Request,Alert} from "../../../api/request.js";

export default {
	data() {
		return {
			formData: {
				title: "",
				inputDate: "",
				needTypeId: null,
				needTypeVal: null,
				industryName: "",
				industryId: null,
				text: ""
			},
			needType: [],
		}
	},
	onLoad(){
		Request({
			url:"/index/needs/getNeedsType",
			type:"post",
			success: (data)=>{
				if(data.code){
					Alert(data.message);
					return false;
				}
				let arr = data.data.info;
				for(let i in arr){
					this.needType.push({id:i,value:arr[i]});
				}
			}
		});
		uni.$on('setIndustry',(data)=>{
			this.formData.industryName = data.name;
			this.formData.industryId = data.id;
		});
	},
	methods: {
		clickInput(){
			plus.nativeUI.pickDate((e)=>{
				let date = e.date;
				let y = date.getFullYear();
				let m = date.getMonth() + 1;
				let d = date.getDate();
				this.$set(this.formData,'inputDate',`${y}-${m<10?"0"+m:m}-${d<10?"0"+d:d}`);
			});
		},
		selectNeedType(e){
			let i = e.target.value;
			this.formData.needTypeVal = i;
			this.formData.needTypeId = this.needType[i].id;
		},
		selectIndustry(){
			uni.navigateTo({url:"../selectIndustry/selectIndustry?name=setIndustry"});
		},
		submit(){
			let submitObj = {
				title: this.formData.title,
				end_time: this.formData.inputDate,
				needs_type: this.formData.needTypeId,
				industry: this.formData.industryId,
				description: this.formData.text
			}
			if(!submitObj.title){Alert("请输入标题");return false;}
			if(!submitObj.end_time){Alert("请选择截止时间");return false;}
			if(!submitObj.needs_type){Alert("请选择需求类型");return false;}
			if(!submitObj.industry){Alert("请选择行业类型");return false;}
			if(!submitObj.description){Alert("请输入需求描述");return false;}
			
			Request({
				url:"/index/needs/setneeds",
				type:"post",
				data:submitObj,
				success(data){
					Alert("创建成功");
					uni.$emit("needsGetList",false);
					uni.navigateBack();
				}
			})
		}
	},
	components: {uniIcon},
}
</script>

<style scoped>
.content{box-sizing:border-box; padding:20upx 28upx;}
.padding{padding:1upx 20upx 20upx;}
.bg_ff{background:#FFFFFF;}
.bd-r{border-radius:8upx;}
.bd-top{border-top:1px solid #ECECEC;}
.ipt{margin-top:20upx; border-bottom:1px solid #ececec; height:80upx; padding:0 10upx; line-height:80upx;}
.nobd{border:0;}
.textarea{ display:flex; box-sizing:border-box; width:100%; padding:20upx;}
</style>