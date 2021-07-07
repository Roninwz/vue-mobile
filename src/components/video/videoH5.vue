<template>
  <video
    :id="id"
    class="video"
    :width="width"
    :height="height"
    x5-video-player-type="h5-page"
    x5-video-player-fullscreen="true"
    x5-video-player-orientation="portraint"
    playsinline="true"
    webkit-playsinline="true"
    controlslist="nodownload noremoteplayback"
    disablePictureInPicture
    :poster="posterUrl"
    controls
    :autoplay="autoplay"
  >
    <source
      :src="videoUrl"
      type="video/mp4"
    >
  </video>
</template>
<script>
/**
 * <Video
      width="100%"
      height="146"
      video-url="https://baidu.com/czone/child-health/ad001.mp4"
    />
 */
  export default {
    components: {},
    props: {
      // 视频唯一id
      id: {
        type: String,
        default: '',
      },
      // 视频名称
      title: {
        type: String,
        default: '',
      },
      // 视频长度
      length: {
        type: Number,
        default: 0,
      },
      width: {
        type: String,
        default: '100%',
      },
      height: {
        type: String,
        default: '100%',
      },
      // 视频的地址
      videoUrl: {
        type: String,
        default: null,
      },
      // 视频封面
      posterUrl: {
        type: String,
        default: '',
      },
      // 是否自动播放
      autoplay: {
        type: String,
        default: null,
      },
    },
    data() {
      return {};
    },
    watch: {},
    created() {},
    mounted() {
      // 获取视频id
      const myVideo = document.getElementById(this.id);
      // 监听视频播放
      myVideo.addEventListener('play', () => {
        // 触发父组件事件，用id来停止同一个vue页面的其它视频
        this.$emit('onplay', this.id);
      });
      // 在音频/视频（audio/video）的播放位置发生改变时触发
      myVideo.addEventListener('timeupdate', () => {
      // 用秒数来显示当前播放进度
      // const timeDisplay = Math.floor(myVideo.currentTime);
      // console.log(Math.floor(myVideo.currentTime));
      });
      // 监听视频暂停
      myVideo.addEventListener('pause', () => {});
    },
    methods: {},
  };
</script>
<style scoped lang='scss'>
.video {
  border-radius: 6px;
}
</style>
