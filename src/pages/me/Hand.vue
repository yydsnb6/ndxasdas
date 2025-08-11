<script setup lang="ts">
import AppPage from '@/components/AppPage.vue';
import MyHandRecord from './MyHandRecord.vue'


const onClickLeft = () => history.back();

</script>

<template>
  <AppPage>
    <van-nav-bar :border="false" style="background: var(--my-primary);" class=" h-[50px]" title="手牌回顾" left-text=""
      left-arrow @click-left="onClickLeft">
      <template #right>
      </template>
    </van-nav-bar>
    <MyHandRecord  />
  </AppPage>
</template>
