<template>
  <div>
    <!-- This div will be the container for the YouTube player -->
    <div id="ytplayer"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

// Declare YT globally to avoid TypeScript errors
declare var YT: any;

const startTime = 200; // Start at 2 minutes (120 seconds)
const idYoutube = "lB8ASupNtlw"; // Replace with your YouTube video ID

let player: any = null;
let current_time = ref(startTime); // Initialize current_time with startTime
let videoPlaying = ref(false); // Track if video is playing
let videoInterval: any = null; // Interval reference to manually update the current time

// Dynamically load the YouTube Iframe API script
const loadYouTubeAPI = () => {
  const script = document.createElement("script");
  script.src = "https://www.youtube.com/iframe_api";
  script.async = true;
  script.onload = initializePlayer; // Initialize player once API script is loaded
  document.head.appendChild(script);
};

// Initialize the YouTube player once the API is ready
const initializePlayer = () => {
  player = new YT.Player("ytplayer", {
    height: "315",
    width: "560",
    videoId: idYoutube,
    playerVars: {
      start: startTime,
      controls: 0,
      modestbranding: 1,
      fs: 0,
      disablekb: 1,
      iv_load_policy: 3,
      rel: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
};

// Player ready event handler
const onPlayerReady = (event: any) => {
  console.log("Player is ready");
};

// Function to format time from seconds to mm:ss
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60); // Get the number of minutes
  const remainingSeconds = seconds % 60; // Get the remaining seconds
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`; // Format as mm:ss
};

// State change event handler
const onPlayerStateChange = (event: any) => {
  // If the video starts playing
  if (event.data === YT.PlayerState.PLAYING) {
    videoPlaying.value = true;

    // Start manually updating the current time every second
    if (!videoInterval) {
      videoInterval = setInterval(() => {
        current_time.value += 1; // Increment the time by 1 second
        console.log("Current time: " + formatTime(current_time.value));
      }, 1000); // Update every second
    }
  } else if (
    event.data === YT.PlayerState.PAUSED ||
    event.data === YT.PlayerState.ENDED
  ) {
    // Stop updating the time when the video is paused or finished
    videoPlaying.value = false;
    if (videoInterval) {
      clearInterval(videoInterval); // Stop the interval
      videoInterval = null;
    }

    if (event.data === YT.PlayerState.ENDED) {
      // When the video ends, show the final current_time
      alert(`Video finished at ${current_time.value} seconds`);
    }
  }
};

// Lifecycle hook to load the YouTube API and initialize the player
onMounted(() => {
  loadYouTubeAPI(); // Load YouTube API when the component is mounted
});
</script>

<style scoped>
#ytplayer {
  margin: auto;
  width: 560px;
  height: 315px;
  cursor: pointer;
}
</style>
