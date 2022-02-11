<template>
	<div class="wrap">
		<div class="header">{{ title }}{{ title2 }}</div>
		<div style="height: 44px"></div>
		<div class="box" v-if="detailsData.type == 2 || detailsData.type == 3">
			<div
				style="width: 375px; height: 210px"
				v-if="videoOptions.sources[0].src != ''"
			>
				<VideoPlayer :options="videoOptions"></VideoPlayer>
			</div>
			<div
				v-if="detailsData.type == 3"
				style="width: 375px; height: 210px"
			>
				<van-swipe :autoplay="3000">
					<van-swipe-item
						v-for="(image, index) in imgArr"
						:key="index"
					>
						<img
							style="width: 375px; height: 210px"
							v-lazy="image"
						/>
					</van-swipe-item>
				</van-swipe>
			</div>
			<div class="details-center">
				<p class="title">{{ detailsData.title }}</p>
				<div class="fabu-box">
					<p>
						<span>发布人：</span>
						<span>{{ detailsData.publisher }}</span>
					</p>
					<p>
						<span>发布时间：</span>
						<span>{{ detailsData.publishTime }}</span>
					</p>
				</div>
				<div class="zixun">
					<p>
						<span>资讯描述：</span>
						<span>{{ detailsData.description }}</span>
					</p>
				</div>
			</div>
		</div>
		<div class="box1" v-if="detailsData.type == 1">
			<div class="img">
				<img
					style="width: 375px; height: 210px"
					src="http://img.tourdev.cn:8001/nv2/image/stream/customer/61ca7407c93dd833b8d5840f"
					alt=""
				/>
			</div>
			<div class="details-fwb">
				<div class="details-item">
					<p class="title">{{ detailsData.title }}</p>
					<div class="fabu-box">
						<p>
							<span>发布人：</span>
							<span>{{ detailsData.publisher }}</span>
						</p>
						<p>
							<span>发布时间：</span>
							<span>{{ detailsData.publishTime }}</span>
						</p>
					</div>
					<p class="content-item" v-html="detailsData.content"></p>
				</div>
			</div>
		</div>
		<div v-if="isShow == 1">
			<div class="img-swp">
				<img
					style="width: 100%; height: 168px"
					src="../../assets/image/shouye_header.png"
					alt=""
				/>
				<p>瑞安市仙降时尚箱包总部园</p>
			</div>
			<div class="container">
				<div class="center">
					<div
						class="details-title"
						:style="{
							background:
								'url(' +
								backImage +
								') no-repeat center center',
							'background-size': '100% 100%',
						}"
					>
						<p>瑞安市仙降时尚箱包园区</p>
					</div>
					<div style="height: 60px"></div>
					<div class="content-item">
						<p>
							绍兴市柯桥区科技园，集管理办公、研发试验、人才住宿、商务配套等多功能为一体的现代化科技园区，总建筑面积11.7万平方米。政府总投资4.87亿，一期科创大厦2009年建成使用，二期2015年底建成，2016年5月正式开园运营。建成以来，园区建设和产业配套不断推进，高层次人才和高端项目快速聚集。目前已获得多项荣誉，被认定为“省级科技企业孵化器”、“浙江省小微企业创业创新示范园”、“省级海外高层次人才创业创新基地”、“省级大众创业万众创新示范基地”和“绍兴市服务小微企业成长优秀平台”。
						</p>
					</div>
					<div class="box-wrap">
						<div>
							<div class="box-item">
								<img
									src="../../assets/image/title-left.png"
									alt=""
								/>
								<p class="box-title">入驻企业</p>
							</div>
							<div class="settled-item">
								<div class="numrate">
									<span>入驻企业：</span>
									<span>{{ settledNum }}</span>
									<span>家</span>
								</div>
								<div class="numrate">
									<span>入驻企业：</span>
									<span>{{ settledRate }}</span>
								</div>
							</div>
						</div>
						<div>
							<div class="box-item">
								<img
									src="../../assets/image/title-left.png"
									alt=""
								/>
								<p class="box-title">产业布局</p>
							</div>
							<div class="industry">
								<p>主要产业类型</p>
							</div>
						</div>
						<div class="goto">
							<van-button type="info" @click="goTo"
								>返回</van-button
							>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="isShow != 1" class="goback">
			<van-button type="info" @click="goTo">返回</van-button>
		</div>
	</div>
</template>

<script>
import { getInfo } from "../../api/index";
import VideoPlayer from "../../components/VideoPlayer.vue";
import Vue from "vue";
import { Lazyload } from "vant";

Vue.use(Lazyload);
export default {
	components: {
		VideoPlayer,
	},
	data() {
		return {
			title: this.$route.query.title,
			title2: "详情",
			backImage: require("../../assets/image/bj-details.png"),
			settledNum: 55,
			settledRate: "45%",
			// projectId: "1",
			detailsData: [],
			imgArr: [],
			videoOptions: {
				playbackRates: [0.5, 1.0, 1.5, 2.0],
				autoplay: false,
				muted: false,
				controls: true,
				loop: false,
				aspectRatio: "16:9",
				notSupportedMessage: "  ",
				sources: [
					{
						src: "",
						type: "video/mp4",
					},
				],
			},
			isShow: this.$route.query.isShow,
		};
	},
	mounted() {
		this.getDetails();
		if (this.$route.query.isShow == 1) {
			this.title = "瑞安市仙降时尚箱包总部园";
			this.title2 = "";
		}
	},
	methods: {
		goTo() {
			this.$router.go(-1);
		},
		getDetails() {
			getInfo(this.$route.query.id).then((res) => {
				if (res.status == 200) {
					this.detailsData = res.data.data;
					if (res.data.data.videoPath != "") {
						this.videoOptions.sources[0].src =
							res.data.data.videoPath;
					}
					if (res.data.data.imgePath != "") {
						var arr = res.data.data.imgePath.split(",");
						for (var i = 0; i < arr.length; i++) {
							if (arr[i] == "") {
								arr.splice(i, 1);
							}
						}
						this.imgArr = arr;
					}
				}
			});
		},
	},
};
</script>

<style lang="less" scoped>
.wrap {
}
.header {
	font-size: 18px;
	width: 100%;
	height: 44px;
	background: #298df8;
	font-weight: 500;
	color: #ffffff;
	line-height: 44px;
	text-align: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
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
	padding: 0 25px;
	position: relative;
}
.details-title {
	position: absolute;
	width: 318px;
	height: 40px;
	top: -5px;
	z-index: 99;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #f7f7f7;
	font-size: 14px;
}
.content-item {
	padding-bottom: 15px;
	border-bottom: 1px solid #e7e8e9;
	margin-bottom: 10px;
	p {
		font-size: 14px;
		font-weight: 400;
		color: #5b6167;
		line-height: 20px;
		text-align: justify;
	}
}
.box-item {
	display: flex;
	align-items: center;
	height: 32px;
	img {
		width: 6px;
		height: 7px;
		margin-right: 8px;
	}
	p {
		font-size: 16px;
		font-weight: 600;
		color: #151e26;
	}
}
.settled-item {
	display: flex;
	justify-content: space-between;
	color: #5b6167;
	font-size: 14px;
	span:nth-child(2) {
		font-size: 30px;
		color: #298df8;
		line-height: 36px;
	}
}
.industry {
	p {
		margin-top: 10px;
		font-size: 14px;
		font-weight: 400;
		color: #5b6167;
		line-height: 20px;
	}
}
.goback {
	position: fixed;
	left: 15px;
	bottom: 10px;
	.van-button {
		width: 345px;
		height: 44px;
		background: #298df8;
		border-radius: 4px;
	}
	padding-bottom: 15px;
}
.goto {
	margin-left: -20px;
	margin-top: 20px;
	.van-button {
		width: 345px;
		height: 44px;
		background: #298df8;
		border-radius: 4px;
	}
	padding-bottom: 15px;
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
.details-center {
	padding: 10px 15px;
	.title {
		line-height: 1.5;
	}
	.fabu-box {
		display: flex;
		font-size: 14px;
		color: #5b6167;
		justify-content: space-between;
		line-height: 40px;
	}
	.zixun {
		font-size: 14px;
		color: #5b6167;
		line-height: 1.5;
		p {
			span:nth-child(1) {
				color: #298df8;
			}
		}
	}
}
.box1 {
	.img {
		display: flex;
	}
	.details-fwb {
		background: #fff;
		width: 375px;
		position: relative;
		.details-item {
			position: absolute;
			top: -40px;
			left: 10px;
			background: #fff;
			width: 355px;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			padding: 0 25px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.title {
				margin-top: 20px;
				line-height: 1.5;
			}
			.fabu-box {
				display: flex;
				font-size: 14px;
				color: #5b6167;
				justify-content: space-between;
				line-height: 40px;
				p:nth-child(1) {
					margin-right: 20px;
				}
			}
			.content-item {
				line-height: 1.5;
				color: #5b6167;
				font-size: 14px;
			}
		}
	}
}
</style>
