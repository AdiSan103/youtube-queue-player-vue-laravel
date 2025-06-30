<template>
  <video ref="videoPlayer" class="video-js">
</video>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default {
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, {
      controls: true,
      preload: 'auto',
      sources: [{
        src: 'http://127.0.0.1:8000/video-sample/arsipp.mp4',
        type: 'video/mp4'
      }]
    }, () => {
        // Set the initial time after the player is ready
        this.player.currentTime(10); // Start from 10 seconds
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>