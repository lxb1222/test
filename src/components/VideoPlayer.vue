<template>
	<div>
		<video ref="videoPlayer" class="video-js vjs-fluid" />
	</div>
</template>

<script>
import _videojs from "video.js";
const videojs = window.videojs || _videojs;
export default {
	name: "VideoPlayer",
	props: {
		options: {
			type: Object,
			default() {
				return {};
			},
		},
		isUva: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			noPlay: false,
			player: null,
		};
	},
	mounted() {
		console.log(this.options);
		const _this = this;
		/* _this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this)
    }) */
		_this.player = videojs(
			_this.$refs.videoPlayer,
			_this.options,
			function () {
				this.on("ready", function () {});
				this.on("error", function () {
					this.errorDisplay.close();
					this.dispose();
					_this.noPlay = true;
				});
				/* this.on('timeupdate', function() {
          console.log('timeupdate')
        }) */
				this.on("ended", function () {
					console.log("ended");
				});
			}
		);
	},
	beforeDestroy() {
		if (this.player) {
			this.player.dispose();
		}
	},
	methods: {},
};
</script>

<style lang="less" scoped>
.noplay {
	// background: url("../assets/imgs/videoBG.png") 0 0 no-repeat;
	background-size: 100% 100%;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 16px;
	color: #5d8be6;
}

.isuva {
	// background: url("../assets/imgs/uva.jpg") 0 0 no-repeat;
	background-size: 100% 100%;
}
</style>
