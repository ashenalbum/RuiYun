<template>
	<view class="content">
		<view v-if="listData.length" class="listbox">
			<view
				v-for="(item,index) in listData"
				:key="index"
				class="item mt_20"
			>
				<uni-swipe-action
					:options="delOptions"
					@click="delClick($event,item.id)"
				>
					<navigator :url="'../../needsSubPage/needsDetail/needsDetail?id='+item.id+'&type=2'">
						<needs-item :myData="item"></needs-item>
					</navigator>
				</uni-swipe-action>
			</view>
			<view v-if="showLoad" class="more">
				<text>{{moreText}}</text>
			</view>
		</view>
		<view v-else class="pt_30 df just-c-ct ai-c">
			<text class="fs_30 c_99">{{moreText}}</text>
		</view>
		<navigator url="../../needsSubPage/addNeeds/addNeeds">
			<!-- <uni-icon v-if="!noData" class="add" type="plus-filled" size="60" color="#efd50e"></uni-icon> -->
			<image src="../../../static/needs/add.png" class="add"></image>
		</navigator>
	</view>
</template>

<script>
import needsItem from "../../../components/needs/needsItem.vue";
import {Request,Alert} from "../../../api/request.js";
import {uniIcon} from '@dcloudio/uni-ui';
import uniSwipeAction from "../../../components/uni-swipe-action/uni-swipe-action.vue";

export default {
	data() {
		return {
			moreText: "加载中...",
			listData: [],
			pageLen: 10,
			delOptions: [{
                text: '删  除',
                style: {backgroundColor: '#dd524d'}
            }]
		}
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.getList(false);
	},
	// 上拉加载
	onReachBottom(){
		this.moreText = "加载中..."
		uni.stopPullDownRefresh();
		this.moreText = "没有更多数据了";
	},
	onLoad() {
		this.getList();
		uni.$on('needsGetList',()=>{this.getList()});
	},
	methods: {
		getList(){
			this.showLoad = true;
			this.moreText = "加载中...";
			Request({
				url: "/index/user/myneeds",
				showLoad: false,
				success: (data)=>{
					uni.stopPullDownRefresh();
					this.moreText = "暂无数据";
					this.listData = data.data;
				},
				error: ()=>{
					Alert("请求发生错误");
					this.moreText = "暂无数据";
				}
			});
		},
		delClick(e,id){
			uni.showModal({
				title: "请确认",
				content: "要删除该需求吗？",
				success(data){
					if(!data.confirm){return;}
					Request({
						url:"/index/user/delmyneeds",
						data:{id:id},
						success(data){
							Alert("删除成功");
							uni.startPullDownRefresh();
						}
					})
				}
			})
		}
	},
	components:{needsItem,uniIcon,uniSwipeAction}
}
</script>

<style scoped>
.pt_30{padding-top:30upx;}
.item{border-radius:8upx; overflow:hidden;}
.listbox{ padding:2upx 28upx 20upx;}
.addbox{height:132upx;}
.more{padding:20upx;color:#666666;font-size:30upx;text-align: center;}
.add{width:120upx; height:120upx; position:fixed; z-index:99; right:20upx; bottom:60upx;}
</style>
