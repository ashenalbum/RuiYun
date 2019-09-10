<template>
	<view class="content">
		<view class="box">
			<view class="item df df-r ai-c just-c-bet">
				<text class="fs_32 c_red" decode space="ensp">公司名称:</text>
				<input type="text" class="ipt fs_28 c_33" v-model="info.name" placeholder="请输入公司名称" />
			</view>
			<view class="item df df-r ai-c just-c-bet">
				<text class="fs_32 c_red" decode space="ensp">营业执照编码:</text>
				<input type="text" class="ipt fs_28 c_33" v-model="info.code" placeholder="请输入营业执照编码" />
			</view>
			<view class="item df df-r ai-c just-c-bet">
				<text class="fs_32 c_red" decode space="ensp">公司类型:</text>
				<picker
					:value="gsType"
					:range="gsTypes"
					range-key="value"
					@change="selectGsType"
				>
					<view v-if="gsTypes[gsType]" class="ipt fs_28 c_33">{{gsTypes[gsType].value}}</view>
					<input v-else placeholder="请选择公司类型" disabled class="ipt fs_28 c_33" />
				</picker>
			</view>
			<view class="item df df-r ai-c just-c-bet">
				<text class="fs_32 c_red" decode space="ensp">所属行业:</text>
				<text v-if="industry" class="ipt fs_28 c_33" @tap="selectIndustry">{{industry}}</text>
				<input v-else type="text" class="ipt fs_28 c_33" placeholder="请选择所属行业" disabled @tap="selectIndustry" />
			</view>
			<view class="item df df-r ai-c just-c-bet">
				<text class="fs_32 c_red" decode space="ensp">注册资本:</text>
				<input type="number" class="ipt fs_28 c_33" v-model="info.registered_assets" placeholder="请输入注册资本(元)" />
			</view>
			<view class="item df df-r ai-c just-c-bet">
				<text class="fs_32 c_red" decode space="ensp">注册时间:</text>
				<input type="text" class="ipt fs_28 c_33" placeholder="请选择注册时间" v-model="info.register_time" disabled @tap="clickInput"/>
			</view>
			<view class="item df df-r ai-c just-c-bet">
				<text class="fs_32 c_red" decode space="ensp">注册地址:</text>
				<input type="text" class="ipt fs_28 c_33" v-model="info.addr" placeholder="请输入注册地址" />
			</view>
			<view class="item df df-r ai-c just-c-bet">
				<text class="fs_32 c_red" decode space="ensp">联 系 人:</text>
				<input type="text" class="ipt fs_28 c_33" v-model="info.linkman" placeholder="请输入联系人" />
			</view>
			<view class="item df df-r ai-c just-c-bet">
				<text class="fs_32 c_red" decode space="ensp">联系电话:</text>
				<input type="text" class="ipt fs_28 c_33" v-model="info.tel" placeholder="请输入联系电话" />
			</view>
			<view class="item df df-r ai-c just-c-bet">
				<text class="fs_32 c_33" decode space="ensp">传    真:</text>
				<input type="text" class="ipt fs_28 c_33" v-model="info.fax" placeholder="请输入传真" />
			</view>
			<view class="item df df-r ai-c just-c-bet">
				<text class="fs_32 c_33" decode space="ensp">邮    箱:</text>
				<input type="text" class="ipt fs_28 c_33" v-model="info.email" placeholder="请输入邮箱" />
			</view>
		</view>
		<button class="com-btn btn mt_30" @tap="submit">保存信息</button>
	</view>
</template>

<script>
import {Request,UpFile,Alert} from "../../../api/request.js";
import avatar from "../../../components/me/avatar.vue";

export default {
	data() {
		return {
			info:{},
			industry: "",
			industryId: null,
			gsType:"",
			gsTypeId:"",
			gsTypes:[
				{id:"1",value:"合资"},
				{id:"2",value:"独资"},
				{id:"3",value:"国有"},
				{id:"4",value:"私营"},
				{id:"5",value:"全民所有制"},
				{id:"6",value:"集体所有制"},
				{id:"7",value:"股份制"},
				{id:"8",value:"有限责任"},
				{id:"9",value:"事业单位"}
			],
			isEdit: false
		}
	},
	onLoad(){
		uni.$on('authIndustry',(data)=>{
			this.industry = data.name;
			this.industryId = data.id;
		});
		Request({
			url: "/index/user/iscompany",
			showLoad: false,
			success: (data)=>{
				if(data.data && data.data.info){
					let info = data.data.info;
					this.info = info;
					this.gsTypeId = info.type;
					this.gsType = info.type - 1 + "";
					this.industry = info.industry_name;
					this.industryId = info.registered_assets;
					this.isEdit = true;
				}
			}
		})
	},
	methods: {
		submit(){
			if(!this.info.name){Alert('请输入公司名称');return;}
			if(!this.info.code){Alert('请输入营业执照编码');return;}
			if(!this.gsType){Alert('请选择公司类型');return;}
			if(!this.industry){Alert('请选择行业');return;}
			if(!this.info.registered_assets){Alert('请输入注册资本');return;}
			if(!this.info.register_time){Alert('请选择注册时间');return;}
			if(!this.info.addr){Alert('请输入注册地址');return;}
			if(!this.info.linkman){Alert('请输入联系人');return;}
			if(!this.info.tel){Alert('请输入联系电话');return;}
			
			Request({
				url: this.isEdit?"/index/user/editCompany":"/index/user/company",
				type: "post",
				data: {
					type: this.gsTypeId,
					industry: this.industryId,
					...this.info
				},
				success: (data)=>{
					Alert("保存成功");
					uni.navigateBack();
					uni.$emit("getMeInfo",false);
				}
			});
		},
		selectIndustry(){
			uni.navigateTo({url:"../../needsSubPage/selectIndustry/selectIndustry?name=authIndustry"});
		},
		selectGsType(e){
			let i = e.target.value;
			this.gsType = i;
			this.gsTypeId = this.gsTypes[i].id;
		},
		clickInput(){
			plus.nativeUI.pickDate((e)=>{
				let date = e.date;
				let y = date.getFullYear();
				let m = date.getMonth() + 1;
				let d = date.getDate();
				this.$set(this.info,'register_time',`${y}-${m<10?"0"+m:m}-${d<10?"0"+d:d}`);
			});
		}
	},
	components: {avatar}
}
</script>

<style scoped>
.content{box-sizing:border-box; padding-top:20upx; padding-bottom:40upx;}
.box{padding:0 40upx; background:#FFFFFF;}
.item{height:92upx;}
.item+.item{border-top:1px solid #ECECEC;}

.icon{width:60upx; height:60upx; border-radius:50%;}
.ipt{flex:1; text-align:right; padding-right:16upx; padding-left:30upx;}
.btn{margin-left:30upx; margin-right:30upx;}
</style>
