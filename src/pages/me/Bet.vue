<script setup lang="ts">
import AppPage from '@/components/AppPage.vue';
  const onClickLeft = () => history.back();
</script>

<template>
  <AppPage >
    <van-nav-bar style="background: var(--my-primary);"  class=" h-[50px]" :border="false"  title="手牌回顾"  left-arrow @click-left="onClickLeft" />
  </AppPage>
</template>

