<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore()
</script>

<template>
  <div @click="router.push('/wallet')" class="flex flex-row items-center border-2 border-solid rounded-full px-2 py-1 justify-between border-[var(--my-text)]">
    <img src="../assets/imgae/usdt.png" class="w-[20px] h-[20px] " alt="" srcset="">
    <p class="mx-2 text-[var(--my-text)]">{{ userStore.userInfo?.balance }}</p>
    <van-icon name="add" color="#419572" size="20" class="w-[20px]! h-[20px]!  "/>
  </div>
</template>
