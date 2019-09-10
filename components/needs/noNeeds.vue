<template>
	<view class="page">
		<text class="top txt fs_24">您目前没有发布任何需求，可参考以下发布需求流程，以便更快捷有效的解决您的问题</text>
		<view class="box fs_30">
			<text class="ti shadow">选择需求类型，填写需求关键词</text>
			<image src="../../static/needs/j1.png" class="img"></image>
			<text class="ti shadow">在线发布需求</text>
			<image src="../../static/needs/j2.png" class="img"></image>
			<text class="ti shadow">快速需求对接</text>
			<image src="../../static/needs/j3.png" class="img"></image>
			<text class="ti shadow">接洽合作，解决难题</text>
		</view>
		<navigator url="../../pages/needsSubPage/addNeeds/addNeeds">
			<button class="com-btn btn">
				<uni-icon type="plus"></uni-icon>
				<text class="pl_20">添加新的需求</text>
			</button>
		</navigator>
	</view>
</template>

<script>
import {uniIcon} from '@dcloudio/uni-ui'

export default {
	data() {
		return {
			
		};
	},
	components: {uniIcon}
}
</script>

<style scoped>
.pl_20{padding-left:20upx;}
.page{padding:30upx 28upx;}
.top{border:1px dashed #d0021b; background:#FBE5E5; }
.txt{display:flex; padding:14upx 32upx; text-align:center; line-height:48upx;}
.box{margin-top:20upx; padding:60upx 0; display:flex; flex-direction:column; align-items:center; background:#FFFFFF;}
.box .ti{line-height:80upx; padding:0 40upx;}
.box .img{width:40upx; height:40upx; margin:20upx;}
.btn{margin-top:100upx;}
</style>
