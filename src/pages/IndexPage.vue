<script setup lang="ts">
import AppPage from '@/components/AppPage.vue';
import MyTabbar from '@/components/MyTabbar.vue';
</script>

<template>
  <AppPage  :back="false">
    <div class="w-full overflow-y-scroll h-[calc(100%-70px)] ">
      <router-view />
    </div>

    <div class=" pos-fixed bottom-0 w-full z-9">
      <MyTabbar />
    </div>

  </AppPage>
</template>


