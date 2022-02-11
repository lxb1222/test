<template>
	<div class="wrap">
		<div class="header">
			<van-icon name="arrow-left" @click="goback" />
			<p>{{ title }}列表</p>
			<div style="width: 22px"></div>
		</div>
		<div style="height: 44px"></div>
		<div class="list">
			<van-list
				v-model="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="onLoad"
				offset="300"
			>
				<div
					class="list-item"
					v-for="(item, index) in list"
					:key="index"
					@click="toDetails(item, index)"
				>
					<div class="top">
						<img :src="item.imgePath" alt="" />
						<div class="top-right">
							<p class="title">{{ item.title }}</p>
							<p class="up-date">{{ item.publishTime }}</p>
						</div>
					</div>
					<div class="bottom">
						<div class="bottom-left">
							<span>发布人：</span>
							<span>{{ item.publisher }}</span>
						</div>
						<div class="bottom-right">{{ item.updateTime }}</div>
					</div>
				</div>
			</van-list>
		</div>
	</div>
</template>

<script>
import { getByColumnIdsList, logSave } from "../../api/index";
import { handleDate } from "../../utils/date";
export default {
	data() {
		return {
			title: this.$route.query.title,
			list: [],
			loading: false,
			finished: false,
			projectId: "1",
		};
	},
	mounted() {
		this.getGetByColumnIdsList();
	},
	methods: {
		goback() {
			this.$router.go(-1);
		},
		getGetByColumnIdsList() {
			let data = {
				projectId: this.projectId,
				ids: this.$route.query.id,
			};
			getByColumnIdsList(data).then((res) => {
				this.list = res.data.data.map((item) => {
					if (item.imgePath == "") {
						return item;
					} else {
						item.imgePath = item.imgePath.split(",")[0];
						item.updateTime = handleDate(item.updateTime);
						return item;
					}
				});
			});
		},
		onLoad() {
			setTimeout(() => {
				// 加载状态结束
				this.loading = false;
				// 数据全部加载完成
				if (this.list.length >= this.list.length) {
					this.finished = true;
				}
			}, 1000);
		},
		toDetails(item, index) {
			let data = {
				projectId: this.projectId,
				columnId: item.columnId ? item.columnId : "",
				informationId: item.id ? item.id : "",
				columnCode: item.columnCode ? item.columnCode : "",
				loginName: "",
			};
			logSave(data).then((res) => {
				console.log(res);
			});
			this.$router.push({
				path: "/park-details",
				query: {
					id: item.id,
					title: this.$route.query.title,
				},
			});
		},
	},
};
</script>

<style lang="less" scoped>
.wrap {
	height: 100vh;
	background: #fafafa;
}
.header {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	height: 44px;
	background: #298df8;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 15px;
	z-index: 9999;
	.van-icon {
		font-size: 22px;
		color: #fff;
	}
	p {
		font-size: 18px;
		font-weight: 500;
		color: #ffffff;
	}
}
.list {
	background: #fafafa;
	padding: 0 15px;
	.list-item {
		margin-top: 15px;
		background: #fff;
		padding: 10px;
	}
}
.top {
	display: flex;
	padding-bottom: 15px;
	border-bottom: 1px solid #e7e8e9;
	img {
		width: 130px;
		height: 80px;
	}
	.top-right {
		margin-left: 10px;
		.title {
			font-size: 14px;
			font-weight: 400;
			color: #151e26;
			line-height: 20px;
		}
		.up-date {
			font-size: 12px;
			font-weight: 400;
			color: #b8bbbd;
			line-height: 17px;
			margin-top: 6px;
		}
	}
}
.bottom {
	margin-top: 8px;
	display: flex;
	justify-content: space-between;
	color: #b8bbbd;
	font-size: 12px;
	line-height: 17px;
}
</style>
