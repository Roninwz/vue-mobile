<template>
  <div
    id="page16"
    class="page16"
  >
    <Video
      :id="videos.video1.id"
      title="时间轴新"
      :length="61"
      width="100px"
      height="100px"
      :video-url="videos.video1.url"
      :poster-url="videos.video1.poster"
      @onplay="onplay"
    />
    <Video
      :id="videos.video5.id"
      title="蛮牛医生"
      :length="5"
      width="100px"
      height="100%"
      :video-url="videos.video5.url"
      :poster-url="videos.video5.poster"
      @onplay="onplay"
    />
    <Video
      :id="videos.video6.id"
      title="板块介绍三合一"
      :length="25"
      width="100%"
      height="100%"
      :video-url="videos.video6.url"
      :poster-url="videos.video6.poster"
      @onplay="onplay"
    />
    <Video
      :id="videos.video7.id"
      title="智慧三合一"
      :length="70"
      width="100%"
      height="100%"
      :video-url="videos.video7.url"
      :poster-url="videos.video7.poster"
      @onplay="onplay"
    />
  </div>
</template>

<script>
  import Video from '@/components/video/videoH5';
  export default {
    components: {
      Video,
    },
    data() {
      return {
        pageTitle: '科技新生态 健康新时代',
        videoList: [
          {
            id: 'video8',
            videoUrl:
              'https://outin-c3311a99e74b11ea83ed00163e1c9256.oss-cn-shanghai.aliyuncs.com/sv/10524ec4-175269b91d0/10524ec4-175269b91d0.mp4',
            videoTitle: '脑卒中h5版',
            videoLength: 36,
            videoPosterUrl: '',
          },
          {
            id: 'video9',
            videoUrl:
              'https://outin-c3311a99e74b11ea83ed00163e1c9256.oss-cn-shanghai.aliyuncs.com/sv/38f204bd-175214c370a/38f204bd-175214c370a.mp4',
            videoTitle: '开屏展示h5',
            videoLength: 34,
            videoPosterUrl: '',
          },
          {
            id: 'video10',
            videoUrl:
              'https://outin-c3311a99e74b11ea83ed00163e1c9256.oss-cn-shanghai.aliyuncs.com/sv/89e3e5e-17526a25443/89e3e5e-17526a25443.mp4',
            videoTitle: '亲友圈',
            videoLength: 15,
            videoPosterUrl: '',
          },
        ],
        videos: {
          video1: {
            id: 'video1',
            url:
              'https://outin-c3311a99e74b11ea83ed00163e1c9256.oss-cn-shanghai.aliyuncs.com/sv/2f7eebc6-1752abd11ce/2f7eebc6-1752abd11ce.mp4',
            poster: '',
          },
          video5: {
            id: 'video5',
            url:
              'https://outin-c3311a99e74b11ea83ed00163e1c9256.oss-cn-shanghai.aliyuncs.com/sv/2f8b9c63-175252ee5ef/2f8b9c63-175252ee5ef.mp4',
            poster: '',
          },
          video6: {
            id: 'video6',
            url:
              'https://outin-c3311a99e74b11ea83ed00163e1c9256.oss-cn-shanghai.aliyuncs.com/sv/40d10d3b-175214c62ea/40d10d3b-175214c62ea.mp4',
            poster: '',
          },
          video7: {
            id: 'video7',
            url:
              'https://outin-c3311a99e74b11ea83ed00163e1c9256.oss-cn-shanghai.aliyuncs.com/sv/12ca8802-1752157c8cf/12ca8802-1752157c8cf.mp4',
            poster: '',
          },
        },
        showDialog: false,
        currentVideoUrl: '',
        currentVideoTitle: '',
        currentVideoLength: 0,
        currentVideoPosterUrl: '',
      };
    },
    computed: {},
    watch: {},
    created() {
      document.title = this.pageTitle;
    },
    mounted() {},
    methods: {
      videoPreview(itemIndex) {
        this.showDialog = true;
        this.currentVideoUrl = this.videoList[itemIndex].videoUrl;
        this.currentVideoTitle = this.videoList[itemIndex].videoTitle;
        this.currentVideoLength = this.videoList[itemIndex].videoLength;
        this.currentVideoPosterUrl = this.videoList[itemIndex].videoPosterUrl;
      },
      onplay(id) {
        for (const v in this.videos) {
          const vid = this.videos[v].id;
          if (vid !== id) {
            const video = document.getElementById(vid);
            video.pause();
          }
        }
      },
    },
  };
</script>

<style scoped lang="scss">
.box-basic {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.page16 {
  padding-bottom: 23px;
  background-color: #3d60d4;
}
</style>
