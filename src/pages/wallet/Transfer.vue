<script setup lang="ts">
import AppPage from '@/components/AppPage.vue';

  const onClickLeft = () => history.back();
</script>

<template>
  <AppPage >
    <van-nav-bar :border="false" style="background: var(--my-primary);"  class=" h-[50px]"  title="我的俱乐部" left-text="返回" left-arrow @click-left="onClickLeft" />
  </AppPage>
</template>

