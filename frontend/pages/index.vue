<template>
  <div class="container mt-5">
    <h1 class="h3 mb-4">🎥 Daftar Video Pembelajaran</h1>

    <ul class="list-group">
      <li
        v-for="video in videos"
        :key="video.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <NuxtLink
          :to="`/video/${video.id}`"
          class="text-decoration-none text-primary"
        >
          {{ video.title }}
        </NuxtLink>
        <span class="badge bg-primary rounded-pill">ID: {{ video.id }}</span>
      </li>
      <!--  -->
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <NuxtLink to="/video/copy" class="text-decoration-none text-primary">
          video sample
        </NuxtLink>
        <span class="badge bg-primary rounded-pill">ID: sample</span>
      </li>
    </ul>
  </div>
</template>
/video/copy
<script setup>
const { data: videos } = await useFetch("http://localhost:8000/api/videos");
</script>
