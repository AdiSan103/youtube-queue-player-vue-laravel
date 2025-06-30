<template>
  <div class="container mt-5">
    <h1 class="h3">{{ videoTitle }}</h1>
    <!-- This div will be the container for the YouTube player -->
    <div id="ytplayer"></div>

    <div>
      <p>Tonton Video Sampai Habis ya 😁</p>
      <p>
        Progress Saat Ini: <b>{{ videoDurationProgress }}</b> detik /
        {{ formatTime(videoDurationProgress) }}
      </p>
      <p>
        Status Video :
        {{ videoStatusIsCompleted == 1 ? "completed" : "uncompleted" }}
      </p>
    </div>

    <NuxtLink
      v-if="videoStatusIsCompleted"
      :to="`/video/${videoId + 1}`"
      class="btn btn-primary"
    >
      Video Berikutnya ⏭️
    </NuxtLink>

    <p v-else-if="!videoUrl">Loading video...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import useVideo from "../../composables/useVideo";
import useProgress from "../../composables/useProgress";

// Declare YT globally to avoid TypeScript errors
declare var YT: any;

const route = useRoute();
const videoId = Number(route.params.id);
const userId = 1; // Ganti ini sesuai user aktif

const videoRef = ref<HTMLIFrameElement | null>(null);
const videoUrl = ref<string>("");
const videoTitle = ref<string>("");
const videoStatusIsCompleted = ref<number>(0);
const videoDurationProgress = ref(0);
let alertInterval: number | null = null;

let player: any = null;
let current_time = ref(videoDurationProgress.value); // Initialize current_time with startTime
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
const initializePlayer = async () => {
  try {
    const response = await useVideo.getId(videoId);
    videoUrl.value = response.data.value.video_url;
    videoTitle.value = response.data.value.title;

    // Get progress
    const response2 = await useProgress.getProgress(userId, videoId);

    if (response2.data.value.data.length == 0) {
      updateProgress();
      console.log("ini adalah pertama kali user menonton video");
    } else {
      const response2_ = response2.data.value.data[0];
      videoStatusIsCompleted.value = response2_.is_completed;
      videoDurationProgress.value = response2_.last_position;
    }
  } catch (error) {
    console.error("Error fetching video:", error);
  }

  player = new YT.Player("ytplayer", {
    height: "315",
    width: "560",
    videoId: videoUrl.value,
    playerVars: {
      start: videoDurationProgress.value,
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
const onPlayerStateChange = async (event: any) => {
  // If the video starts playing
  if (event.data === YT.PlayerState.PLAYING) {
    videoPlaying.value = true;
    // Start manually updating the current time every second
    startAlerts();
  } else if (
    event.data === YT.PlayerState.PAUSED ||
    event.data === YT.PlayerState.ENDED
  ) {
    // If the video is paused or ended, stop updating the time
    stopAlerts();

    if (event.data === YT.PlayerState.ENDED) {
      await useProgress.postProgress({
        user_id: userId,
        video_id: videoId,
        last_position: videoDurationProgress.value,
        is_completed: 1,
      });
      // When the video ends, show the final current_time
      videoStatusIsCompleted.value = 1;
      alert(`🎉 Video finished at ${videoDurationProgress.value} seconds`);
    }
  }
};

const startAlerts = () => {
  // Start manually updating the current time every second
  if (!videoInterval) {
    videoInterval = setInterval(() => {
      videoDurationProgress.value += 1; // Increment the time by 1 second
      // console.log("Current time: " + formatTime(videoDurationProgress.value));
    }, 1000); // Update every second
  }

  // start manually updating progress to api
  if (!alertInterval) {
    alertInterval = window.setInterval(() => {
      console.log(
        "⏱ Sudah " + videoDurationProgress.value + " detik memainkan video!"
      );
      updateProgress();
    }, 10000);
  }
};

const stopAlerts = () => {
  // Stop updating the time when the video is paused or finished
  videoPlaying.value = false;
  if (videoInterval) {
    clearInterval(videoInterval); // Stop the interval
    videoInterval = null;
  }

  // stop updating progress to api
  if (alertInterval) {
    clearInterval(alertInterval);
    alertInterval = null;
  }
};

// Kirim progress ke server
const updateProgress = async () => {
  await useProgress.postProgress({
    user_id: userId,
    video_id: videoId,
    last_position: videoDurationProgress.value,
    is_completed: 0,
  });
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
