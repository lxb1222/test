<template>
	<div class="wrap">
		<div class="header">瑞安市仙降时尚箱包总部园</div>
		<div class="img-swp" @click="goDetails">
			<img
				style="width: 100%; height: 168px"
				src="../../assets/image/shouye_header.png"
				alt=""
			/>
			<p>瑞安市仙降时尚箱包总部园</p>
		</div>
		<div class="container">
			<div class="center">
				<div class="column-list">
					<div
						class="column"
						v-for="(item, index) in columnList"
						:key="index"
						@click="toDetails(item, index)"
					>
						<div class="item-img">
							<img
								:src="item.icon ? item.icon : columnIcon"
								alt=""
							/>
						</div>
						<span>{{ item.columnName }}</span>
					</div>
				</div>
				<div class="footer">
					<div
						class="footet-box"
						v-for="(item1, index) in column"
						:key="index"
					>
						<div class="footer-title">
							<div class="icon-title">
								<span class="icon1"></span>
								<span class="icon2"></span>
							</div>
							<p class="title" @click="columnClick(item1)">
								{{ item1.columnName }}
							</p>
						</div>
						<div class="details">
							<div
								class="details-item"
								:style="{
									background:
										'url(' +
										item1.arr[0].imgePath +
										') no-repeat center center',
									'background-size': '100% 100%',
								}"
								@click="toInfo(item1)"
							>
								<p class="title">
									{{ item1.arr[0].title }}
								</p>
							</div>
							<div>
								<div
									class="details-item2"
									@click="toInfo1(item1)"
									v-if="item1.arr[1]"
								>
									<p class="title" v-if="item1.arr[1]">
										{{ item1.arr[1].title }}
									</p>
									<img
										v-if="item1.arr[1]"
										style="width: 70px; height: 50px"
										:src="item1.arr[1].imgePath"
										alt=""
									/>
								</div>
								<div
									class="details-item2"
									@click="toInfo2(item1)"
									v-if="item1.arr[2]"
								>
									<p class="title" v-if="item1.arr[2]">
										{{ item1.arr[2].title }}
									</p>
									<img
										v-if="item1.arr[2]"
										style="width: 70px; height: 50px"
										:src="item1.arr[2].imgePath"
										alt=""
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getListByColumnIds, getFirstColumn, logSave } from "../../api/index";
export default {
	data() {
		return {
			columnList: [],
			backImage: require("../../assets/image/advert-img.png"),
			image1: require("../../assets/image/advert-img2.png"),
			image2: require("../../assets/image/advert-img3.png"),
			columnIcon: require("../../assets/image/News_information.png"),
			projectId: "1",
			columnItemList: [],
			column: [],
			arrList: [],
			arrList1: [],
		};
	},
	mounted() {
		this.getGetListByColumnIds();
	},
	methods: {
		toDetails(item, index) {
			let data = {
				projectId: this.projectId,
				columnId: "",
				informationId: item.id,
				columnCode: "",
				loginName: "",
			};
			logSave(data).then((res) => {
				console.log(res);
			});
			this.$router.push({
				path: "/column-list",
				query: {
					title: item.columnName,
					id: item.id,
				},
			});
		},
		getGetListByColumnIds() {
			let data = {
				projectId: this.projectId,
				columnId: "",
				informationId: "",
				columnCode: "",
				loginName: "",
			};
			logSave(data).then((res) => {
				console.log(res);
			});
			getFirstColumn(this.projectId).then((res) => {
				this.columnList = res.data.data;
			});
			getListByColumnIds({ projectId: this.projectId }).then((res) => {
				this.columnItemList = res.data.data;
				for (let item in this.columnItemList) {
					this.columnList.filter((item1) => {
						if (item == item1.id) {
							this.column.push({
								columnName: item1.columnName,
								id: item1.id,
								arr: this.columnItemList[item],
							});
							this.column.map((item) => {
								item.arr.map((item) => {
									item.imgePath = item.imgePath.split(",")[0];
									return item;
								});
							});
						}
					});
				}
			});
		},
		columnClick(item1) {
			let data = {
				projectId: this.projectId,
				columnId: item1.id,
				informationId: "",
				columnCode: "",
				loginName: "",
			};
			logSave(data).then((res) => {
				console.log(res);
			});
			this.$router.push({
				path: "/column-list",
				query: {
					id: item1.id,
					title: item1.columnName,
				},
			});
		},
		toInfo(item1) {
			let data = {
				projectId: this.projectId,
				columnId: item1.arr[0].columnId ? item1.arr[0].columnId : "",
				informationId: item1.arr[0].id ? item1.arr[0].id : "",
				columnCode: item1.arr[0].columnCode
					? item1.arr[0].columnCode
					: "",
				loginName: "",
			};
			logSave(data).then((res) => {
				console.log(res);
			});
			this.$router.push({
				path: "/park-details",
				query: {
					id: item1.arr[0].id,
					title: item1.columnName,
				},
			});
		},
		toInfo1(item1) {
			let data = {
				projectId: this.projectId,
				columnId: item1.arr[1].columnId ? item1.arr[1].columnId : "",
				informationId: item1.arr[1].id ? item1.arr[1].id : "",
				columnCode: item1.arr[1].columnCode
					? item1.arr[1].columnCode
					: "",
				loginName: "",
			};
			logSave(data).then((res) => {
				console.log(res);
			});
			this.$router.push({
				path: "/park-details",
				query: {
					id: item1.arr[1].id,
					title: item1.columnName,
				},
			});
		},
		toInfo2(item1) {
			let data = {
				projectId: this.projectId,
				columnId: item1.arr[2].columnId ? item1.arr[2].columnId : "",
				informationId: item1.arr[2].id ? item1.arr[2].id : "",
				columnCode: item1.arr[2].columnCode
					? item1.arr[2].columnCode
					: "",
				loginName: "",
			};
			logSave(data).then((res) => {
				console.log(res);
			});
			this.$router.push({
				path: "/park-details",
				query: {
					id: item1.arr[2].id,
					title: item1.columnName,
				},
			});
		},
		goDetails() {
			let data = {
				projectId: this.projectId,
				columnId: "",
				informationId: "",
				columnCode: "",
				loginName: "",
			};
			logSave(data).then((res) => {
				console.log(res);
			});
			this.$router.push({
				path: "/park-details",
				query: {
					isShow: 1,
				},
			});
		},
	},
};
</script>

<style lang="less" scoped>
.header {
	font-size: 18px;
	height: 44px;
	background: #298df8;
	font-weight: 500;
	color: #ffffff;
	line-height: 44px;
	text-align: center;
}
.container {
	width: 355px;
	position: relative;
	background: #fff;
}
.center {
	position: absolute;
	background: #fff;
	width: 355px;
	top: -30px;
	left: 10px;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	padding-bottom: 10px;
}
.column-list {
	width: 355px;
	height: 180px;
	padding: 20px 12px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.column {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
}
.column:nth-child(2) {
	margin-left: 40px;
}
.column:nth-child(3) {
	margin: 0 40px;
}
.item-img {
	width: 36px;
	height: 36px;
	background: #298df8;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.item-img img {
	width: 24px;
	height: 24px;
	color: #fff;
}
.column span {
	width: 52px;
	height: 18px;
	font-size: 13px;
	font-weight: 400;
	color: #151e26;
	line-height: 18px;
	margin-top: 5px;
	display: flex;
	justify-content: center;
	white-space: nowrap;
}
.footer {
}
.footer-title {
	display: flex;
	align-items: center;
	.icon-title {
		height: 30px;
		display: flex;
		align-items: center;
		.icon1 {
			width: 3px;
			height: 7px;
			background: #298df8;
		}
		.icon2 {
			width: 3px;
			height: 7px;
			background: #78b7fb;
			margin-left: 0.5px;
		}
	}
	.title {
		font-size: 14px;
		font-weight: 600;
		color: #151e26;
		line-height: 20px;
		margin-left: 6px;
	}
}
.details-item {
	width: 355px;
	height: 150px;
	position: relative;
	.title {
		width: 100%;
		font-size: 14px;
		font-weight: 400;
		color: #f7f7f7;
		line-height: 30px;
		height: 30px;
		background: rgba(0, 0, 0, 0.6);
		padding-left: 10px;
		position: absolute;
		bottom: 5px;
	}
}
.details-item2 {
	height: 64px;
	display: flex;
	justify-content: space-between;
	padding: 7px 0;
	border-bottom: 1px solid #f3f4f4;
	.title {
		font-size: 14px;
		height: 20px;
		font-weight: 400;
		color: #151e26;
		line-height: 20px;
		margin-top: 3px;
	}
}
.img-swp {
	height: 168px;
	position: relative;
	p {
		font-size: 14px;
		font-weight: 400;
		color: #f7f7f7;
		line-height: 20px;
		position: absolute;
		left: 15px;
		bottom: 45px;
	}
}
</style>
